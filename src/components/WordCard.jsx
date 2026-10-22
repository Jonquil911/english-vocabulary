export default function WordCard({ word, onOpen }) {
  return (
    <button className="word-card" type="button" onClick={() => onOpen(word.id)}>
      <div className="word-card-top">
        <span className="word-level">{word.level}</span>
        <span className="arrow">↗</span>
      </div>
      <h3>{word.english}</h3>
      <p>{word.russian}</p>
      <span className="word-category">{word.category}</span>
    </button>
  );
}
