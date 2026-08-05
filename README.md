# Grayson Earle — Student Course Portal

A very minimal, high-aesthetic-quality static course portal for students, designed for lightweight and free hosting on GitHub Pages.

---

## Design Features
- **Visual System**: Refined editorial aesthetic with modern, structured typography pairing (`Syne` + `Plus Jakarta Sans`).
- **Responsive Layout**: Asymmetrical grid on desktop that gracefully collapses to a single-column layout on mobile devices.
- **Theme Adaptation**: Deep slate-and-cream dark mode with warm gold accents by default, with a manual toggle to a paper-like light theme.
- **Fluid Sizing**: Implements fluid spacing and type sizing using CSS `clamp()` tokens.
- **Single Page Architecture**: Quick client-side routing using URL hashes (`#hacking-als-praxis`, `#game-programming`, etc.) with smooth transition animations.
- **Accessibility**: Includes focus-visible indicators, ARIA landmarks, modal focus management, and keyboard controls (e.g., closing drawers with `Esc`).

---

## File Structure
- `index.html`: SEO-optimized semantic markup containing all course details and syllabi.
- `style.css`: Modern CSS variables, fluid typography rules, layouts, and animations.
- `app.js`: Clean JavaScript router, drawer controllers, and local storage theme persistence.
- `test_site.py`: Python unit tests to check HTML structures, route identifiers, and accessibility compliance.
- `build-pdf.js`: Renders the site to a print-ready PDF portfolio (see below).
- `print.html` / `print.js` / `print.css`: The paper edition of the site, assembled at print time from `index.html`.

---

## Generating PDF Portfolios

`build-pdf.js` prints the site to PDF using headless Chrome, for submitting
teaching materials as a document. It has no dependencies beyond Node 22+ and an
installed Chrome or Chromium.

```bash
./build-pdf.js                                # every course, in home-page order
./build-pdf.js ai-speculations                # a single course
./build-pdf.js game-programming physical-computing   # a subset, in that order
./build-pdf.js --list                         # print the available course ids
./build-pdf.js --out ~/applications/x.pdf ai-speculations
```

PDFs land in `dist/`, which is gitignored. Set `CHROME=/path/to/chrome` if
Chrome is not on `PATH`.

Course content is never duplicated: `print.js` fetches `index.html` at build
time and rebuilds it as a linear document, so editing a syllabus on the site
is all that is needed for the PDF to follow.

### What the document is

An academic teaching portfolio, not a printout of the site. Following the
standard model (Seldin; UT Austin's Faculty Instructional Support), a portfolio
is *selected samples that illustrate how teaching is carried out*, not a
collection of everything — so the structure is:

1. **Teaching Record** — the statement of teaching responsibilities, and the
   opening element. Eight institutions, 2011 to the present, every course with
   role and years, plus workshops. Tuned to fit on page one.
2. **Course entries** — each with the course, its outline, and evidence of
   student learning.
3. **Workshops** — secondary evidence, weighted below university teaching.

Course entries are ordered by the strength of the work, not by date, and the
order is set by hand in `PORTFOLIO`. The record on page one already gives the
chronology, so repeating it in the running order would only push the strongest
material further back.

There is deliberately **no biography and no teaching philosophy**: those travel
as separate documents in the application packet, so the framing here is light.

The record and the running order live in `PORTFOLIO` and `RECORD` in
`print.js`. The record is sourced from the vault's `courses_taught.pdf` and
covers far more than the site does — the site carries only the courses with
online material.

**Hierarchy** is the point. A five-year undergraduate course and a two-day
workshop must not read as equals. Weight is set three ways: university courses
open a page and workshops run on; entries documented by a single project get
`weight: 'brief'`, run on, and carry smaller images; workshop images are capped
smaller again.

The site bundles Oberlin, The New School, and Hunter thesis advising into one
"Other Courses & Advising" page. The portfolio splits them back into the
separate appointments they were, by pulling named projects out of that page.

### Other differences from the site

- **Schedules become summaries.** Week-by-week tables read as administration on
  paper, so courses that have one get a prose *Course Outline* instead, written
  in the `SUMMARIES` map.
- **Student-facing sections are cut or condensed.** `SKIP_SECTIONS` drops a
  section outright (AI Speculations' reading list is written for someone taking
  the seminar and tells a committee nothing); `SECTION_REWRITES` keeps the
  heading and replaces the body with a paragraph, which is what the semester
  brief and learning program get.
- **Student work gets context.** `PROJECT_NOTES` and `CAPTION_REWRITES` add or
  replace the line under a project, because on paper a poster frame and a title
  can't carry the idea the way a video playing does.
- **Metadata is corrected, not just filtered.** `META_OVERRIDES` fixes fields
  the site has wrong or over-long, by course and label.
- **Fanzine.** Hacking als Praxis reproduces the booklet pages rendered from the
  InDesign PDF (`assets/fanzine/booklet/`) rather than the scanned spreads the
  site carries. Page 1 is the seminar's opening statement set white-on-black; it
  is transcribed as text in `FANZINE.statement` instead of reproduced, since a
  full plate of reversed type is a page spent on something nobody will read.
  Page 9 is a blank black back cover and is skipped.
- **Omitted media and work.** `SKIP_MEDIA` drops media by source path, taking
  its wrapper with it; a section left with no media is dropped too.
  `SKIP_PROJECTS` drops a whole piece of student work by course and title.
- **Videos** become their poster frame plus a live link to the page where they
  can be watched. Since the frame is the only thing the video contributes on
  paper, `POSTER_OVERRIDES` replaces the site's poster where it is a blank
  first frame or a mid-motion blur; the replacements are cut from the same
  video into `assets/posters/print/`.
- **Links** are real PDF annotations. Relative hrefs are rewritten to
  `learn.graysonearle.com` so they don't bake in the build server's address.
- **Slideshows** expand into a contact sheet of every slide.

### Visual style

The PDF does **not** look like the website, and `print.html` deliberately does
not load `style.css`. It follows the "Impeccable" academic document standard
used across the application vault — see `~/workbench/Apply/DESIGN.md` and
`core/render/render_impeccable.py`, which is the canonical template:

- A4, 1.25cm margins, no browser header or footer.
- A letterhead on page one instead of a cover.
- Liberation Serif body at 10.5pt; Liberation Sans 900 uppercase headings;
  Liberation Mono for labels and data.
- Flat throughout: no shadows, no rounded corners, no decorative colour.
- **Rules are rationed.** Only the letterhead and an `h1` that opens a section
  draw one — roughly one line per page. Section headings, the record's
  institution rows, the metadata block, pull quotes and the fanzine plates all
  used to draw their own and no longer do; hierarchy is carried by size, weight
  and colour. A page of student work draws no rules at all.

All three Liberation faces are installed locally, so a build never depends on
the network.

### Pagination

Half-empty pages are the failure mode to watch for, and they come from
`break-inside: avoid`: a block that refuses to break jumps to a fresh page
whole and strands whatever was left of the previous one. Only atomic units
carry it — a single figure, one project card, an entry header. Multi-row grids
and reference lists must be allowed to split.

After changing anything in `print.css`, measure rather than eyeball. Render
every page and check where the ink stops; anything ending below ~72% that is
not a course's final page is a pagination bug, not a design choice. The current
build is 16 pages, and the only two pages ending early are the last page of
Physical Computing and the last page of the Thesis Advising entry, which is
short and sits immediately before a course that opens a page of its own.

The other lever is the image caps. A fixed `max-height` that is 1cm too
generous will not fit under the heading above it, so the whole block jumps and
strands a third of a page. `.print-video img`, `.project-media-split img` and
`.project-single-media .print-video img` were each tuned down for exactly that
reason — change one and re-measure the whole document, not the page you were
looking at.

### Not yet on the website

- `assets/fanzine/booklet/` — the nine booklet pages rendered from the
  InDesign PDF at 190 dpi. Currently print-only. The site still shows the
  older scanned spreads in `assets/fanzine/page_*.png`, which are lower
  resolution; worth swapping over when the fanzine section is next touched.
- `assets/posters/print/` — better poster frames for four of the Unity for
  Artists student videos. Print-only for now, but the site's posters for
  `rafa`, `sunette`, `ipek` and `mathias` are weak for the same reasons and
  could take these directly.

---

## Running Locally

Since the project uses vanilla web technologies, you can open `index.html` directly in your browser. For local server testing:

```bash
# Start a simple Python web server
python3 -m http.server 8080
```
Then navigate to `http://localhost:8080` in your web browser.

---

## Running Tests

To verify page structure, routes, accessibility metadata, and SEO compatibility, run the built-in python test script:

```bash
python3 test_site.py
```

---

## Deploying to GitHub Pages

The repository remote is already configured for `git@github.com:prismspecs/learn.git`. To deploy the site:

1. Commit and push the code to GitHub:
   ```bash
   git add .
   git commit -m "feat: implement minimal class portal website"
   git push -u origin main
   ```
2. Navigate to your repository page on GitHub: `https://github.com/prismspecs/learn`.
3. Go to **Settings** → **Pages** (under Code and automation).
4. Under **Build and deployment**, set **Source** to "Deploy from a branch".
5. Set the **Branch** to `main` and directory to `/ (root)`.
6. Click **Save**. Your site will be live at `https://prismspecs.github.io/learn/` in a few minutes.
