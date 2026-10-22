const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
const categories = ['Everyday Life', 'Education', 'Work', 'Travel', 'Technology', 'Feelings'];

export default function FilterBar({ level, category, sort, onLevelChange, onCategoryChange, onSortChange }) {
  return (
    <div className="filter-bar">
      <label className="field">
        <span>Level</span>
        <select value={level} onChange={(event) => onLevelChange(event.target.value)}>
          <option value="all">All levels</option>
          {levels.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>

      <label className="field">
        <span>Category</span>
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>

      <label className="field">
        <span>Sort by</span>
        <select value={sort} onChange={(event) => onSortChange(event.target.value)}>
          <option value="az">A to Z</option>
          <option value="za">Z to A</option>
        </select>
      </label>
    </div>
  );
}
