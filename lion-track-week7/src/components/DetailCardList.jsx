import DetailCard from "./DetailCard";

function DetailCardList({ lions }) {
  if (lions.length === 0) {
    return <p>조건에 맞는 아기 사자가 없습니다.</p>;
  }

  return (
    <div className="detail-list">
      {lions.map((lion, index) => (
        <DetailCard
          key={lion.id || `${lion.email}-${index}`}
          lion={lion}
        />
      ))}
    </div>
  );
}

export default DetailCardList;