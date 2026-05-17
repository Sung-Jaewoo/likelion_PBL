import SummaryCard from "./SummaryCard";

function SummaryCardList({ lions }) {
  if (lions.length === 0) {
    return <p className="empty-text">조건에 맞는 아기 사자가 없습니다.</p>;
  }

  return (
    <div className="card-grid">
      {lions.map((lion, index) => (
        <SummaryCard key={lion.id || `${lion.email}-${index}`} lion={lion} />
      ))}
    </div>
  );
}

export default SummaryCardList;
