import type { Lion } from "../types/lion";
import DetailCard from "./DetailCard";

interface DetailCardListProps {
  lions: Lion[];
}

function DetailCardList({ lions }: DetailCardListProps) {
  if (lions.length === 0) {
    return <p>조건에 맞는 아기 사자가 없습니다.</p>;
  }

  return (
    <div className="detail-list">
      {lions.map((lion) => (
        <DetailCard key={lion.id} lion={lion} />
      ))}
    </div>
  );
}

export default DetailCardList;
