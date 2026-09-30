export const contentKinds = ['problem', 'test', 'competition', 'lesson', 'article', 'book'] as const;
export type ContentKind = typeof contentKinds[number];
export type Role = 'student' | 'contributor' | 'admin';
export type Status = 'draft' | 'pending' | 'published' | 'archived';
export const kindLabels: Record<ContentKind, string> = { problem: 'Masala', test: 'Test', competition: 'Olimpiada', lesson: 'Mavzu', article: 'Maqola', book: 'Kitob' };
export const statusLabels: Record<Status, string> = { draft: 'Qoralama', pending: 'Tekshiruvda', published: 'Nashr etilgan', archived: 'Arxivda' };
export const roleLabels: Record<Role, string> = { student: 'O‘quvchi', contributor: 'Muallif', admin: 'Administrator' };
export type Profile = { id: string; display_name: string; role: Role; created_at?: string };
export type MemberProfile = Profile & { email: string };
export type ContentCard = {
  id: string; slug: string; kind: ContentKind; title: string; summary: string;
  topic: string; group_key: string; difficulty: string; duration: number; status: Status;
  author_id: string | null; updated_at: string; review_note: string;
  has_cover?: boolean; card_display?: string; card_display_type?: 'math' | 'text';
};
export type EmbeddedTestQuestion = {
  id:string; body:string; answer_type:'numeric'|'expression'|'choice'; choices:string[];
  answer:string; points:number; image_path:string;
};
export type ContentBody = {
  body: string; formula: string; hints: string; solution: string; answer: string;
  answer_type: 'numeric' | 'expression' | 'choice' | 'proof'; choices: string[];
  question_ids: string[]; question_points: Record<string, number>; file_path: string;
  test_questions: EmbeddedTestQuestion[]; cover_path: string; source: string; author: string; pages: number; video_url: string;
};
export type ContentItem = ContentCard & { data: ContentBody };
export const emptyBody: ContentBody = { body: '', formula: '', hints: '', solution: '', answer: '', answer_type: 'proof', choices: [], question_ids: [], question_points: {}, test_questions: [], file_path: '', cover_path: '', source: '', author: '', pages: 0, video_url: '' };
export function contentHref(item: Pick<ContentCard, 'kind' | 'slug'>) {
  return `/${item.kind === 'problem' ? 'problems' : ['test', 'competition'].includes(item.kind) ? 'tests' : 'learn'}/${item.slug}/`;
}
export function safeNext(value: unknown) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || /[\\\r\n]/.test(value)) return '/dashboard/';
  try { const url = new URL(value, 'https://local.invalid'); return url.origin === 'https://local.invalid' ? url.pathname + url.search + url.hash : '/dashboard/'; } catch { return '/dashboard/'; }
}
