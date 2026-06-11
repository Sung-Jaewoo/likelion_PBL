import type { KeyboardEvent } from "react";
import type { Lion, LionId } from "../types/lion";
import { normalizeTechList } from "../utils/lion";

interface SummaryCardProps {
  lion: Lion;
  onSelect: (lionId: LionId) => void;
}

function SummaryCard({ lion, onSelect }: SummaryCardProps) {
  const [badgeText] = normalizeTechList(lion.tech);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(lion.id);
    }
  };

  return (
    <article
      className="summary-card"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(lion.id)}
      onKeyDown={handleKeyDown}
    >
      <div className="image-wrap">
        <img src={lion.image} alt={`${lion.name} 프로필 이미지`} />
        <span className="badge">{lion.badge ?? badgeText}</span>
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
