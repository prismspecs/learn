#!/usr/bin/env node
/* --- PDF builder ---------------------------------------------------------
   Prints the teaching portfolio to PDF with headless Chrome, driven over the
   DevTools protocol for exact paper geometry. The document's structure and
   running order live in print.js (PORTFOLIO); this file only renders.

   Usage:
     ./build-pdf.js                       full portfolio
     ./build-pdf.js ai-speculations       one course, without the record
     ./build-pdf.js unity-trust hacking-als-praxis   several, in portfolio order
     ./build-pdf.js --list                show course ids
     ./build-pdf.js --out my.pdf ...      choose the output path

   No dependencies: static server, CDP client, and Chrome launch are all
   built on Node's standard library.
   ------------------------------------------------------------------------ */

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');
const { spawn, execFileSync } = require('child_process');

const ROOT = __dirname;
const OUT_DIR = path.join(ROOT, 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.svg': 'image/svg+xml'
};

const CHROME_CANDIDATES = [
  process.env.CHROME,
  'google-chrome',
  'google-chrome-stable',
  'chromium',
  'chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
].filter(Boolean);

function findChrome() {
  for (const candidate of CHROME_CANDIDATES) {
    try {
      execFileSync(candidate, ['--version'], { stdio: 'ignore' });
      return candidate;
    } catch { /* try the next one */ }
  }
  throw new Error(
    'No Chrome or Chromium found. Install one, or set CHROME=/path/to/chrome.'
  );
}

function courseIds() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const list = html.slice(
    html.indexOf('class="courses-list"'),
    html.indexOf('class="home-questions"')
  );
  return [...list.matchAll(/href="#([a-z0-9-]+)"/g)].map(m => m[1]);
}

function serve() {
  const server = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
    const file = path.join(ROOT, rel);
    // Never serve anything outside the project directory.
    if (!file.startsWith(ROOT + path.sep) && file !== ROOT) {
      res.writeHead(403).end();
      return;
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404).end();
        return;
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
      res.end(data);
    });
  });
  return new Promise(resolve => {
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

function launchChrome(chrome) {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'learn-pdf-'));
  const proc = spawn(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--remote-debugging-port=0',
    `--user-data-dir=${profile}`,
    'about:blank'
  ], { stdio: ['ignore', 'ignore', 'ignore'] });

  const portFile = path.join(profile, 'DevToolsActivePort');
  const deadline = Date.now() + 30000;
  return new Promise((resolve, reject) => {
    (function poll() {
      if (proc.exitCode !== null) return reject(new Error('Chrome exited before it was ready'));
      try {
        const [port] = fs.readFileSync(portFile, 'utf8').split('\n');
        if (port) return resolve({ proc, profile, port: Number(port) });
      } catch { /* not written yet */ }
      if (Date.now() > deadline) return reject(new Error('Timed out waiting for Chrome to start'));
      setTimeout(poll, 100);
    })();
  });
}

function getJson(port, route) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}${route}`, res => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(body)); } catch (err) { reject(err); }
      });
    }).on('error', reject);
  });
}

// Minimal CDP client. Node has had a WebSocket client built in since v22.
class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.addEventListener('message', event => {
      const msg = JSON.parse(event.data);
      const waiter = this.pending.get(msg.id);
      if (!waiter) return;
      this.pending.delete(msg.id);
      msg.error ? waiter.reject(new Error(msg.error.message)) : waiter.resolve(msg.result);
    });
  }

  static connect(url) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(url);
      ws.addEventListener('open', () => resolve(new CDP(ws)), { once: true });
      ws.addEventListener('error', () => reject(new Error(`Could not connect to ${url}`)), { once: true });
    });
  }

  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }
}

// A4 with the vault's 1.25cm margin, and no browser header or footer — the
// house standard renders with --no-pdf-header-footer, and the letterhead on
// page one carries the identification instead.
// See ~/workbench/Apply/core/render/render_impeccable.py.
const PAGE = {
  paperWidth: 8.27,
  paperHeight: 11.69,
  marginTop: 0.4921,
  marginBottom: 0.4921,
  marginLeft: 0.4921,
  marginRight: 0.4921,
  printBackground: true,
  displayHeaderFooter: false
};

async function main() {
  const argv = process.argv.slice(2);

  if (argv.includes('--list')) {
    // Ordering and which entries appear belong to print.js (PORTFOLIO); these
    // are just the course ids on the site that an excerpt can be built from.
    console.log(courseIds().join('\n'));
    return;
  }
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log([
      'Usage:',
      '  ./build-pdf.js                                  full portfolio',
      '  ./build-pdf.js <course-id>                      one course',
      '  ./build-pdf.js <course-id> <course-id> ...      several, in that order',
      '  ./build-pdf.js --list                           show course ids',
      '  ./build-pdf.js --out path.pdf [course-id ...]   choose the output path',
      '',
      'PDFs are written to dist/ unless --out says otherwise.',
      'Set CHROME=/path/to/chrome if Chrome is not on PATH.'
    ].join('\n'));
    return;
  }

  let out = null;
  const outIndex = argv.indexOf('--out');
  if (outIndex !== -1) {
    out = argv[outIndex + 1];
    argv.splice(outIndex, 2);
  }

  const known = courseIds();
  const requested = argv.filter(a => !a.startsWith('-'));
  const unknown = requested.filter(id => !known.includes(id));
  if (unknown.length) {
    console.error(`Unknown course(s): ${unknown.join(', ')}`);
    console.error(`Known ids: ${known.join(', ')}`);
    process.exit(1);
  }

  // "all" is not the same as listing every course: print.js only prints the
  // teaching record for a whole-portfolio build, because the full history
  // attached to a single-course excerpt would misrepresent it.
  const ids = requested.length ? requested : ['all'];
  if (!out) {
    out = requested.length === 1
      ? path.join(OUT_DIR, `grayson-earle-${requested[0]}.pdf`)
      : path.join(OUT_DIR, 'grayson-earle-teaching-portfolio.pdf');
  }

  const chrome = findChrome();
  const { server, port: httpPort } = await serve();
  const { proc, profile, port: cdpPort } = await launchChrome(chrome);

  const cleanup = async () => {
    server.close();
    if (proc.exitCode === null) {
      const exited = new Promise(resolve => proc.once('exit', resolve));
      proc.kill();
      await Promise.race([exited, new Promise(r => setTimeout(r, 5000))]);
    }
    // Chrome can still be flushing its profile as it goes down; a leftover
    // temp directory is not worth failing an otherwise finished build over.
    try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch { /* ignore */ }
  };

  try {
    const { webSocketDebuggerUrl } = await getJson(cdpPort, '/json/version');
    const cdp = await CDP.connect(webSocketDebuggerUrl);

    const url = `http://127.0.0.1:${httpPort}/print.html?course=${encodeURIComponent(ids.join(','))}`;
    const { targetId } = await cdp.send('Target.createTarget', { url });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });

    const deadline = Date.now() + 120000;
    for (;;) {
      const { result } = await cdp.send('Runtime.evaluate', {
        expression: 'window.__printError || (window.__printReady === true)',
        returnByValue: true
      }, sessionId);
      if (typeof result.value === 'string') throw new Error(`Print page failed: ${result.value}`);
      if (result.value === true) break;
      if (Date.now() > deadline) throw new Error('Timed out waiting for the print page to render');
      await new Promise(r => setTimeout(r, 250));
    }

    const { data } = await cdp.send('Page.printToPDF', PAGE, sessionId);

    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, Buffer.from(data, 'base64'));

    const kb = (fs.statSync(out).size / 1024 / 1024).toFixed(1);
    console.log(`${out}  (${kb} MB)`);
    console.log(`  ${ids[0] === 'all' ? 'full portfolio' : ids.join(', ')}`);
  } finally {
    await cleanup();
  }
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
