import { z } from 'zod';
import { contentKinds } from './platform-types';
const uploadPath=/^(?:[a-f0-9-]{36}\/[a-f0-9-]{36}\.(?:pdf|png|jpg|webp))?$/;
const testQuestionSchema=z.object({
  id:z.string().uuid(),body:z.string().max(12000),answer_type:z.enum(['numeric','expression','choice']),
  choices:z.array(z.string().max(500)).max(8).default([]),answer:z.string().max(300),
  points:z.number().positive().max(1000),image_path:z.string().max(400).regex(uploadPath).default(''),
});
export const contentSchema = z.object({
  id: z.string().uuid().optional(),
  kind: z.enum(contentKinds), title: z.string().trim().min(3).max(150),
  summary: z.string().trim().min(5).max(400), topic: z.string().trim().min(1).max(60).regex(/^[a-z0-9-]+$/),
  group_key: z.string().trim().max(60).regex(/^[a-z0-9-]*$/).default('general'),
  difficulty: z.enum(['Boshlang‘ich', 'O‘rta', 'Murakkab']), duration: z.number().int().min(1).max(600),
  data: z.object({
    body: z.string().max(60000), formula: z.string().max(8000), hints: z.string().max(12000),
    solution: z.string().max(60000), answer: z.string().max(300), answer_type: z.enum(['numeric', 'expression', 'choice', 'proof']),
    choices: z.array(z.string().trim().min(1).max(500)).max(8).default([]),
    question_ids: z.array(z.string().uuid()).max(100).refine(ids=>new Set(ids).size===ids.length),
    question_points: z.record(z.string().uuid(),z.number().positive().max(1000)).refine(v=>Object.keys(v).length<=100).default({}),
    test_questions:z.array(testQuestionSchema).max(100).refine(items=>new Set(items.map(item=>item.id)).size===items.length).default([]),
    file_path: z.string().max(400).regex(uploadPath),
    cover_path: z.string().max(400).regex(/^(?:[a-f0-9-]{36}\/[a-f0-9-]{36}\.(?:png|jpg|webp))?$/).default(''),
    source: z.string().max(500), author: z.string().max(200).default(''), pages: z.number().int().min(0).max(100000).default(0),
    video_url: z.string().max(500).refine(v=>!v || /^https:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/)/i.test(v),'Video havolasi YouTube yoki Vimeo’dan bo‘lishi kerak.').default(''),
  }),
});
export type ContentInput = z.infer<typeof contentSchema>;
export function numberValue(input: string): number | null {
  const text = input.trim().replace(/\s/g, '').replace(',', '.').replace(/\\(?:d?frac)\{(-?\d+(?:\.\d+)?)\}\{(-?\d+(?:\.\d+)?)\}/, '$1/$2');
  const match = /^([+-]?\d+(?:\.\d+)?)(?:\/([+-]?\d+(?:\.\d+)?))?$/.exec(text);
  if (!match) return null;
  const value = Number(match[1]) / (match[2] === undefined ? 1 : Number(match[2]));
  return Number.isFinite(value) ? value : null;
}
export function publicationError(input: ContentInput): string | null {
  if (['test', 'competition'].includes(input.kind)) {
    if(!input.group_key)return 'Test guruhini tanlang.';
    if(!input.data.test_questions.length)return 'Kamida bitta savol qo‘shing.';
    for(const [index,q] of input.data.test_questions.entries()){
      if(!q.body.trim())return `${index+1}-savol matnini kiriting.`;
      if(q.answer_type==='choice'){
        const choices=q.choices.map(v=>v.trim()).filter(Boolean),correct=/^[A-H]$/.test(q.answer)?q.answer.charCodeAt(0)-65:-1;
        if(choices.length<2||correct<0||correct>=choices.length)return `${index+1}-savol uchun kamida 2 ta variant va to‘g‘ri javobni kiriting.`;
      } else if(!q.answer.trim())return `${index+1}-savolning to‘g‘ri javobini kiriting.`;
      else if(q.answer_type==='numeric'&&numberValue(q.answer)===null)return `${index+1}-savolning sonli javobini tekshiring.`;
    }
    return null;
  }
  if (!input.data.body.trim()) return 'Mazmunni kiriting.';
  if (input.kind === 'problem') {
    if (!input.data.solution.trim()) return 'Yechimni kiriting.';
    if (input.data.answer_type === 'numeric' && numberValue(input.data.answer) === null) return 'Sonli javobni to‘g‘ri kiriting (masalan: 12 yoki 1/2).';
    if (input.data.answer_type === 'expression' && !input.data.answer.trim()) return 'Tekshiriladigan matematik javobni kiriting.';
    if (input.data.answer_type === 'choice' && (input.data.choices.length < 2 || !/^[A-H]$/.test(input.data.answer))) return 'Kamida 2 ta variant va to‘g‘ri javob harfini kiriting.';
  }
  return null;
}
