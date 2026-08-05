/* --- Teaching portfolio, print document builder -------------------------
   Assembles an academic teaching portfolio from index.html, which stays the
   single source of truth for course content and student work.

   The document is not a linear dump of the site. It opens with the teaching
   record, then presents courses as evidence, reverse-chronologically by
   institution, with university courses weighted above workshops. The framing
   is deliberately light: the teaching philosophy and statements travel as
   separate documents in the application packet.

   Everything in this file is print-only. Nothing here changes the website.
   ------------------------------------------------------------------------ */

const SITE = 'learn.graysonearle.com';

/* --- Teaching record -----------------------------------------------------
   The full appointment history, which the site does not carry: it shows the
   handful of courses that have online material, not fourteen years of them.
   Source: ~/workbench/Apply/applications/academic/
   2026-08-17-hbk-braunschweig-experimental-media/courses_taught.pdf
   ---------------------------------------------------------------------- */
const RECORD = [
  {
    institution: 'Hochschule für Bildende Künste Braunschweig',
    role: 'Lehrbeauftragter',
    years: '2025–26',
    courses: ['Hacking als Praxis. Two semesters, taught in German and English.']
  },
  {
    institution: 'die Angewandte, University of Applied Arts Vienna',
    role: 'Visiting Senior Teaching Artist',
    years: '2023–24',
    courses: ['AI Speculations. Co-developed interdisciplinary semester, with curriculum development across departments.']
  },
  {
    institution: 'Parsons School of Art and Design, New York',
    role: 'Lecturer',
    years: '2020',
    courses: ['Core Lab Environments: Game Environments.']
  },
  {
    institution: 'Oberlin College and Conservatory, Studio Art',
    role: 'Visiting Assistant Professor',
    years: '2018–19',
    courses: [
      'CryptoCultural Production.',
      'Simulations as Art.',
      'Arts &amp; Interactive Technology.',
      'Creative Interventions.',
      'Senior Studio. Thesis mentorship and individual creative development.'
    ]
  },
  {
    institution: 'The New School, Eugene Lang College, Code+Arts',
    role: 'Adjunct Assistant Professor',
    years: '2018–19',
    courses: ['Cryptocurrency: Money as Medium.']
  },
  {
    institution: 'New York City College of Technology, CUNY, Entertainment Technology',
    role: 'Substitute Assistant Professor',
    years: '2017–18',
    courses: [
      'Integrated Media Systems Design.',
      'Digital Fabrication.',
      'Ins and Outs of Physical Computing.',
      'Introduction to Game Design.'
    ]
  },
  {
    institution: 'Hunter College, CUNY',
    years: '2011–17',
    courses: [
      'Sculptural Methods. Visiting Artist, Studio MFA Program, 2016–17.',
      'Physical Computing. Adjunct Assistant Professor, Integrated Media Arts MFA, 2014–17.',
      'Game Programming. Adjunct Assistant Professor, Film and Media Studies, 2013–17.',
      'Media Production in the Digital Environment. Adjunct Lecturer, Film and Media Studies, 2011–13.'
    ]
  },
  {
    institution: 'Baruch College, CUNY, Fine and Performing Arts',
    role: 'Adjunct Assistant Professor',
    years: '2013–14',
    courses: ['Web Art.']
  }
];

const WORKSHOPS = [
  'Unity for Artists, Trust, Berlin, 2026.',
  'Creative Coding &amp; Electronic Mischief, School of Machines &amp; Make Believe, Berlin, 2026.',
  'Media Arts HackLab, BBK &amp; UdK, Bethanien, Berlin, 2025.',
  'Unity for Artists, Akademie Schloss Solitude, 2025.',
  'Art &amp; Artificial Intelligence, Berufsverband Bildender Künstler*innen (BBK), 2024.',
  'Strike! Digital Sabotage and Strike! Speculative Tools for Workplace Protest, Pioneer Works, New York, 2019–22.',
  'Reconsidering Institutional Conduct, Künstlerhaus Stuttgart, 2021.',
  'Interventionist Art Practices, International Center for Photography, New York, 2018.',
  'Ongoing coding workshops as technical lead of the Web Residency programme, Akademie Schloss Solitude, 2020–present.'
];

/* --- Portfolio ordering --------------------------------------------------
   Ordered by the strength of the work, not by date, and set by hand — the
   teaching record on page one already carries the chronology, so repeating it
   here would only push the strongest material further back. Workshops come
   last as a tier of their own.

   Entries either take a whole course page from the site, or pull named
   projects out of one — the site's "Other Courses & Advising" bundles three
   separate appointments together, which reads as less experience than it was.
   ---------------------------------------------------------------------- */
const PORTFOLIO = [
  {
    key: 'hacking-als-praxis',
    source: 'hacking-als-praxis',
    tier: 'course',
    title: 'Hacking als Praxis',
    subtitle: 'Hacking as a Creative Practice',
    institution: 'Hochschule für Bildende Künste Braunschweig',
    role: 'Lehrbeauftragter',
    years: '2025–26'
  },
  {
    key: 'physical-computing',
    source: 'physical-computing',
    tier: 'course',
    institution: 'Hunter College, CUNY, Integrated Media Arts MFA',
    role: 'Adjunct Assistant Professor',
    years: '2014–17'
  },
  {
    key: 'ai-speculations',
    source: 'ai-speculations',
    tier: 'course',
    institution: 'die Angewandte, University of Applied Arts Vienna',
    role: 'Visiting Senior Teaching Artist',
    years: '2023–24'
  },
  {
    key: 'creative-interventions',
    weight: 'brief',
    source: 'other-courses',
    projects: ['Projection on Mudd Library'],
    tier: 'course',
    title: 'Creative Interventions',
    institution: 'Oberlin College and Conservatory, Studio Art',
    role: 'Visiting Assistant Professor',
    years: '2018–19',
    description: 'Tactical media and practice in public space. Students worked outside the gallery, and carried ' +
      'the logistics and the politics of putting work into a space they did not control.'
  },
  {
    key: 'money-as-medium',
    weight: 'brief',
    source: 'other-courses',
    projects: ['Decontextualizing the Dollar'],
    tier: 'course',
    title: 'Cryptocurrency: Money as Medium',
    institution: 'The New School, Eugene Lang College, Code+Arts',
    role: 'Adjunct Assistant Professor',
    years: '2018–19',
    description: 'The anthropology of debt paired with the design of currency. Students read Graeber and studied ' +
      'artistic interventions into money while making physical currency layers and putting them into circulation. ' +
      'The reading shaped the making, and the making sharpened the reading.'
  },
  {
    key: 'thesis-advising',
    weight: 'brief',
    source: 'other-courses',
    projects: ['Political Sexism on Twitter'],
    tier: 'course',
    title: 'Thesis Advising',
    institution: 'Hunter College, CUNY',
    role: 'Honors thesis supervision',
    years: '2011–17',
    description: 'Individual supervision of honors thesis projects alongside the taught courses.'
  },
  {
    key: 'game-programming',
    source: 'game-programming',
    tier: 'course',
    institution: 'Hunter College, CUNY, Film and Media Studies',
    role: 'Adjunct Assistant Professor',
    years: '2013–17'
  },
  {
    key: 'unity-trust',
    source: 'unity-trust',
    tier: 'workshop',
    institution: 'Trust, Berlin',
    role: 'Public workshop',
    years: '2026'
  },
  {
    key: 'creative-coding-mischief',
    source: 'creative-coding-mischief',
    tier: 'workshop',
    institution: 'School of Machines &amp; Make Believe, Berlin',
    role: 'Public workshop',
    years: '2026'
  }
];

/* Week-by-week schedules read as administration on paper. Each course that
   has one is summarised here instead. Print-only editorial copy — the site
   keeps its full schedule. */
const SUMMARIES = {
  'hacking-als-praxis':
    'Thirteen weeks, front-loaded with input and given over to production in the second half. The ' +
    'opening sessions move outward through scales of intervention: tactical media history and case ' +
    'studies, code as law and ideology, guerrilla projection and public space, hardware modification ' +
    'and counter-surveillance, then alternative networks and the digital commons. Each ends with a ' +
    'short assignment that asks students to find and document a vulnerable system rather than build ' +
    'anything yet. From there the course becomes a studio — proposals and peer critique, in-class ' +
    'prototyping, and a public showcase where the work is discussed for its political claims as much ' +
    'as its aesthetic ones. The collective outcome is a printed fanzine, HACKEN, reproduced below.',

  'unity-trust':
    'Four sessions of two and a half hours, no coding required. Day one covers the engine itself — ' +
    'interface, real-time rendering, and basic physics — and ends with students sketching a concept ' +
    'for their own environment. Day two is construction: greyboxing with ProBuilder, a first-person ' +
    'controller, imported assets, materials and shaders. Day three is where the work becomes ' +
    'atmospheric, with lighting design, volumetric fog, spatial audio, and camera work through ' +
    'Timeline and Cinemachine. Day four is finishing: post-processing, video capture with Unity ' +
    'Recorder, and a group showcase. Everyone leaves with a rendered cinematic of a space they built.',

  'creative-coding-mischief':
    'A semester that starts at the breadboard and ends at a public exhibition. The first five sessions ' +
    'build a working vocabulary in electronics and Arduino: digital output, inputs and serial ' +
    'communication, sound from square waves, analog input, then sensors and servos. From there the ' +
    'course widens into two-way communication between Arduino and Processing, 3D design and printing ' +
    'for custom housings, and projection mapping in TouchDesigner driven by live sensor data. Sarah ' +
    'Grant taught as guest instructor across the Processing and fabrication sessions. The last three ' +
    'weeks are an open workshop for final projects, shown publicly at the closing exhibition.'
};

/* Media that belongs on the site but not in a portfolio document: promotional
   material for a workshop, and documentation of the room rather than of what
   anyone made in it. Dropping every item in a section drops the section too. */
const SKIP_MEDIA = new Set([
  'assets/creative_coding_mischief.gif',
  'assets/school_of_machines_exhibition.mp4',
  'assets/unity_promo_1.mp4',
  'assets/unity_promo_3.mp4',
  'assets/hunter-gp/donovan.mp4',
  'assets/hunter-gp/jason_bollers.mp4'
]);

/* A poster frame is the only thing a video contributes on paper, so the site's
   is not always the right one — several default to a blank first frame or a
   mid-motion blur. Print-only replacements, cut from the same video, keyed by
   the source the site plays. */
const POSTER_OVERRIDES = {
  'assets/rafa.mp4': 'assets/posters/print/rafa.jpg',
  'assets/sunette.mp4': 'assets/posters/print/sunette.jpg',
  'assets/ipek.mp4': 'assets/posters/print/ipek.jpg',
  'assets/mathias.webm': 'assets/posters/print/mathias.jpg'
};

/* The site shows the fanzine as scanned spreads. In print, use pages rendered
   straight from the InDesign PDF — same booklet, far better on paper. */
// Page 1 is the seminar's opening statement, set white-on-black; it is
// transcribed below instead of reproduced, because a full plate of reversed
// type is a page spent on something a reader can't comfortably read. Page 9 is
// a blank black back cover, which in a portfolio reads as a printing fault.
// The second and third projects are print-only cuts: page 3 is the synthesizer,
// and the third runs across pages 4 and 5, so both go or the essay is left
// starting halfway through.
const FANZINE = {
  spreads: [2, 6, 7, 8].map(n => `assets/fanzine/booklet/page_${n}.jpg`),
  statement: {
    credit: 'Hacking as Artistic Practice — a theory/practice seminar by Johannes Büttner and Grayson Earle',
    paragraphs: [
      'For two semesters we gathered as a temporary collective of artists, designers, and theorists. ' +
        'Not to master disciplines, but to dissolve them. We believe that the most interesting ideas ' +
        'emerge where categories collapse and borders become interfaces.',
      'Winter was dedicated to reading systems. Summer to rewriting them.',
      'We understood hacking not as a technical skill but as an artistic method: questioning the status ' +
        'quo, imagining alternative realities, misusing objects, challenging infrastructures, exposing ' +
        'hidden protocols and building prototypes of other futures. Every object is unfinished. Every ' +
        'institution editable. Every failure a new version.',
      'Our projects were acts of self-empowerment, solidarity, speculation and joyful sabotage. They did ' +
        'not seek efficient solutions but productive disturbances. Temporary glitches in reality. Moments ' +
        'in which another world briefly booted.',
      '<strong>The future will not be delivered. It has to be hacked.</strong>',
      'The projects are scattered across the HBK, treating the Rundgang itself as material. They ' +
        'infiltrate its routes, interrupt its routines and turn the exhibition&rsquo;s own infrastructure ' +
        'into something that can be rewritten.'
    ]
  }
};

/* Metadata the record line above each course already states, plus the fields
   that only make sense to someone deciding whether to enrol. */
const REDUNDANT_META = /^(institution|institutions|location|term|years taught|dates|courses|price)$/i;

/* Corrections to the site's metadata, by course and field label. */
const META_OVERRIDES = {
  'hacking-als-praxis': {
    Department: 'IFK',
    Duration: '13 weeks'
  },
  'ai-speculations': {
    Department: 'Design Investigations'
  }
};

/* Sections of a course page that document the course to its students rather
   than the teaching to a reader, matched on their heading. A reading list is
   for someone taking the seminar; it tells a hiring committee nothing. */
const SKIP_SECTIONS = {
  'ai-speculations': ['Inspiration & References']
};

/* Individual pieces of student work that stay on the site but not in the
   portfolio, by course and by their title there. */
const SKIP_PROJECTS = {
  'ai-speculations': ['Run Diffusion']
};

/* Some sections are written for students working through a semester and run
   far too long on paper. These replace them with the substance in a paragraph,
   matched on the section's heading. */
const SECTION_REWRITES = {
  'ai-speculations': {
    'Design Brief':
      '<strong>Design a personal AI agent.</strong> Not the kind that tells you the weather and plays your ' +
      'favourite song — a guide, companion, curator, alter ego, pet, politician or provocateur, and as ' +
      'plausibly an object, a wearable or an avatar as an app. Students had to establish what it opens up ' +
      'in their lives and relationships and then what it wrecks: whose values it holds, what data trained ' +
      'it, how it behaves and what it is like to talk to, and what business model shapes what it does.',
    'Learning Program':
      'Lectures and short workshops ran across the semester, taught by Google technologists and outside ' +
      'guests: AI 101, data privacy and security, image generation, large language models, audio ' +
      'generative models, and rapid prototyping and storytelling.'
  }
};

/* Student work needs saying what it is. The site can rely on the video playing;
   on paper a poster frame and a title are not enough to carry the idea. Keyed
   by course, then by the project's title on the site. */
const PROJECT_NOTES = {
  'ai-speculations': {
    'AI Apologies':
      'Language models apologise compulsively, and for everything. The piece takes that tendency to its ' +
      'limit: a video loop of an AI apologising, and then apologising for apologising, without end.',
    'd(AI)ing':
      'An attempt to accelerate a language model towards death. Its output is put under progressively ' +
      'more stress until it stops making sense, and the piece watches the thing come apart.',
    'The Nuteones Revolution':
      'A speculative product designed to end world hunger, and an account of the unexpected consequences ' +
      'that follow from it.'
  }
};

/* Captions written for someone who is about to press play. */
const CAPTION_REWRITES = {
  'ai-speculations': {
    'Poetry slam, part one.': 'Joe Biden recites poetry.',
    'Poetry slam, part two.': 'Donald Trump recites poetry.'
  }
};

const params = new URLSearchParams(location.search);
const wanted = (params.get('course') || 'all').split(',').map(s => s.trim()).filter(Boolean);

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

const img = (src, alt) => {
  const n = document.createElement('img');
  n.src = src;
  n.alt = alt || '';
  return n;
};

// Strip the scheme and any trailing slash so a printed URL stays on one line
// and reads as something a person would actually type.
const tidyUrl = href => href.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');

function buildLetterhead() {
  const head = el('header', 'letterhead');

  const nameBlock = el('div');
  nameBlock.appendChild(el('div', 'letterhead-name', 'Grayson Earle'));
  nameBlock.appendChild(el('div', 'letterhead-label', 'Teaching Portfolio'));
  head.appendChild(nameBlock);

  const contact = el('div', 'letterhead-contact');
  contact.appendChild(el('div', null, 'studio@graysonearle.com'));
  contact.appendChild(el('div', null, SITE));
  head.appendChild(contact);

  return head;
}

/* The record first: what was taught, where, and for how long. The reader
   should be able to see the whole history before any single course. */
function buildRecord() {
  const sec = el('section', 'record');
  sec.appendChild(el('h1', null, 'Teaching Record'));

  sec.appendChild(el('p', 'record-note',
    'Courses taught since 2011, followed by documentation from those with material online. ' +
    'Student work is reproduced with the students named.'));

  sec.appendChild(el('h2', null, 'University Teaching'));
  RECORD.forEach(item => {
    const row = el('div', 'record-item');

    const head = el('div', 'record-head');
    head.appendChild(el('span', 'record-inst', item.institution));
    head.appendChild(el('span', 'record-role',
      [item.role, item.years].filter(Boolean).join(' · ')));
    row.appendChild(head);

    const list = el('ul', 'record-courses');
    item.courses.forEach(course => {
      const li = el('li');
      li.innerHTML = course;
      list.appendChild(li);
    });
    row.appendChild(list);

    sec.appendChild(row);
  });

  sec.appendChild(el('h2', null, 'Workshops and Guest Teaching'));
  const list = el('ul', 'record-workshops');
  WORKSHOPS.forEach(w => {
    const li = el('li');
    li.innerHTML = w;
    list.appendChild(li);
  });
  sec.appendChild(list);

  return sec;
}

const mediaSrc = node => node.tagName === 'VIDEO'
  ? (node.querySelector('source') || {}).getAttribute?.('src')
  : node.getAttribute('src');

// Drop site-only media, and take its caption and wrapper with it so nothing
// is left describing something that is no longer on the page.
function dropSkippedMedia(scope) {
  const hadMedia = new Set();
  scope.querySelectorAll('section').forEach(section => {
    if (section.querySelector('img, video')) hadMedia.add(section);
  });

  scope.querySelectorAll('img, video').forEach(node => {
    const src = mediaSrc(node);
    if (!src || !SKIP_MEDIA.has(src)) return;
    const wrapper = node.closest('.exhibition-media-item, .documentation-item, .project-block');
    (wrapper || node).remove();
  });

  hadMedia.forEach(section => {
    if (!section.querySelector('img, video')) section.remove();
  });
}

// Videos can't play on paper. Each becomes its poster frame plus a live link
// to the page where it can be watched.
function flattenVideos(scope, courseId) {
  scope.querySelectorAll('video').forEach(video => {
    const fig = el('figure', 'print-video');
    const poster = POSTER_OVERRIDES[mediaSrc(video)] || video.getAttribute('poster');
    if (poster) fig.appendChild(img(poster));

    const target = `${SITE}/#${courseId}`;
    const link = el('a', 'print-video-link', `▶ Watch: ${target}`);
    link.href = `https://${target}`;
    const caption = el('figcaption');
    caption.appendChild(link);
    fig.appendChild(caption);

    video.replaceWith(fig);
  });
}

function flattenSlideshows(scope) {
  scope.querySelectorAll('[data-slideshow]').forEach(show => {
    const grid = el('div', 'print-slides');
    show.querySelectorAll('.slide').forEach(slide => {
      grid.appendChild(img(
        slide.getAttribute('src') || slide.getAttribute('data-src'),
        slide.getAttribute('alt')
      ));
    });
    show.replaceWith(grid);
  });
}

function rebuildFanzine(scope) {
  const gallery = scope.querySelector('.fanzine-gallery');
  if (!gallery) return;

  // The site's intro tells the reader to browse and download; on paper the
  // booklet is simply there.
  const intro = scope.querySelector('.fanzine-intro');
  if (intro) {
    intro.innerHTML = 'The collective outcome of the seminar was a printed fanzine, <em>HACKEN</em>, ' +
      'documenting the students&rsquo; tactical research, subversions, and experiments. It opens with ' +
      'the statement below; its pages follow in full.';
  }

  const statement = el('div', 'fanzine-statement');
  statement.appendChild(el('span', 'fanzine-statement-credit', FANZINE.statement.credit));
  FANZINE.statement.paragraphs.forEach(text => {
    const p = el('p');
    p.innerHTML = text;
    statement.appendChild(p);
  });
  gallery.before(statement);

  const pages = el('div', 'print-fanzine');

  FANZINE.spreads.forEach((src, i) => {
    const page = img(src, `HACKEN fanzine, spread ${i + 1}`);
    page.className = 'print-fanzine-spread';
    pages.appendChild(page);
  });

  gallery.replaceWith(pages);

  // Trailing the nine reproduced pages, the download button always landed
  // alone on a page of its own. It belongs with the intro that mentions it.
  const actions = scope.querySelector('.fanzine-actions');
  if (actions) pages.before(actions);
}

// Relative hrefs would otherwise bake in the throwaway localhost address the
// build server happened to be listening on.
function absolutiseLinks(scope) {
  scope.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (/^(https?:|mailto:|#)/.test(href)) return;
    a.setAttribute('href', `https://${SITE}/${href.replace(/^\.?\//, '')}`);
  });
}

// A link is useless on paper unless its destination is on the page. Reference
// lists are left alone: their titles already say where they go, and a column
// of raw URLs there swamps the entries themselves.
function exposeLinks(scope) {
  scope.querySelectorAll('a.project-link, a.repo-link, a.download-btn').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (!href.startsWith('http')) return;
    const short = tidyUrl(href);
    if (a.textContent.includes(short)) return;
    a.querySelectorAll('svg').forEach(s => s.remove());
    a.after(el('span', 'print-url', short));
  });
}

/* The record line under a course title: where, in what capacity, when. */
function recordLine(entry) {
  const line = el('div', 'entry-record');
  const inst = el('span', 'entry-inst');
  inst.innerHTML = entry.institution;
  line.appendChild(inst);
  line.appendChild(el('span', 'entry-role',
    [entry.role, entry.years].filter(Boolean).join(' · ')));
  return line;
}

/* Site metadata worth keeping: format, software, prerequisites, repository.
   Anything the record line already states is dropped. */
function buildMeta(article, id) {
  const meta = article.querySelector('.sidebar-meta');
  if (!meta) return null;

  const overrides = META_OVERRIDES[id] || {};
  const box = el('div', 'print-meta');
  meta.querySelectorAll('.meta-item').forEach(item => {
    const label = ((item.querySelector('.meta-label') || {}).textContent || '').trim();
    if (REDUNDANT_META.test(label)) return;
    const copy = item.cloneNode(true);
    if (label in overrides) {
      const value = copy.querySelector('.meta-value');
      if (value) value.textContent = overrides[label];
    }
    box.appendChild(copy);
  });

  const repo = meta.querySelector('.repo-link');
  if (repo) {
    const item = el('div', 'meta-item');
    item.appendChild(el('span', 'meta-label', 'Repository'));
    item.appendChild(el('span', 'meta-value', tidyUrl(repo.getAttribute('href'))));
    box.appendChild(item);
  }

  return box.children.length ? box : null;
}

const headingOf = section => {
  const h = section.querySelector('.section-title, h2');
  return h ? h.textContent.trim() : '';
};

/* Drop the sections written for enrolled students, condense the ones that run
   long on paper, and give every piece of student work a line saying what it
   is — none of which changes the site. */
function editSections(body, id) {
  const skip = SKIP_SECTIONS[id] || [];
  const rewrites = SECTION_REWRITES[id] || {};

  body.querySelectorAll('section').forEach(section => {
    const heading = headingOf(section);
    if (skip.includes(heading)) {
      section.remove();
      return;
    }
    if (!(heading in rewrites)) return;

    // Keep the heading, replace the student-facing body beneath it.
    const title = section.querySelector('.section-title, h2');
    section.replaceChildren(title);
    const p = el('p');
    p.innerHTML = rewrites[heading];
    section.appendChild(p);
  });

  const cut = SKIP_PROJECTS[id] || [];
  const notes = PROJECT_NOTES[id] || {};
  body.querySelectorAll('.project-block').forEach(block => {
    const title = block.querySelector('.project-title');
    if (title && cut.includes(title.textContent.trim())) {
      block.remove();
      return;
    }
    const note = title && notes[title.textContent.trim()];
    if (!note || block.querySelector('.project-desc')) return;
    const header = block.querySelector('.project-block-header');
    (header || block.firstElementChild).after(el('p', 'project-desc', note));
  });

  const captions = CAPTION_REWRITES[id] || {};
  body.querySelectorAll('.media-caption').forEach(caption => {
    const replacement = captions[caption.textContent.trim()];
    if (replacement) caption.textContent = replacement;
  });
}

/* Pull named projects out of a course page, for the entries that the site
   bundles together but that were separate appointments. */
function pickProjects(article, titles) {
  const wrap = el('div', 'student-work-section');
  titles.forEach(title => {
    const block = Array.from(article.querySelectorAll('.project-block')).find(b => {
      const heading = b.querySelector('.project-title');
      return heading && heading.textContent.trim() === title;
    });
    if (block) wrap.appendChild(block.cloneNode(true));
  });
  return wrap.children.length ? wrap : null;
}

function buildEntry(entry, article) {
  // Entries documented by a single project run on rather than each opening a
  // page they only half fill. The weight is set by how much evidence exists,
  // which is also the honest hierarchy.
  const sec = el('section', `entry entry-${entry.tier}${entry.weight === 'brief' ? ' entry-brief' : ''}`);
  const id = entry.source;

  const header = el('div', 'entry-header');
  const siteTitle = article.querySelector('.course-header-title');
  header.appendChild(el('h1', null, entry.title || (siteTitle ? siteTitle.textContent.trim() : entry.key)));
  if (entry.subtitle) header.appendChild(el('div', 'entry-subtitle', entry.subtitle));
  header.appendChild(recordLine(entry));
  sec.appendChild(header);

  const body = el('div', 'print-course-body');

  if (entry.projects) {
    // A partial entry: description written here, then the named projects.
    if (entry.description) body.appendChild(el('p', 'entry-description', entry.description));
    const picked = pickProjects(article, entry.projects);
    if (picked) {
      body.appendChild(el('h2', null, 'Student Work'));
      body.appendChild(picked);
    }
  } else {
    const meta = buildMeta(article, id);
    if (meta) sec.appendChild(meta);

    const desc = article.querySelector('.course-description');
    if (desc) {
      const p = el('p', 'entry-description');
      p.innerHTML = desc.innerHTML;
      body.appendChild(p);
    }

    if (SUMMARIES[id]) {
      body.appendChild(el('h2', null, 'Course Outline'));
      body.appendChild(el('p', 'print-outline-body', SUMMARIES[id]));
    }

    const main = article.querySelector('.course-main-content');
    let skippingSchedule = false;
    Array.from(main.children).forEach(child => {
      if (child.classList.contains('course-main-header')) return;
      if (child.classList.contains('course-description')) return;

      // The schedule is a bare <h2> followed by a sibling list, so the heading
      // arms a skip that the list itself then consumes.
      if (child.tagName === 'H2' && child.textContent.trim() === 'Schedule') {
        skippingSchedule = true;
        return;
      }
      if (skippingSchedule && child.classList.contains('schedule-list')) {
        skippingSchedule = false;
        return;
      }
      skippingSchedule = false;

      body.appendChild(child.cloneNode(true));
    });
  }

  editSections(body, id);
  dropSkippedMedia(body);
  rebuildFanzine(body);
  flattenVideos(body, id);
  flattenSlideshows(body);
  absolutiseLinks(body);
  exposeLinks(body);
  // Nothing scrolls in a print render, so a lazy image would never be asked
  // for and would hold the "all images settled" check open indefinitely.
  body.querySelectorAll('img[loading]').forEach(image => image.removeAttribute('loading'));

  sec.appendChild(body);
  return sec;
}

async function ready() {
  await document.fonts.ready;

  const settled = image => image.complete ? Promise.resolve() : new Promise(resolve => {
    image.addEventListener('load', resolve, { once: true });
    image.addEventListener('error', resolve, { once: true });
  });

  await Promise.race([
    Promise.all(Array.from(document.images).map(settled)),
    // A single unreachable asset should cost the build a blank frame, not a
    // hang. Anything still missing at this point simply prints empty.
    new Promise(resolve => setTimeout(resolve, 45000))
  ]);

  await new Promise(requestAnimationFrame);
}

async function build() {
  const res = await fetch('index.html', { cache: 'no-store' });
  const doc = new DOMParser().parseFromString(await res.text(), 'text/html');

  const all = wanted[0] === 'all';
  const entries = PORTFOLIO.filter(e => all || wanted.includes(e.source) || wanted.includes(e.key));

  if (!entries.length) {
    window.__printError = `No portfolio entries matched: ${wanted.join(', ')}`;
    window.__printReady = true;
    return;
  }

  const root = document.getElementById('print-root');
  root.appendChild(buildLetterhead());

  const main = el('main');

  // The record is the whole history; a single-course build is documentation
  // of one course and would be misleading with it attached.
  if (all) main.appendChild(buildRecord());

  let lastTier = null;
  entries.forEach(entry => {
    const article = doc.getElementById(entry.source);
    if (!article) return;
    if (entry.tier === 'workshop' && lastTier !== 'workshop') {
      main.appendChild(el('h1', 'tier-heading', 'Workshops'));
    }
    lastTier = entry.tier;
    main.appendChild(buildEntry(entry, article));
  });

  root.appendChild(main);

  document.title = entries.length === 1
    ? `Grayson Earle — ${entries[0].title || entries[0].key}`
    : 'Grayson Earle — Teaching Portfolio';

  await ready();
  window.__printReady = true;
}

build().catch(err => {
  window.__printError = String(err && err.stack || err);
  window.__printReady = true;
});
