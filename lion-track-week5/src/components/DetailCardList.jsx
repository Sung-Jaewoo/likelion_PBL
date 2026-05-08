import DetailCard from "./DetailCard";

function DetailCardList({ lions }) {
  return (
    <div className="detail-list">
      {lions.map((lion) => (
        <DetailCard key={lion.id} lion={lion} />
      ))}
    </div>
  );
}

export default DetailCardList;