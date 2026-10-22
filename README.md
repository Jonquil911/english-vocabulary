# English Vocabulary — simple React midterm project

A small, responsive React Single Page Application for learning English words.

## Run locally

1. Install **Node.js** (LTS version) if you don't have it.
2. Open this folder in VS Code (`File > Open Folder`).
3. Open the terminal (`Terminal > New Terminal`).
4. Run:

```bash
npm install
npm run dev
```

5. Open the **Local** URL Vite shows, usually `http://localhost:5173/`.

**Stop the server:** press `Ctrl + C` in the terminal.

**Production build:**

```bash
npm run build
npm run preview
```

## Features

- 120 initial words (6 categories × 20 words)
- Word list with details and examples
- Controlled form to add a word
- Search in English and Russian
- Filter by CEFR level and category
- Sort A–Z / Z–A
- Pagination (12 words per page)
- Loading, error, empty and success states
- Responsive UI
- Simulated asynchronous API (Promises, delays, JSON data and `localStorage`)

## Project files

```text
src/
  main.jsx               React entry point
  App.jsx                Main state, effect, search, sorting, pagination
  style.css              Responsive design
  api/wordsApi.js        Simulated API: getWords(), addWord()
  data/words.js          Initial 120 words
  components/
    SearchBar.jsx        Controlled search input
    FilterBar.jsx        Filter and sort inputs
    WordList.jsx         Word card collection
    WordCard.jsx         One word preview
    WordDetail.jsx       Details and example toggle
    AddWordForm.jsx      Controlled form and saving states
    Pagination.jsx       Previous/next navigation
```

## Where data is stored

On first load, the app copies 120 words into the browser's `localStorage` using the key `english-vocabulary-simple`. New words are added there too. Data stays after refreshing the page, but it is **per browser/device**, not on a shared server. Clearing site data resets the list to 120 words. This is the **simulated API** option permitted in the project specification.

## Deploy to Vercel

1. Create a public GitHub repository and push this project.
2. In [Vercel](https://vercel.com), select **Add New → Project** and import the repository.
3. Choose **Vite** (if prompted). Use build command `npm run build` and output directory `dist`.
4. Deploy and open the public link. Test searching and adding a word on the deployed site.

No external backend or environment variables are needed.

## Quick defense notes

- `App` is the common parent for the list, filters, and details. It stores `words`, loading status, filters, current page and view.
- `AddWordForm` stores its own fields with `useState` because only that component needs them. Every input is controlled by React state.
- `useEffect` runs `getWords()` on mount and when `retry` changes. Its cleanup uses the `cancelled` flag to ignore stale requests.
- Clicking a card changes `selectedId` and `view` in `App`, which causes a re-render.
- `WordList` uses `word.id` as a stable React key. `WordDetail` also receives a `key` to reset its local `showExample` state when a different word is selected.
- The form calls `onAdd` from its parent. `App` calls `addWord` and adds the new word immutably using `[...previous, word]`.
- Filtering and sorting are done before pagination. Changing filters resets the page to 1.
- Loading/error/empty states appear in the list; success appears after adding a word.

## Note

The app needs internet to install npm packages initially. Afterwards the simulated API does not need internet.
