import { db, audit, closeDatabase, initializeDatabase } from '../server/db';

const email=process.argv[2]?.trim();
if(!email)throw new Error('Usage: npm run admin -- you@example.com');
await initializeDatabase();
const user=await db.selectFrom('user').select(['id','emailVerified']).where('email','=',email.toLowerCase()).executeTakeFirst() as {id:string;emailVerified:boolean|number}|undefined;
if(!user)throw new Error('Create and verify this account first.');
if(!user.emailVerified)throw new Error('Verify the email address first.');
await db.transaction().execute(async trx=>{
  await trx.updateTable('user').set({role:'admin'}).where('id','=',user.id).execute();
  await audit('local-cli','bootstrap-admin',user.id,trx);
});
console.log('Administrator role granted.');
await closeDatabase();
