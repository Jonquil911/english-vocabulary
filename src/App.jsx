import { useEffect, useState } from 'react';
import { getWords, addWord } from './api/wordsApi.js';
import SearchBar from './components/SearchBar.jsx';
import FilterBar from './components/FilterBar.jsx';
import WordList from './components/WordList.jsx';
import WordDetail from './components/WordDetail.jsx';
import AddWordForm from './components/AddWordForm.jsx';
import Pagination from './components/Pagination.jsx';

const PAGE_SIZE = 12;

export default function App() {
  const [words, setWords] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('all');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('az');
  const [currentPage, setCurrentPage] = useState(1);

  const [view, setView] = useState('list');
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');
      setError('');

      try {
        const result = await getWords();
        if (!cancelled) {
          setWords(result);
          setStatus('success');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setStatus('error');
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [retry]);

  const filteredWords = words
    .filter((word) =>
      word.english.toLowerCase().includes(search.toLowerCase().trim()) ||
      word.russian.toLowerCase().includes(search.toLowerCase().trim())
    )
    .filter((word) => level === 'all' || word.level === level)
    .filter((word) => category === 'all' || word.category === category)
    .sort((a, b) => sort === 'az'
      ? a.english.localeCompare(b.english)
      : b.english.localeCompare(a.english));

  const totalPages = Math.max(1, Math.ceil(filteredWords.length / PAGE_SIZE));
  const visibleWords = filteredWords.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const selectedWord = words.find((word) => word.id === selectedId);

  function resetFilters() {
    setSearch('');
    setLevel('all');
    setCategory('all');
    setSort('az');
    setCurrentPage(1);
  }

  async function handleAdd(form) {
    const word = await addWord(form);
    setWords((previous) => [...previous, word]);
    setSelectedId(word.id);
    setMessage(`“${word.english}” added successfully!`);
    setView('detail');
  }

  function openWord(id) {
    setSelectedId(id);
    setMessage('');
    setView('detail');
  }

  function goHome() {
    setView('list');
    setSelectedId(null);
    setMessage('');
  }

  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-inner">
          <button className="brand" type="button" onClick={goHome}>word<span>wise.</span></button>
          <div className="header-actions">
            <button className="text-button" type="button" onClick={goHome}>All words</button>
            <button className="primary-button" type="button" onClick={() => { setMessage(''); setView('add'); }}>+ Add word</button>
          </div>
        </div>
      </header>

      <main className="container main">
        {message && <div className="success-message" role="status">✓ {message}</div>}

        {view === 'add' && (
          <AddWordForm onAdd={handleAdd} onCancel={goHome} />
        )}

        {view === 'detail' && selectedWord && (
          <WordDetail key={selectedWord.id} word={selectedWord} onBack={goHome} />
        )}

        {view === 'detail' && !selectedWord && (
          <div className="state-card"><p>Word not found.</p><button className="secondary-button" onClick={goHome}>Back</button></div>
        )}

        {view === 'list' && (
          <>
            <section className="intro">
              <span className="eyebrow">LEARN SOMETHING NEW EVERY DAY</span>
              <h1>Build your English <span>vocabulary.</span></h1>
              <p>Find useful words, learn their meaning, and explore real examples.</p>
            </section>

            {status === 'loading' && <div className="state-card" role="status">Loading words...</div>}

            {status === 'error' && (
              <div className="state-card" role="alert">
                <h2>Could not load words</h2>
                <p>{error}</p>
                <button className="secondary-button" onClick={() => setRetry((n) => n + 1)}>Try again</button>
              </div>
            )}

            {status === 'success' && (
              <>
                <div className="list-heading">
                  <div>
                    <h2>Word library</h2>
                    <p>{filteredWords.length} words found · {words.length} total</p>
                  </div>
                  <button className="reset-button" type="button" onClick={resetFilters}>Reset filters</button>
                </div>

                <div className="toolbar">
                  <SearchBar value={search} onChange={(value) => { setSearch(value); setCurrentPage(1); }} />
                  <FilterBar
                    level={level}
                    category={category}
                    sort={sort}
                    onLevelChange={(value) => { setLevel(value); setCurrentPage(1); }}
                    onCategoryChange={(value) => { setCategory(value); setCurrentPage(1); }}
                    onSortChange={(value) => { setSort(value); setCurrentPage(1); }}
                  />
                </div>

                {filteredWords.length === 0 ? (
                  <div className="state-card">
                    <h2>No matching words</h2>
                    <p>Try another search or reset the filters.</p>
                    <button className="secondary-button" type="button" onClick={resetFilters}>Reset filters</button>
                  </div>
                ) : (
                  <>
                    <WordList words={visibleWords} onOpen={openWord} />
                    <Pagination page={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
                  </>
                )}
              </>
            )}
          </>
        )}
      </main>

      <footer className="footer container">English Vocabulary · React Midterm Project</footer>
    </div>
  );
}
