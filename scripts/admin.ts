import { db, audit } from '../server/db';
const email=process.argv[2];
if(!email)throw new Error('Usage: npm run admin -- your-email@example.com');
const user=db.prepare('SELECT id,emailVerified FROM user WHERE lower(email)=lower(?)').get(email) as {id:string;emailVerified:number}|undefined;
if(!user)throw new Error('Create your account on the website first.');
if(process.env.NODE_ENV==='production' && !user.emailVerified)throw new Error('Verify the account email before granting admin access.');
db.transaction(()=>{db.prepare("UPDATE user SET role='admin' WHERE id=?").run(user.id);audit('local-cli','bootstrap-admin',user.id);})();
console.log('Administrator access granted to the selected account.');db.close();
