# Grayson Earle — Student Course Portal

A very minimal, high-aesthetic-quality static course portal for students, designed for lightweight and free hosting on GitHub Pages.

---

## 🎨 Design Features
- **Visual System**: Refined editorial aesthetic with modern, structured typography pairing (`Syne` + `Plus Jakarta Sans`).
- **Responsive Layout**: Asymmetrical grid on desktop that gracefully collapses to a single-column layout on mobile devices.
- **Theme Adaptation**: Deep slate-and-cream dark mode with warm gold accents by default, with a manual toggle to a paper-like light theme.
- **Fluid Sizing**: Implements fluid spacing and type sizing using CSS `clamp()` tokens.
- **Single Page Architecture**: Quick client-side routing using URL hashes (`#hacking-als-praxis`, `#creative-coding-mischief`, etc.) with smooth transition animations.
- **Accessibility**: Includes focus-visible indicators, ARIA landmarks, modal focus management, and keyboard controls (e.g., closing drawers with `Esc`).

---

## 📂 File Structure
- `index.html`: SEO-optimized semantic markup containing all course details and syllabi.
- `style.css`: Modern CSS variables, fluid typography rules, layouts, and animations.
- `app.js`: Clean JavaScript router, drawer controllers, and local storage theme persistence.
- `test_site.py`: Python unit tests to check HTML structures, route identifiers, and accessibility compliance.

---

## 🚀 Running Locally

Since the project uses vanilla web technologies, you can open `index.html` directly in your browser. For local server testing:

```bash
# Start a simple Python web server
python3 -m http.server 8080
```
Then navigate to `http://localhost:8080` in your web browser.

---

## 🧪 Running Tests

To verify page structure, routes, accessibility metadata, and SEO compatibility, run the built-in python test script:

```bash
python3 test_site.py
```

---

## 🌐 Deploying to GitHub Pages

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
