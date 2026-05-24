function SummaryCard({ lion, onSelect }) {
  const badgeText = Array.isArray(lion.tech)
    ? lion.tech[0]
    : lion.tech;

  return (
    <article
      className="summary-card"
      role="button"
      tabIndex="0"
      onClick={() => onSelect(lion.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(lion.id);
        }
      }}
    >
      <div className="image-wrap">
        <img src={lion.image} alt={`${lion.name} 프로필 이미지`} />
        <span className="badge">{badgeText}</span>
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
