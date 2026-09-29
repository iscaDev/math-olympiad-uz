import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import Database from 'better-sqlite3';
import {emptyBody} from '../lib/platform-types';

test('Accounts, permissions, approval, private files, test grading and persistence',async(t)=>{
 const dir=await mkdtemp(join(tmpdir(),'math-backend-test-'));
 const base='http://127.0.0.1:4401',origin='http://127.0.0.1:3000';
 let child:ReturnType<typeof spawn>,db:Database.Database,logs='';
 async function start(){
   child=spawn(process.execPath,['--import','tsx','server/index.ts'],{env:{...process.env,NODE_ENV:'test',PORT:'4401',HOST:'127.0.0.1',PUBLIC_APP_URL:origin,DATA_DIR:dir,OPENAI_API_KEY:'',SMTP_HOST:'',BETTER_AUTH_SECRET:'integration-test-secret-not-for-production-123456'},stdio:['ignore','pipe','pipe']});
   child.stdout?.on('data',b=>logs+=b.toString());child.stderr?.on('data',b=>logs+=b.toString());
   for(let i=0;i<100;i++){try{if((await fetch(base+'/health')).ok)return;}catch{}await new Promise(r=>setTimeout(r,100));}
   throw new Error('Backend did not start: '+logs);
 }
 async function stop(){if(child.exitCode===null){child.kill('SIGTERM');await new Promise<void>(r=>child.once('exit',()=>r()));}}
 t.after(async()=>{db?.close();await stop();await rm(dir,{recursive:true,force:true});});
 await start();db=new Database(join(dir,'platform.sqlite'));
 async function call(path:string,body?:unknown,cookie='',customOrigin=origin){const response=await fetch(base+path,{method:body===undefined?'GET':'POST',headers:{'Content-Type':'application/json',Origin:customOrigin,...(cookie?{Cookie:cookie}:{})},body:body===undefined?undefined:JSON.stringify(body)});return {status:response.status,data:await response.json(),cookie:response.headers.getSetCookie().map(s=>s.split(';')[0]).join('; ')};}
 const admin=await call('/api/auth/sign-up/email',{email:'admin@example.test',name:'Test Admin',password:'Pass123!',role:'admin'});
 assert.equal(admin.status,200,JSON.stringify(admin.data));assert.ok(admin.cookie);
 assert.equal((await call('/api/me',undefined,admin.cookie)).data.role,'student','signup cannot choose admin');
 const author=await call('/api/auth/sign-up/email',{email:'author@example.test',name:'Test Author',password:'Test-Password-348!Q'});
 const student=await call('/api/auth/sign-up/email',{email:'student@example.test',name:'Test Student',password:'Test-Password-348!Q'});
 for(const account of [author,student])assert.equal(account.status,200);
 db.prepare("UPDATE user SET role='admin' WHERE email='admin@example.test'").run();
 db.prepare("UPDATE user SET role='contributor' WHERE email='author@example.test'").run();
 const aid=(await call('/api/me',undefined,author.cookie)).data.id;
 const adminId=(await call('/api/me',undefined,admin.cookie)).data.id;
 const studentId=(await call('/api/me',undefined,student.cookie)).data.id;
 await t.test('public counts and guest protection',async()=>{
   assert.deepEqual((await call('/api/public/stats')).data,{users:3,tests:4,problems:12,resources:7});
   const list=(await call('/api/public/catalog')).data;assert.equal(list.length,23);assert.ok(list.every((i:{data?:unknown;review_note:string})=>!i.data && !i.review_note));
   assert.equal((await call('/api/content/'+list[0].id)).status,401);
   assert.equal((await call('/api/studio',undefined,student.cookie)).status,403);
   assert.equal((await call('/api/members',undefined,author.cookie)).status,403);
 });
 const input={kind:'problem',title:'Integration test problem',summary:'A temporary test of publication permissions.',topic:'algebra',difficulty:'Boshlang‘ich',duration:1,data:{...emptyBody,body:'Compute $1+1$.',solution:'$1+1=2$',answer_type:'numeric',answer:'2'}};
 let problemId:string;
 await t.test('contributor ownership and admin approval',async()=>{
   assert.equal((await call('/api/studio',{input,intent:'published'},author.cookie)).status,403);
   assert.equal((await call('/api/studio',{input,intent:'pending'},student.cookie)).status,403);
   const made=await call('/api/studio',{input,intent:'pending'},author.cookie);assert.equal(made.status,200);problemId=made.data.id;
   assert.equal((await call('/api/content/'+problemId,undefined,student.cookie)).status,404);
   assert.equal((await call('/api/studio/'+problemId+'/review',{status:'published',note:''},author.cookie)).status,403);
   assert.equal((await call('/api/studio/'+problemId+'/review',{status:'published',note:''},admin.cookie)).status,200);
   assert.equal((await call('/api/content/'+problemId,undefined,student.cookie)).data.item.data.answer,'');
   const foreign={...input,id:'00000000-0000-4000-8000-000000000001'};
   assert.equal((await call('/api/studio',{input:foreign,intent:'draft'},author.cookie)).status,403);
   assert.equal((await call('/api/studio',{input:{...input,id:problemId},intent:'draft'},author.cookie)).status,200);
   assert.equal((await call('/api/content/'+problemId,undefined,student.cookie)).status,404,'editing withdraws publication');
   await call('/api/studio/'+problemId+'/review',{status:'published',note:''},admin.cookie);
 });
 await t.test('CSRF, roles and notes are isolated',async()=>{
   assert.equal((await call('/api/members/'+studentId,{role:'admin'},admin.cookie,'https://evil.invalid')).status,403);
   assert.equal((await call('/api/members/'+studentId,{role:'admin'},author.cookie)).status,403);
   assert.equal((await call('/api/members/'+adminId,{role:'student'},admin.cookie)).status,400);
   assert.equal((await call('/api/members/'+aid,{role:'student'},admin.cookie)).status,200);
   assert.equal((await call('/api/studio',undefined,author.cookie)).status,403,'role updates take effect immediately');
   await call('/api/members/'+aid,{role:'contributor'},admin.cookie);
   assert.equal((await call('/api/notes/'+problemId,{body:'Private $x^2$ note'},student.cookie)).status,200);
   assert.equal((await call('/api/content/'+problemId,undefined,student.cookie)).data.note,'Private $x^2$ note');
   assert.equal((await call('/api/content/'+problemId,undefined,author.cookie)).data.note,'');
   assert.equal((await call('/api/check/'+problemId,{answer:'2'},student.cookie)).data.correct,true);
   assert.equal((await call('/api/check/'+problemId,{answer:'3'},student.cookie)).data.correct,false);
 });
 await t.test('uploads stay private and reject disguised formats',async()=>{
   const form=new FormData();form.set('file',new Blob(['<script>bad</script>'],{type:'application/pdf'}),'bad.pdf');
   let response=await fetch(base+'/api/uploads',{method:'POST',headers:{Origin:origin,Cookie:author.cookie},body:form});assert.equal(response.status,400);
   const valid=new FormData();valid.set('file',new Blob(['%PDF-1.4\n%%EOF'],{type:'application/pdf'}),'test.pdf');
   response=await fetch(base+'/api/uploads',{method:'POST',headers:{Origin:origin,Cookie:author.cookie},body:valid});assert.equal(response.status,200);
   const {path}=await response.json() as {path:string};
   const book={...input,kind:'book',data:{...emptyBody,body:'Private book content',file_path:path}};
   const made=await call('/api/studio',{input:book,intent:'pending'},author.cookie);assert.equal(made.status,200);
   assert.equal((await fetch(base+'/api/files/'+made.data.id,{headers:{Cookie:student.cookie}})).status,404);
   await call('/api/studio/'+made.data.id+'/review',{status:'published',note:''},admin.cookie);
   assert.equal((await fetch(base+'/api/files/'+made.data.id)).status,401);
   response=await fetch(base+'/api/files/'+made.data.id,{headers:{Cookie:student.cookie}});assert.equal(response.status,200);assert.match(response.headers.get('Content-Security-Policy')||'',/sandbox/);
 });
 let testId:string;
 await t.test('test snapshot, server grading, ownership and deadlines',async()=>{
   const questionId='10000000-0000-4000-8000-000000000001';
   const testInput={...input,kind:'test',title:'Embedded question test',group_key:'grade-5',data:{...emptyBody,body:'Answer every question.',test_questions:[{id:questionId,body:'Compute $1+1$.',answer_type:'numeric' as const,choices:[],answer:'2',points:1,image_path:''}]}};
   const made=await call('/api/studio',{input:testInput,intent:'published'},admin.cookie);assert.equal(made.status,200);testId=made.data.id;
   const studentView=(await call('/api/content/'+testId,undefined,student.cookie)).data.item.data.test_questions[0];assert.equal(studentView.answer,'');assert.equal(studentView.body,'');
   const started=await call('/api/attempts/start',{content_id:testId},student.cookie);assert.equal(started.status,200);const attempt=started.data;
   assert.ok(!('answer' in attempt.questions[0]));assert.equal(attempt.questions[0].body,'Compute $1+1$.');
   assert.equal((await call('/api/attempts/start',{content_id:testId},student.cookie)).data.id,attempt.id,'resume existing test');
   assert.equal((await call('/api/attempts/'+attempt.id+'/submit',{answers:{[questionId]:'2'}},author.cookie)).status,404);
   assert.equal((await call('/api/attempts/'+attempt.id+'/save',{answers:{[questionId]:'2'}},student.cookie)).status,200);
   await call('/api/studio',{input:{...testInput,id:testId,data:{...testInput.data,test_questions:[{...testInput.data.test_questions[0],answer:'3'}]}},intent:'published'},admin.cookie);
   const submitted=await call('/api/attempts/'+attempt.id+'/submit',{answers:{[questionId]:'2'}},student.cookie);assert.deepEqual(submitted.data,{score:1,total:1,written:0},'uses original answer snapshot');
   assert.deepEqual((await call('/api/attempts/'+attempt.id+'/submit',{answers:{[questionId]:'9'}},student.cookie)).data,submitted.data,'submission is immutable');
   const again=(await call('/api/attempts/start',{content_id:testId},student.cookie)).data;
   await call('/api/attempts/'+again.id+'/save',{answers:{[questionId]:'3'}},student.cookie);
   db.prepare('UPDATE attempts SET expires_at=? WHERE id=?').run(Date.now()-1000,again.id);
   assert.equal((await call('/api/attempts/'+again.id+'/save',{answers:{[questionId]:'9'}},student.cookie)).status,409);
   assert.equal((await call('/api/attempts/'+again.id+'/submit',{answers:{[questionId]:'9'}},student.cookie)).data.score,1,'ignores answers sent after deadline');
 });
 await t.test('AI is disabled without a key',async()=>{assert.equal((await call('/api/assistant',{messages:[{role:'user',content:'1+1'}],mode:'hint',language:'uz'},student.cookie)).status,503);});
 await t.test('accounts, sessions, content and notes survive restart',async()=>{
   await stop();await start();
   assert.equal((await call('/api/me',undefined,student.cookie)).data.id,studentId);
   assert.equal((await call('/api/content/'+problemId,undefined,student.cookie)).data.note,'Private $x^2$ note');
   assert.equal((await call('/api/dashboard',undefined,student.cookie)).data.attempts.length,1,'dashboard keeps the best result for each test');
   assert.equal((await call('/api/public/stats')).data.users,3);
 });
});
