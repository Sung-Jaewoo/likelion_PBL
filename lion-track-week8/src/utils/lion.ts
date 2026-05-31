import type { Lion, Part, RandomUser } from "../types/lion";

const parts: Part[] = ["Frontend", "Backend", "Design"];
const techs = ["JavaScript", "React", "HTML / CSS", "Node.js", "Figma"];

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function normalizeTechList(tech: Lion["tech"]): string[] {
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

export function buildLionFromRandomUser(user: RandomUser): Lion {
  const part = pickRandom(parts);
  const tech = pickRandom(techs);

  return {
    id: user.login.uuid,
    name: `${user.name.first} ${user.name.last}`,
    part,
    grade: String(Math.floor(Math.random() * 4) + 1),
    tech,
    intro: "랜덤 API에서 불러온 아기 사자입니다.",
    detailIntro:
      "fetch를 사용해 외부 데이터를 불러오고 React state로 화면을 갱신했습니다.",
    email: user.email,
    phone: user.phone,
    website: "https://example.com",
    comment: "랜덤 데이터로 추가되었습니다.",
    image: user.picture.large,
  };
}
