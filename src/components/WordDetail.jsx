import { useState } from 'react';

export default function WordDetail({ word, onBack }) {
  const [showExample, setShowExample] = useState(false);

  return (
    <section className="detail-layout">
      <button className="back-link" type="button" onClick={onBack}>← Back to words</button>
      <div className="detail-card">
        <span className="eyebrow">VOCABULARY CARD</span>
        <h1>{word.english}</h1>
        <p className="detail-translation">{word.russian}</p>
        <div className="detail-tags">
          <span className="tag">{word.level}</span>
          <span className="tag">{word.category}</span>
        </div>
        <hr />
        <h2>Example sentence</h2>
        <button type="button" className="secondary-button" onClick={() => setShowExample(!showExample)}>
          {showExample ? 'Hide example' : 'Show example'}
        </button>
        {showExample && <p className="example">“{word.example}”</p>}
      </div>
    </section>
  );
}
