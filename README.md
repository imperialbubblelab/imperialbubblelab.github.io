Monochrome Academic Website
===================================

Overview
--------
- Text-only, black-and-white, single centered column (document-like).
- Multi-page: Home, About, News, Research, Teaching, Publications, Notes, Blog.
- No images, no JavaScript build tooling.

- Quick Start
- -----------
- Open `index.html` in a browser.
- Edit header text (title/tagline) in each page as needed.
- Pages and primary files:
  - `index.html` — Home
  - `about.html` — About page
  - `news.html` — News
  - `blog/` — Folder containing individual blog posts (HTML files)
  - `notes.html` — Notes
  - `research.html` — Research summary and math examples
  
  - `teaching.html` — Courses
  - `publications.html` — Selected publications
  - `blog.html` — Placeholder for posts
  - `styles.css` — Shared styles
- Optional: Link a CV by replacing the `#` in Home’s contact with a file path (e.g., `cv.pdf`).

Typography
----------
- Typeface: `"Helvetica Neue", Helvetica, Arial, sans-serif`.
- Bold, uppercase display for the site title and section headings.
- If you prefer all text bold, add to `styles.css`:

  body { font-weight: 700; }

Layout
------
- Centered page container with readable line length.
- Linear sections; no dividers or decorative lines.
 - Nav active tab shows a colored underline; defaults are monochrome shades you can customize.

News
----
- Edit Home news items in `index.html:35` as list items under `<ul class="news">`.
- Format suggestion: `<li><time datetime="YYYY-MM-DD">YYYY-MM-DD</time> Your update.</li>`.

Accessibility & Print
---------------------
- Includes a “Skip to content” link.
- Print stylesheet keeps crisp, monochrome output.

Partials (Header/Footer)
------------------------
- The header and footer are defined once and included on every page at runtime.
- Edit these files to update all pages:
  - `partials/header.html`
  - `partials/footer.html`
- Each page has placeholders like `<div data-include="partials/header.html"></div>`.
- A tiny script (`scripts/include.js`) fetches and injects the partials, and marks the current nav link.

Local preview tip: modern browsers block `fetch()` from `file://` for security. Run a local server:

  python3 -m http.server 8000

Then open `http://localhost:8000/`.

Research Page
-------------
- Single page at `research.html`. Subpages and dropdown removed for simplicity.

- Active Tab Colors
- -----------------
- Edit per-tab colors in `styles.css` under `:root` via CSS variables:
  - `--tab-about`, `--tab-home`, `--tab-news`, `--tab-research`, `--tab-teaching`, `--tab-publications`, `--tab-notes`, `--tab-blog`
- Colors are grayscale by default to keep the monochrome style; you can set them to brand colors if desired.

Deployment
----------
- Host these files on any static host (GitHub Pages, university web space, etc.).

Blog Posts
----------
- Add new posts as standalone HTML files under `blog/` (e.g., `blog/2025-10-01-my-note.html`).
- Link them from `blog.html` to appear in the list. The nav automatically marks Blog active on subpages.

Local LaTeX (KaTeX)
-------------------
- This page is wired for local KaTeX. Place the KaTeX distribution files under `vendor/katex/` so these paths exist:
  - `vendor/katex/katex.min.css`
  - `vendor/katex/katex.min.js`
  - `vendor/katex/contrib/auto-render.min.js`
  - `vendor/katex/fonts/*` (entire fonts folder)
- After files are in place, write math using `$...$` (inline) or `$$...$$` (display).

Fetch KaTeX (optional helper)
-----------------------------
- If you have internet access, download the assets from KaTeX releases:

  - Download: https://github.com/KaTeX/KaTeX/releases (e.g., v0.16.11)
  - Extract the archive and copy its `katex/` folder to `vendor/katex/` in this project

Notes
-----
- If KaTeX files are missing, the page still loads; math remains as plain `$...$` text.
