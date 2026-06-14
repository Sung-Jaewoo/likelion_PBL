import type { Lion } from "../types/lion";
import { getGradeText, normalizeTechList } from "../utils/lion";

interface DetailCardProps {
  lion: Lion;
}

function DetailCard({ lion }: DetailCardProps) {
  const techList = normalizeTechList(lion.tech);
  const gradeText = getGradeText(lion.grade);

  return (
    <article className="detail-card">
      <h3>{lion.name}</h3>

      <p className="part">{lion.part}</p>

      <p>
        <strong>학년:</strong> {gradeText}
      </p>

      <section>
        <h4>자기소개</h4>
        <p>{lion.detailIntro}</p>
      </section>

      <section>
        <h4>연락처</h4>
        <ul>
          <li>이메일: {lion.email}</li>
          <li>전화번호: {lion.phone}</li>
          <li>
            웹사이트:{" "}
            <a href={lion.website} target="_blank" rel="noreferrer">
              {lion.website}
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h4>관심 기술</h4>
        <ul>
          {techList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h4>한 마디</h4>
        <p>{lion.comment || "아직 한 마디가 없습니다."}</p>
      </section>
    </article>
  );
}

export default DetailCard;
