import { db } from './db';
import { sampleItems } from './seed-data';
import { emptyBody, type ContentItem, type ContentCard, type Profile } from '../lib/platform-types';
export function seed() {
  if (db.prepare("SELECT key FROM settings WHERE key='seed-v1'").get()) return;
  db.transaction(() => { for (const item of sampleItems) put(item); db.prepare('INSERT INTO settings(key,value) VALUES(?,?)').run('seed-v1','done'); })();
}
export function put(item: ContentItem) {
  db.prepare(`INSERT INTO content(id,slug,kind,title,summary,topic,group_key,difficulty,duration,status,author_id,updated_at,review_note,data)
  VALUES(@id,@slug,@kind,@title,@summary,@topic,@group_key,@difficulty,@duration,@status,@author_id,@updated_at,@review_note,@data)
  ON CONFLICT(id) DO UPDATE SET kind=excluded.kind,title=excluded.title,summary=excluded.summary,topic=excluded.topic,group_key=excluded.group_key,difficulty=excluded.difficulty,duration=excluded.duration,status=excluded.status,updated_at=excluded.updated_at,review_note=excluded.review_note,data=excluded.data`).run({...item,data:JSON.stringify(item.data)});
}
type Row = Omit<ContentItem,'data'> & {data:string};
const unpack = (r:Row|undefined):ContentItem|undefined => { if(!r)return undefined; const data=JSON.parse(r.data); return {...r,group_key:r.group_key||'',data:{...emptyBody,...data,question_points:data.question_points||{},choices:data.choices||[],test_questions:data.test_questions||[]}}; };
export const byId = (id:string) => unpack(db.prepare('SELECT * FROM content WHERE id=?').get(id) as Row|undefined);
export const bySlug = (slug:string) => unpack(db.prepare('SELECT * FROM content WHERE slug=?').get(slug) as Row|undefined);
export function card(i:ContentItem):ContentCard { const {data:_,...c}=i; return c; }
export function catalog(where='status=\'published\'', ...params:unknown[]):ContentCard[] {
  return db.prepare(`SELECT id,slug,kind,title,summary,topic,group_key,difficulty,duration,status,author_id,updated_at,review_note FROM content WHERE ${where} ORDER BY updated_at DESC,id`).all(...params) as ContentCard[];
}
export function profile(id:string):Profile|null {
  const row=db.prepare('SELECT id,name AS display_name,role,createdAt AS created_at FROM user WHERE id=?').get(id) as Profile|undefined;
  return row ?? null;
}
export function migrateEmbeddedTestQuestions(){
  const tests=catalog("kind IN ('test','competition')");
  for(const row of tests){const test=byId(row.id);if(!test)continue;
    if(test.data.test_questions.length){if(test.data.question_ids.length)put({...test,data:{...test.data,question_ids:[],question_points:{}}});continue;}
    if(!test.data.question_ids.length)continue;
    const embedded=test.data.question_ids.flatMap((id,index)=>{const q=byId(id);if(!q||q.kind!=='problem'||q.data.answer_type==='proof'||!q.data.answer.trim())return [];return [{id:q.id,body:q.data.body,answer_type:q.data.answer_type as 'numeric'|'expression'|'choice',choices:q.data.choices||[],answer:q.data.answer,points:Number(test.data.question_points[id]||1),image_path:q.data.file_path||''}];});
    if(embedded.length)put({...test,data:{...test.data,test_questions:embedded,question_ids:[],question_points:{}}});
  }
}
