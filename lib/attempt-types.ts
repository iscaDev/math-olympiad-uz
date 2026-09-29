export type TestQuestion = { id:string; body:string; answer_type:'numeric'|'expression'|'choice'; choices:string[]; points:number; has_image:boolean };
export type AttemptReview = TestQuestion & { given:string; correct_answer:string; correct:boolean };
export type AttemptResult = { id:string; content_id:string; title:string; submitted_at:number|null; score:number; total:number; written:number; review:AttemptReview[] };
export type ActiveAttempt = { id:string; expires_at:string; questions:TestQuestion[]; answers:Record<string,string> };
