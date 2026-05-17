import SummaryCard from "./SummaryCard";

function SummaryCardList({ lions }) {
  return (
    <div className="card-grid">
      {lions.map((lion) => (
        <SummaryCard
          key={lion.id}
          lion={lion}
        />
      ))}
    </div>
  );
}

export default SummaryCardList;