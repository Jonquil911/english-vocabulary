import WordCard from './WordCard.jsx';

export default function WordList({ words, onOpen }) {
  return (
    <div className="word-grid">
      {words.map((word) => (
        <WordCard key={word.id} word={word} onOpen={onOpen} />
      ))}
    </div>
  );
}
