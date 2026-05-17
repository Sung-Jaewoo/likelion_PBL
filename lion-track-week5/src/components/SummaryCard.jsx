function SummaryCard({ lion }) {
  return (
    <article className="summary-card">
      <div className="image-wrap">
        <img src={lion.image} alt={lion.name} />
        <span className="badge">{lion.badge}</span>
      </div>

      <div className="summary-content">
        <h3>{lion.name}</h3>
        <p className="part">{lion.part}</p>
        <p className="one-line">{lion.intro}</p>
      </div>
    </article>
  );
}

export default SummaryCard;