import { useState } from 'react';

const initialForm = {
  english: '',
  russian: '',
  example: '',
  level: 'A1',
  category: 'Everyday Life',
};

export default function AddWordForm({ onAdd, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function change(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    if (saving) return;

    setSaving(true);
    setError('');

    try {
      await onAdd(form);
    } catch (err) {
      setError(err.message || 'Could not add the word.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="form-page">
      <button className="back-link" type="button" onClick={onCancel}>← Back to words</button>
      <div className="form-card">
        <span className="eyebrow">GROW YOUR VOCABULARY</span>
        <h1>Add a new word</h1>
        <p className="muted">Fill in the fields to save your own vocabulary card.</p>

        <form onSubmit={submit} className="add-form">
          <label className="field">
            <span>English word</span>
            <input name="english" value={form.english} onChange={change} required maxLength={60} placeholder="e.g. achieve" />
          </label>
          <label className="field">
            <span>Russian translation</span>
            <input name="russian" value={form.russian} onChange={change} required maxLength={100} placeholder="e.g. достигать" />
          </label>
          <label className="field">
            <span>Example sentence</span>
            <textarea name="example" value={form.example} onChange={change} required maxLength={250} rows="3" placeholder="e.g. You can achieve your goals." />
          </label>
          <div className="two-fields">
            <label className="field">
              <span>Level</span>
              <select name="level" value={form.level} onChange={change}>
                {['A1', 'A2', 'B1', 'B2', 'C1'].map((level) => <option key={level}>{level}</option>)}
              </select>
            </label>
            <label className="field">
              <span>Category</span>
              <select name="category" value={form.category} onChange={change}>
                {['Everyday Life', 'Education', 'Work', 'Travel', 'Technology', 'Feelings'].map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="form-actions">
            <button className="secondary-button" type="button" onClick={onCancel} disabled={saving}>Cancel</button>
            <button className="primary-button" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Add word'}</button>
          </div>
        </form>
      </div>
    </section>
  );
}
