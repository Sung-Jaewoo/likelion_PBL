import type { Database } from "../types/database";
import type { Lion, LionForm, Part, RandomUser } from "../types/lion";

type LionRow = Database["public"]["Tables"]["lions"]["Row"];
type LionInsert = Database["public"]["Tables"]["lions"]["Insert"];

export function normalizeTechList(tech: Lion["tech"] | string): string[] {
  return Array.isArray(tech)
    ? tech
    : String(tech)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}

export function getGradeText(grade: string): string {
  return grade.includes("학년") ? grade : `${grade}학년`;
}

export function mapLionRowToLion(row: LionRow): Lion {
  return {
    id: row.id,
    name: row.name,
    part: row.part,
    grade: row.grade,
    tech: row.tech,
    intro: row.intro,
    detailIntro: row.detail_intro,
    email: row.email,
    phone: row.phone,
    website: row.website,
    comment: row.comment,
    image: row.image,
    badge: row.badge ?? undefined,
    ownerId: row.owner_id,
    createdAt: row.created_at,
  };
}

export function mapLionFormToInsert(form: LionForm, ownerId: string): LionInsert {
  const tech = normalizeTechList(form.tech);

  return {
    name: form.name.trim(),
    part: form.part || "Frontend",
    grade: form.grade.trim(),
    tech,
    intro: form.intro.trim(),
    detail_intro: form.detailIntro.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    website: form.website.trim(),
    comment: form.comment.trim(),
    image: form.image.trim() || "https://placehold.co/600x400?text=Lion",
    badge: tech[0] ?? null,
    owner_id: ownerId,
  };
}

const parts: Part[] = ["Frontend", "Backend", "Design"];
const techs = ["JavaScript", "React", "TypeScript", "Node.js", "Figma"];

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function mapRandomUserToForm(user: RandomUser): LionForm {
  const part = pickRandom(parts);
  const tech = pickRandom(techs);

  return {
    name: `${user.name.first} ${user.name.last}`,
    part,
    grade: `${Math.floor(Math.random() * 4) + 1}학년`,
    tech,
    intro: `${part} 파트에서 함께 성장하고 싶은 아기 사자입니다.`,
    detailIntro: `${user.location.country} ${user.location.city}에서 온 멤버입니다. Random User API 데이터로 생성했고 Supabase에 저장됩니다.`,
    email: user.email,
    phone: user.phone,
    website: "https://example.com",
    comment: "랜덤 데이터로 추가되었습니다.",
    image: user.picture.large,
  };
}
