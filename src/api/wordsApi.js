import { SEED_WORDS } from '../data/words.js';

const STORAGE_KEY = 'english-vocabulary-simple';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readWords() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved === null) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_WORDS));
    return SEED_WORDS;
  }

  const words = JSON.parse(saved);
  if (!Array.isArray(words)) {
    throw new Error('Stored data is not a valid list.');
  }
  return words;
}

export async function getWords() {
  await delay(400);
  return readWords();
}

export async function addWord(form) {
  await delay(300);

  const words = readWords();
  const english = form.english.trim();
  const russian = form.russian.trim();
  const example = form.example.trim();

  if (!english || !russian || !example) {
    throw new Error('Fill in all text fields.');
  }

  if (words.some((word) => word.english.toLowerCase() === english.toLowerCase())) {
    throw new Error('This word already exists.');
  }

  const newWord = {
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    english,
    russian,
    example,
    level: form.level,
    category: form.category,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...words, newWord]));
  return newWord;
}
