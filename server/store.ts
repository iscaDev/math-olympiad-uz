import { db } from './db';
import { sampleItems } from './seed-data';
import { emptyBody, type ContentItem, type ContentCard, type Profile } from '../lib/platform-types';

export async function seed() {
  if (await db.selectFrom('settings').select('key').where('key', '=', 'seed-v1').executeTakeFirst()) return;
  await db.transaction().execute(async trx => {
    for (const item of sampleItems) await put(item, trx);
    await trx.insertInto('settings').values({ key: 'seed-v1', value: 'done' }).execute();
  });
}

type DatabaseLike = Pick<typeof db, 'insertInto'>;

export async function put(item: ContentItem, database: DatabaseLike = db) {
  await database.insertInto('content').values({
    ...item,
    data: JSON.stringify(item.data),
  }).onConflict(oc => oc.column('id').doUpdateSet({
    kind: item.kind,
    title: item.title,
    summary: item.summary,
    topic: item.topic,
    group_key: item.group_key,
    difficulty: item.difficulty,
    duration: item.duration,
    status: item.status,
    updated_at: item.updated_at,
    review_note: item.review_note,
    data: JSON.stringify(item.data),
  })).execute();
}

type Row = Omit<ContentItem, 'data'> & { data: string };
const unpack = (r: Row | undefined): ContentItem | undefined => {
  if (!r) return undefined;
  const data = JSON.parse(r.data);
  return {
    ...r,
    group_key: r.group_key || '',
    data: {
      ...emptyBody,
      ...data,
      question_points: data.question_points || {},
      choices: data.choices || [],
      test_questions: data.test_questions || [],
    },
  };
};

export async function byId(id: string) {
  return unpack(await db.selectFrom('content').selectAll().where('id', '=', id).executeTakeFirst() as Row | undefined);
}

export async function bySlug(slug: string) {
  return unpack(await db.selectFrom('content').selectAll().where('slug', '=', slug).executeTakeFirst() as Row | undefined);
}

export function card(i: ContentItem): ContentCard {
  const { data: _, ...c } = i;
  return c;
}

export type CatalogFilter = {
  published?: boolean;
  authorId?: string;
  kinds?: string[];
};

export async function catalog(filter: CatalogFilter = {}): Promise<ContentCard[]> {
  let query = db.selectFrom('content').select([
    'id', 'slug', 'kind', 'title', 'summary', 'topic', 'group_key', 'difficulty',
    'duration', 'status', 'author_id', 'updated_at', 'review_note',
  ]);
  if (filter.published) query = query.where('status', '=', 'published');
  if (filter.authorId) query = query.where('author_id', '=', filter.authorId);
  if (filter.kinds?.length) query = query.where('kind', 'in', filter.kinds);
  return await query.orderBy('updated_at', 'desc').orderBy('id').execute() as ContentCard[];
}

export async function profile(id: string): Promise<Profile | null> {
  const row = await db.selectFrom('user').select([
    'id',
    'name as display_name',
    'role',
    'createdAt as created_at',
  ]).where('id', '=', id).executeTakeFirst();
  return row ? { ...row, created_at: new Date(row.created_at).toISOString() } as Profile : null;
}

export async function migrateEmbeddedTestQuestions() {
  const tests = await catalog({ kinds: ['test', 'competition'] });
  for (const row of tests) {
    const test = await byId(row.id);
    if (!test) continue;
    if (test.data.test_questions.length) {
      if (test.data.question_ids.length) await put({ ...test, data: { ...test.data, question_ids: [], question_points: {} } });
      continue;
    }
    if (!test.data.question_ids.length) continue;
    const embedded = [];
    for (const [index, id] of test.data.question_ids.entries()) {
      const q = await byId(id);
      if (!q || q.kind !== 'problem' || q.data.answer_type === 'proof' || !q.data.answer.trim()) continue;
      embedded.push({
        id: q.id,
        body: q.data.body,
        answer_type: q.data.answer_type as 'numeric' | 'expression' | 'choice',
        choices: q.data.choices || [],
        answer: q.data.answer,
        points: Number(test.data.question_points[id] || 1),
        image_path: q.data.file_path || '',
      });
    }
    if (embedded.length) await put({ ...test, data: { ...test.data, test_questions: embedded, question_ids: [], question_points: {} } });
  }
}
