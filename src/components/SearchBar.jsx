export default function SearchBar({ value, onChange }) {
  return (
    <label className="field search-field">
      <span>Search</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="English or Russian word..."
      />
    </label>
  );
}
