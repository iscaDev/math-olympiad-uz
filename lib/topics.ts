export const topics = [
  {
    id: "algebra",
    name: "Algebra",
    color: "coral",
    description: "Ifodalar ichidagi qonuniyatni toping.",
    formula: "x^2+y^2",
    subtitle: "Tenglamalar · Tengsizliklar",
  },
  {
    id: "geometry",
    name: "Geometriya",
    color: "blue",
    description: "Chizing. Kuzating. Isbotlang.",
    formula: "a^2+b^2=c^2",
    subtitle: "Shakllar · Burchaklar",
  },
  {
    id: "numbers",
    name: "Sonlar nazariyasi",
    color: "violet",
    description: "Oddiy sonlarning noodatiy xossalari.",
    formula: "a\\equiv b\\pmod n",
    subtitle: "Bo‘linish · Qoldiqlar",
  },
  {
    id: "combinatorics",
    name: "Kombinatorika",
    color: "mint",
    description: "Imkoniyatlarni tartib bilan sanang.",
    formula: "\\binom{n}{k}",
    subtitle: "Sanash · Mantiq",
  },
] as const;
export type TopicId = (typeof topics)[number]["id"];

export const topicFor = (id: string) => topics.find(t => t.id === id) ?? {id: 'algebra' as const, name: id === 'general' ? 'Umumiy matematika' : id.split('-').filter(Boolean).map((word,index) => index ? word : word.charAt(0).toUpperCase()+word.slice(1)).join(' '), color: 'violet', formula: 'x+y=z', description: '', subtitle: ''};
