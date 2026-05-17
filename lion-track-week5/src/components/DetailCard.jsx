function DetailCard({ lion }) {
  return (
    <article className="detail-card">
      <h3>{lion.name}</h3>

      <p className="part">{lion.part}</p>

      <p>
        <strong>학년:</strong> {lion.grade}
      </p>

      <h4>자기소개</h4>
      <p>{lion.detailIntro}</p>

      <h4>연락처</h4>
      <ul>
        <li>이메일: {lion.email}</li>
        <li>전화번호: {lion.phone}</li>
        <li>
          웹사이트:
          <a
            href={lion.website}
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            {lion.website}
          </a>
        </li>
      </ul>

      <h4>관심 기술</h4>
      <ul>
        {lion.tech.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h4>한 마디</h4>
      <p>{lion.comment}</p>
    </article>
  );
}

export default DetailCard;