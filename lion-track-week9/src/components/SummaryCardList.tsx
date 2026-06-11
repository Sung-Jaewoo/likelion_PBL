import type { Lion, LionId } from "../types/lion";
import SummaryCard from "./SummaryCard";

interface SummaryCardListProps {
  lions: Lion[];
  onSelect: (lionId: LionId) => void;
}

function SummaryCardList({ lions, onSelect }: SummaryCardListProps) {
  if (lions.length === 0) {
    return <p className="empty-text">조건에 맞는 아기 사자가 없습니다.</p>;
  }

  return (
    <div className="card-grid">
      {lions.map((lion) => (
        <SummaryCard key={lion.id} lion={lion} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default SummaryCardList;
