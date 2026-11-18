(function () {
  'use strict';
  const CL = window.CL, H = CL.harness;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const dayKey = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return dayKey(d); };

  /* ---------------- languages & tracks ---------------- */
  const LANGS = {
    python: { name: 'Python', mode: 'python', run: true, indent: 4 },
    javascript: { name: 'JavaScript', mode: 'javascript', run: true, indent: 2 },
    typescript: { name: 'TypeScript', mode: 'text/typescript', run: true, indent: 2 },
    go: { name: 'Go', mode: 'text/x-go', run: false, indent: 4 },
    rust: { name: 'Rust', mode: 'rust', run: false, indent: 4 },
    java: { name: 'Java', mode: 'text/x-java', run: false, indent: 4 },
    csharp: { name: 'C#', mode: 'text/x-csharp', run: false, indent: 4 },
    cpp: { name: 'C++', mode: 'text/x-c++src', run: false, indent: 4 },
    sql: { name: 'SQL', mode: 'text/x-sqlite', run: true, indent: 2 },
    react: { name: 'React', mode: 'text/jsx', run: true, indent: 2 },
  };
  const ALGO_LANGS = ['python', 'javascript', 'typescript', 'java', 'csharp', 'cpp', 'go', 'rust'];
  const SHORT = { python: 'PY', javascript: 'JS', typescript: 'TS', java: 'JV', csharp: 'C#', cpp: 'C++', go: 'GO', rust: 'RS' };
  const RUNNERS = {
    java: [{ label: 'OneCompiler: Java', url: 'https://onecompiler.com/java' }, { label: 'OnlineGDB: Java', url: 'https://www.onlinegdb.com/online_java_compiler' }],
    csharp: [{ label: '.NET Fiddle', url: 'https://dotnetfiddle.net/' }, { label: 'OneCompiler: C#', url: 'https://onecompiler.com/csharp' }],
    cpp: [{ label: 'Compiler Explorer', url: 'https://godbolt.org/' }, { label: 'OneCompiler: C++', url: 'https://onecompiler.com/cpp' }],
    go: [{ label: 'Go Playground', url: 'https://go.dev/play/' }, { label: 'OneCompiler: Go', url: 'https://onecompiler.com/go' }],
    rust: [{ label: 'Rust Playground', url: 'https://play.rust-lang.org/' }, { label: 'OneCompiler: Rust', url: 'https://onecompiler.com/rust' }],
  };
  const LOCAL_RUN = {
    java: { cmd: 'javac Main.java && java Main', note: 'Save as Main.java', doc: 'https://dev.java/learn/getting-started/' },
    csharp: { cmd: 'dotnet new console -o Practice && cd Practice   # paste into Program.cs\ndotnet run', note: 'Paste into Program.cs', doc: 'https://learn.microsoft.com/en-us/dotnet/core/tutorials/with-visual-studio-code' },
    cpp: { cmd: 'g++ -std=c++20 -Wall main.cpp -o main && ./main', note: 'Save as main.cpp', doc: 'https://gcc.gnu.org/onlinedocs/gcc/Invoking-GCC.html' },
    go: { cmd: 'go run main.go', note: 'Save as main.go', doc: 'https://go.dev/doc/tutorial/getting-started' },
    rust: { cmd: 'rustc main.rs && ./main\n# or: cargo new practice && cd practice  (paste into src/main.rs)  && cargo run', note: 'Save as main.rs', doc: 'https://doc.rust-lang.org/book/ch01-02-hello-world.html' },
  };
  const TRACKS = [
    { id: 'algo', name: 'Algorithms & Theory', short: 'λ', color: '#6b4fbb', kind: 'algo', lessons: CL.algoLessons,
      blurb: 'Big-O, core data structures and the patterns behind classic problems. Every challenge can be solved in all eight languages.' },
    { id: 'python', name: 'Python', short: 'PY', color: '#2f6db3', kind: 'lang', lang: 'python', lessons: CL.langLessons.python, blurb: 'Readable, batteries-included scripting. Runs right here in your browser.' },
    { id: 'javascript', name: 'JavaScript', short: 'JS', color: '#a87f00', kind: 'lang', lang: 'javascript', lessons: CL.langLessons.javascript, blurb: 'The language of the web, from closures to async/await. Runs in your browser.' },
    { id: 'typescript', name: 'TypeScript', short: 'TS', color: '#235a97', kind: 'lang', lang: 'typescript', lessons: CL.langLessons.typescript, blurb: 'JavaScript with a type system. Type-checked in strict mode and run right here in your browser.' },
    { id: 'java', name: 'Java', short: 'JV', color: '#b4572b', kind: 'lang', lang: 'java', lessons: CL.langLessons.java, blurb: 'Strongly typed, object-oriented and everywhere in enterprise systems.' },
    { id: 'csharp', name: 'C#', short: 'C#', color: '#1f8a4c', kind: 'lang', lang: 'csharp', lessons: CL.langLessons.csharp, blurb: 'Modern .NET: records, pattern matching and LINQ.' },
    { id: 'cpp', name: 'C++', short: 'C++', color: '#c0396b', kind: 'lang', lang: 'cpp', lessons: CL.langLessons.cpp, blurb: 'Close to the metal: references, the STL and RAII.' },
    { id: 'go', name: 'Go', short: 'GO', color: '#007d9c', kind: 'lang', lang: 'go', lessons: CL.langLessons.go, blurb: 'Simple, fast and built for servers: slices, errors as values, interfaces and goroutines.' },
    { id: 'rust', name: 'Rust', short: 'RS', color: '#8a3f1d', kind: 'lang', lang: 'rust', lessons: CL.langLessons.rust, blurb: 'Memory safety without a garbage collector: ownership, borrowing, enums and Result.' },
    { id: 'sql', name: 'SQL', short: 'SQL', color: '#8a5a00', kind: 'sql', lang: 'sql', lessons: CL.sqlLessons, blurb: 'Query a real SQLite database in your browser, from SELECT to window functions.' },
    { id: 'react', name: 'React', short: '⚛', color: '#1488b8', kind: 'react', lang: 'react', lessons: CL.reactLessons, blurb: 'Components, state and effects, rendered live with automatic checks.' },
  ];
  const LESSON = {}, TRACK_OF = {}, CH = {};
  TRACKS.forEach((t) => t.lessons.forEach((l, i) => { LESSON[l.id] = l; TRACK_OF[l.id] = t; l._i = i; }));
  CL.challenges.forEach((c) => (CH[c.id] = c));
  const SANDBOX = {
    'algo-bigo': `# Count operations to SEE growth rates. Run it, then try bigger n values.
def logarithmic(n):
    ops = 0
    while n > 1:
        n //= 2
        ops += 1
    return ops

def linear(n):
    ops = 0
    for i in range(n):
        ops += 1
    return ops

def quadratic(n):
    ops = 0
    for i in range(n):
        for j in range(n):
            ops += 1
    return ops

for n in [10, 100, 1000]:
    print(f"n={n:>5}   log n: {logarithmic(n):>3}   n: {linear(n):>5}   n²: {quadratic(n):>8}")
`,
  };
  const TIPS = [
    ['Retrieval beats re-reading', 'Answer the quiz before you look back at the lesson. Struggling to recall is what makes memory stick.'],
    ['Explain it like you are teaching', 'Write your reflection as if a friend asked "what is this and when do I use it?" Gaps in your explanation show you what to review.'],
    ['Space it out', 'Ten minutes of review on three different days beats thirty minutes once. Check the Review queue daily.'],
    ['Same problem, new language', 'Solving a challenge you already know in a second language isolates the syntax, so you learn the language faster.'],
    ['Hints before solutions', 'Use one hint, then try again. Reveal the solution only after a real attempt, then retype it from memory tomorrow.'],
    ['Read the docs link', 'Every lesson and every dotted-underlined symbol in the editor links to official documentation. Reading docs is a core skill.'],
    ['Predict, then run', 'Before pressing Run, say out loud what you expect to see. Mismatches are where learning happens.'],
  ];

  /* ---------------- state & persistence ---------------- */
  // Accounts: Supabase when config.js provides a project (Netlify build); otherwise the Claude artifact store or this browser.
  const CFG = window.CODELAB_CONFIG || {};
  const SB = CFG.supabaseUrl && CFG.supabaseKey && window.supabase && window.supabase.createClient
    ? window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseKey, { auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })
    : null;
  const GUEST_KEY = 'codelab.v1';
  let KEY = GUEST_KEY;
  let session = null, profile = null;
  const isGuest = () => { try { return localStorage.getItem('codelab.guest') === '1'; } catch (e) { return false; } };
  const setGuest = (on) => { try { on ? localStorage.setItem('codelab.guest', '1') : localStorage.removeItem('codelab.guest'); } catch (e) {} };
  const defaultState = () => ({ v: 1, xp: 0, days: {}, awarded: {}, lessons: {}, review: {}, play: {}, settings: { algoLang: 'python', theme: 'auto', goal: 50, level: 'simple' }, last: null, updatedAt: 0 });
  const normalize = (o) => { const x = Object.assign(defaultState(), o || {}); x.settings = Object.assign(defaultState().settings, x.settings || {}); return x; };
  function readLocal(key) { try { const raw = localStorage.getItem(key); if (raw) return normalize(JSON.parse(raw)); } catch (e) {} return null; }
  let S = readLocal(KEY) || defaultState();
  const LS = (id) => S.lessons[id] || (S.lessons[id] = { code: {}, quiz: {}, passed: false, solved: {}, hints: 0, attempts: 0, sawSolution: false, note: '', cx: null });

  let saveTimer = null, retryTimer = null, dbRef = null, writing = false, pendingWrite = false, syncMode = SB ? 'local' : 'local';
  function save(now) {
    S.updatedAt = Date.now();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(flush, now ? 0 : 1200);
  }
  async function flush() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
    if (writing) { pendingWrite = true; return; }
    if (SB && session) {
      writing = true;
      try {
        const { error } = await SB.from('progress').upsert({ user_id: session.user.id, state: clone(S), updated_at: new Date().toISOString() });
        if (error) throw error;
        setSync('cloud');
      } catch (e) {
        setSync('error');
        clearTimeout(retryTimer); retryTimer = setTimeout(flush, 15000);
      }
      writing = false;
    } else if (dbRef) {
      writing = true;
      try { await dbRef.set(clone(S)); setSync('account'); }
      catch (e) { if (e && (e.code === 'invalid_argument' || e.code === 'revoked' || e.code === 'not_granted')) { dbRef = null; setSync('local'); } }
      writing = false;
    }
    if (pendingWrite) { pendingWrite = false; flush(); }
  }
  const SYNC_TEXT = { cloud: 'Saved to your account', account: 'Progress saved to your account', error: 'Not saved yet. Retrying…', local: 'Saved on this device only' };
  function setSync(mode) {
    syncMode = mode;
    const el = $('#syncState');
    if (el) { el.className = 'sync' + (mode === 'cloud' || mode === 'account' ? ' ok' : mode === 'error' ? ' err' : ''); el.lastChild.textContent = ' ' + SYNC_TEXT[mode]; }
  }
  async function initDb() {
    try {
      if (!window.claude || typeof window.claude.use !== 'function') return;
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      if (!db || !user) return;
      const id = await user.id();
      if (!id) return;
      const ref = db.doc('data/users/' + id + '/progress');
      const snap = await Promise.race([ref.get(), sleep(10000).then(() => null)]);
      if (!snap) return;
      dbRef = ref;
      if (snap.exists) {
        const remote = snap.data();
        if ((remote.updatedAt || 0) > (S.updatedAt || 0)) {
          S = normalize(clone(remote));
          try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
          applyTheme(); render();
        } else if ((S.updatedAt || 0) > (remote.updatedAt || 0)) flush();
      } else if (S.updatedAt) flush();
      setSync('account');
    } catch (e) { /* stay local */ }
  }

  // ----- Supabase account lifecycle
  let startPromise = null;
  function ensureAccount(sess) {
    if (session && session.user.id === sess.user.id) { session = sess; return startPromise || Promise.resolve(); }
    return (startPromise = startAccount(sess));
  }
  async function startAccount(sess) {
    session = sess;
    const uid = sess.user.id;
    KEY = 'codelab.v1.u.' + uid;              // each student gets their own local cache on shared computers
    const local = readLocal(KEY);
    const [p, r] = await Promise.all([
      SB.from('profiles').select('display_name, reading_level').eq('id', uid).maybeSingle(),
      SB.from('progress').select('state, updated_at').eq('user_id', uid).maybeSingle(),
    ]);
    profile = p.data || { display_name: (sess.user.user_metadata || {}).display_name || 'Learner', reading_level: 'simple' };
    const cloud = r.data && r.data.state && r.data.state.v ? normalize(r.data.state) : null;
    let next = cloud, push = false, imported = false;
    if (local && (!cloud || (local.updatedAt || 0) > (cloud.updatedAt || 0))) { next = local; push = true; }
    if (!next) {
      const guest = readLocal(GUEST_KEY);
      if (guest && guest.updatedAt && isGuest()) { next = guest; imported = true; push = true; }
    }
    if (!next) { next = defaultState(); next.settings.level = profile.reading_level; push = true; }
    S = next;
    setGuest(false);
    if (imported) { try { localStorage.removeItem(GUEST_KEY); } catch (e) {} setTimeout(() => toast('Your progress from this device is now saved to your account'), 400); }
    setSync('cloud');
    if (push) save(true);
  }
  function endAccount() {
    clearTimeout(saveTimer);
    try { localStorage.removeItem(KEY); } catch (e) {}  // don't leave a student's notes/code on a shared computer
    session = null; profile = null; startPromise = null;
    KEY = GUEST_KEY;
    S = readLocal(GUEST_KEY) || defaultState();
    setSync('local');
  }
  function cleanAuthUrl() {
    const q = new URLSearchParams(location.search);
    const err = q.get('error_description');
    if (q.has('code') || q.has('error') || err) {
      history.replaceState(null, '', location.pathname + location.hash);
      if (err) setTimeout(() => toast(esc(err.replace(/\+/g, ' '))), 300);
    }
  }
  async function signOut() {
    try { await flush(); } catch (e) {}
    try { await SB.auth.signOut({ scope: 'local' }); } catch (e) {}
    endAccount();
    location.hash = 'welcome';
    render();
  }

  /* ---------------- XP, streaks, review ---------------- */
  function award(key, amount, msg) {
    if (S.awarded[key]) return false;
    S.awarded[key] = Date.now();
    S.xp += amount;
    const d = dayKey();
    S.days[d] = (S.days[d] || 0) + amount;
    toast(`<b>+${amount} XP</b> ${esc(msg)}`);
    save(); renderSide();
    return true;
  }
  function streak() {
    let n = 0; const d = new Date();
    if (!S.days[dayKey(d)]) d.setDate(d.getDate() - 1);
    while (S.days[dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  const BOX_DAYS = [0, 1, 3, 7, 14, 30];
  function scheduleCard(qid, correct) {
    const c = S.review[qid] || { box: 0 };
    c.box = correct ? Math.min(c.box + 1, BOX_DAYS.length - 1) : 0;
    c.due = addDays(correct ? BOX_DAYS[c.box] : 0);
    c.seen = (c.seen || 0) + 1;
    S.review[qid] = c;
  }
  function dueCards() {
    const t = dayKey();
    return Object.entries(S.review).filter(([qid, c]) => c.due <= t && cardQuestion(qid)).map(([qid]) => qid);
  }
  function cardQuestion(qid) {
    const [lid, i] = qid.split(':');
    const l = LESSON[lid];
    return l && l.quiz && l.quiz[+i] ? { lesson: l, q: l.quiz[+i] } : null;
  }

  /* ---------------- status helpers ---------------- */
  const hasPractice = (l) => !!(l.challenge || l.exercise);
  function lessonStatus(l) {
    const st = S.lessons[l.id];
    if (!st) return 'new';
    const quizDone = (l.quiz || []).every((_, i) => st.quiz[i] != null);
    if (quizDone && (!hasPractice(l) || st.passed)) return 'done';
    return Object.keys(st.quiz).length || st.attempts || st.passed || Object.keys(st.code).length ? 'started' : 'new';
  }
  const trackPct = (t) => Math.round((100 * t.lessons.filter((l) => lessonStatus(l) === 'done').length) / t.lessons.length);
  const nextInTrack = (t) => t.lessons.find((l) => lessonStatus(l) !== 'done');

  /* ---------------- UI helpers ---------------- */
  function toast(html) {
    const el = document.createElement('div');
    el.className = 'toast'; el.innerHTML = html;
    const box = $('#toasts');
    while (box.children.length >= 3) box.firstChild.remove();
    box.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
  function modal(title, bodyHtml, actions) {
    return new Promise((resolve) => {
      const bg = document.createElement('div');
      bg.className = 'modal-bg';
      bg.innerHTML = `<div class="card modal" role="dialog" aria-modal="true" aria-label="${esc(title)}"><h2>${esc(title)}</h2><div>${bodyHtml}</div><div class="row" style="margin-top:16px;justify-content:flex-end">${actions.map((a, i) => `<button class="btn ${a.primary ? 'primary' : ''}" data-i="${i}">${esc(a.label)}</button>`).join('')}</div></div>`;
      const done = (v) => { modal.lastText = bg.querySelector('textarea, input')?.value ?? ''; bg.remove(); resolve(v); };
      bg.addEventListener('click', (e) => { if (e.target === bg) done(null); const b = e.target.closest('[data-i]'); if (b) done(actions[+b.dataset.i].value); });
      document.addEventListener('keydown', function k(e) { if (e.key === 'Escape') { document.removeEventListener('keydown', k); done(null); } });
      document.body.appendChild(bg);
      bg.querySelector('.btn.primary, .btn')?.focus();
    });
  }
  async function copyText(text, what) {
    try { await navigator.clipboard.writeText(text); toast('Copied ' + esc(what || 'to clipboard')); return true; }
    catch (e) {
      await modal('Copy manually', `<p class="small muted">Your browser blocked clipboard access. Select all (Ctrl/⌘+A) and copy:</p><textarea class="reflect" style="min-height:220px;font-family:var(--mono);font-size:.8rem" readonly>${esc(text)}</textarea>`, [{ label: 'Done', value: 1, primary: true }]);
      return false;
    }
  }
  function loadScript(src) {
    return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('Could not load ' + src)); document.head.appendChild(s); });
  }
  const docLinks = (docs) => `<div class="doclinks">${docs.map((d) => `<a class="doclink" href="${esc(d.url)}" target="_blank" rel="noopener">${esc(d.label)}</a>`).join('')}</div>`;
  function applyTheme() {
    const t = S.settings.theme;
    const dark = t === 'dark' || (t === 'auto' && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }

  /* ---------------- runtimes ---------------- */
  // JavaScript runs in a throwaway Web Worker built from a blob, so infinite loops can be stopped and nothing touches the page.
  function runJS(code, opts = {}) {
    return new Promise((resolve) => {
      const out = [];
      const prelude = "Object.defineProperty(self,'console',{configurable:true,writable:true,value:(()=>{const f=a=>{if(typeof a==='string')return a;if(a instanceof Error)return a.name+': '+a.message;try{const s=JSON.stringify(a);return s===undefined?String(a):s}catch(e){return String(a)}};const L=(...a)=>postMessage({t:'log',s:a.map(f).join(' ')});return{log:L,info:L,warn:L,debug:L,error:(...a)=>postMessage({t:'err',s:a.map(f).join(' ')}),table:L}})()});self.addEventListener('unhandledrejection',e=>postMessage({t:'err',s:'Unhandled promise rejection: '+(e.reason&&e.reason.message||e.reason)}));\n";
      const wait = /setTimeout|setInterval|Promise|async|await|then\(/.test(code) ? 1200 : 0;
      const fname = opts.fname;
      const epilogue = `\n;(async()=>{const __T=${opts.tests ? JSON.stringify(opts.tests) : 'null'};` +
        (fname ? `const __fn=(typeof ${fname}!=='undefined')?${fname}:undefined;` : 'const __fn=undefined;') +
        `if(__T){if(typeof __fn!=='function'){postMessage({t:'nofn'})}else{const res=[];for(const t of __T){try{const r=await __fn(...JSON.parse(JSON.stringify(t.args)));res.push({got:r===undefined?null:r,undef:r===undefined})}catch(e){res.push({error:(e&&e.name?e.name+': ':'')+(e&&e.message||e)})}}postMessage({t:'tests',res})}}` +
        `await new Promise(r=>setTimeout(r,${wait}));postMessage({t:'done'})})();`;
      const url = URL.createObjectURL(new Blob([prelude + code + epilogue], { type: 'text/javascript' }));
      let w;
      try { w = new Worker(url); } catch (e) { resolve({ out: '', error: 'Could not start the JavaScript sandbox: ' + e.message }); return; }
      let results = null, finished = false;
      const end = (extra) => { if (finished) return; finished = true; w.terminate(); URL.revokeObjectURL(url); resolve(Object.assign({ out: out.join('\n'), results }, extra)); };
      const timer = setTimeout(() => end({ error: 'Stopped after 5 seconds. Is there an infinite loop?' }), 5000 + wait);
      w.onmessage = (e) => {
        const m = e.data;
        if (m.t === 'log') out.push(m.s);
        else if (m.t === 'err') out.push('⚠ ' + m.s);
        else if (m.t === 'tests') results = m.res;
        else if (m.t === 'nofn') { clearTimeout(timer); end({ error: `Function "${fname}" was not found. Keep the function name from the starter code.` }); }
        else if (m.t === 'done') { clearTimeout(timer); end(); }
      };
      w.onerror = (e) => { e.preventDefault(); clearTimeout(timer); end({ error: e.message + (e.lineno ? ` (line ${e.lineno - 1})` : '') }); };
    });
  }

  const PYODIDE = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
  let pyReady = null;
  function loadPy(status) {
    if (!pyReady) {
      status && status('Loading the Python runtime (one-time download, about 10 MB)…');
      pyReady = loadScript(PYODIDE + 'pyodide.js').then(() => window.loadPyodide({ indexURL: PYODIDE }));
      pyReady.catch(() => { pyReady = null; });
    }
    return pyReady;
  }
  function cleanPyError(msg) {
    const lines = String(msg).split('\n');
    const i = lines.findIndex((l) => l.includes('File "<exec>"'));
    return (i >= 0 ? lines.slice(i) : lines.slice(-4)).join('\n').trim();
  }
  async function runPy(code, opts = {}, status) {
    let py;
    try { py = await loadPy(status); } catch (e) { return { out: '', error: 'Could not load Python: ' + e.message }; }
    const out = [];
    py.setStdout({ batched: (s) => out.push(s) });
    py.setStderr({ batched: (s) => out.push('⚠ ' + s) });
    const g = py.globals.get('dict')();
    try {
      await py.runPythonAsync(code, { globals: g });
      let results = null;
      if (opts.tests) {
        g.set('__tests_json', JSON.stringify(opts.tests));
        await py.runPythonAsync(
          `import json as __j\nif '${opts.fname}' not in globals():\n    __out_json = 'NOFN'\nelse:\n    __res = []\n    for __t in __j.loads(__tests_json):\n        try:\n            __r = ${opts.fname}(*__t['args'])\n            __res.append({'got': __j.loads(__j.dumps(__r)), 'undef': __r is None})\n        except Exception as __e:\n            __res.append({'error': type(__e).__name__ + ': ' + str(__e)})\n    __out_json = __j.dumps(__res)\n`,
          { globals: g });
        const j = g.get('__out_json');
        if (j === 'NOFN') return { out: out.join('\n'), error: `Function "${opts.fname}" was not found. Keep the function name from the starter code.` };
        results = JSON.parse(j);
      }
      return { out: out.join('\n'), results };
    } catch (e) {
      return { out: out.join('\n'), error: cleanPyError(e.message) };
    } finally { try { g.destroy(); } catch (e) {} }
  }

  // TypeScript: the real compiler (5.9) and its standard library types, from Monaco's ESM build on jsDelivr.
  const TS_BASE = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.57.0/esm/vs/languages/features/typescript/lib/';
  let tsReady = null;
  function loadTS(status) {
    if (!tsReady) {
      status && status('Loading the TypeScript compiler (one-time download)…');
      tsReady = Promise.all([import(TS_BASE + 'typescriptServices.js'), import(TS_BASE + 'lib.js')])
        .then(([svc, lib]) => ({ ts: svc.typescript, libs: lib.libFileMap, cache: {} }));
      tsReady.catch(() => { tsReady = null; });
    }
    return tsReady;
  }
  function tsCheck(T, code) {
    const ts = T.ts, MAIN = '/main.ts';
    const base = (f) => f.replace(/^.*\//, '');
    const opts = { strict: true, noEmit: true, skipLibCheck: true, types: [], target: ts.ScriptTarget.ES2022, lib: ['lib.es2022.d.ts', 'lib.dom.d.ts'], moduleDetection: ts.ModuleDetectionKind.Force };
    const host = {
      getSourceFile: (f, lv) => {
        if (f === MAIN) return ts.createSourceFile(f, code, lv, true);
        const b = base(f), txt = T.libs[b];
        if (txt == null) return undefined;
        return T.cache[b] || (T.cache[b] = ts.createSourceFile(f, txt, lv, true));
      },
      getDefaultLibFileName: () => '/lib.d.ts', writeFile() {}, getCurrentDirectory: () => '/', getCanonicalFileName: (f) => f,
      useCaseSensitiveFileNames: () => true, getNewLine: () => '\n', fileExists: (f) => f === MAIN || base(f) in T.libs,
      readFile: (f) => (f === MAIN ? code : T.libs[base(f)]), directoryExists: () => true, getDirectories: () => [],
    };
    const prog = ts.createProgram([MAIN], opts, host);
    const diags = [...prog.getSyntacticDiagnostics(), ...prog.getSemanticDiagnostics(), ...prog.getGlobalDiagnostics()].filter((d) => !d.file || d.file.fileName === MAIN);
    return diags.map((d) => {
      const msg = ts.flattenDiagnosticMessageText(d.messageText, '\n');
      if (d.file && d.start != null) { const p = d.file.getLineAndCharacterOfPosition(d.start); return { line: p.line + 1, col: p.character + 1, msg, code: d.code }; }
      return { msg, code: d.code };
    });
  }
  async function runTS(code, opts, status) {
    let T;
    try { T = await loadTS(status); } catch (e) { return { out: '', error: 'Could not load the TypeScript compiler: ' + e.message, typeErrors: [] }; }
    let typeErrors = [];
    try { typeErrors = tsCheck(T, code); } catch (e) { console.warn('type check failed', e); }
    const js = T.ts.transpileModule(code, { compilerOptions: { target: T.ts.ScriptTarget.ES2022, module: T.ts.ModuleKind.ESNext }, reportDiagnostics: false })
      .outputText.replace(/^export \{\};?[ \t]*$/gm, '');
    const r = await runJS(js, opts);
    r.typeErrors = typeErrors;
    return r;
  }
  function typeErrorHtml(list) {
    if (!list || !list.length) return '';
    return `<div class="fail" style="font-weight:700">✗ ${list.length} type error${list.length > 1 ? 's' : ''} (tsc --strict)</div>` +
      list.map((e) => `<span class="fail">${e.line ? 'line ' + e.line + ': ' : ''}</span>${esc(e.msg)}  <span class="info">TS${e.code}</span>`).join('\n') + '\n\n';
  }

  let sqlReady = null;
  function loadSql() {
    if (!sqlReady) { sqlReady = loadScript('https://cdn.jsdelivr.net/npm/sql.js@1.16.0/dist/sql-wasm-inline.js').then(() => window.initSqlJs()); sqlReady.catch(() => { sqlReady = null; }); }
    return sqlReady;
  }
  async function runSQL(query) {
    let SQL;
    try { SQL = await loadSql(); } catch (e) { return { error: 'Could not load the SQL engine: ' + e.message }; }
    const db = new SQL.Database();
    try { db.exec(CL.sqlSchema); const res = db.exec(query); return { res }; }
    catch (e) { return { error: e.message }; }
    finally { db.close(); }
  }

  let reactReady = null;
  function loadReact(status) {
    if (!reactReady) {
      status && status('Loading React and the JSX compiler…');
      reactReady = loadScript('https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js')
        .then(() => loadScript('https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js'))
        .then(() => loadScript('https://cdn.jsdelivr.net/npm/@babel/standalone@7/babel.min.js'));
      reactReady.catch(() => { reactReady = null; });
    }
    return reactReady;
  }
  function compileReact(code) {
    let src = code
      .replace(/^\s*import\s+(?:React\s*,?\s*)?(?:\{([^}]*)\})?\s*from\s*['"]react(?:-dom(?:\/client)?)?['"];?[ \t]*$/gm, (m, named) => (named ? `const {${named}} = React;` : ''))
      .replace(/^\s*export\s+default\s+(?=function|class)/gm, '')
      .replace(/^\s*export\s+default\s+\w+;?\s*$/gm, '')
      .replace(/^\s*export\s+/gm, '');
    return window.Babel.transform(src, { presets: [['react', { runtime: 'classic' }]], filename: 'App.jsx' }).code;
  }
  function evalApp(compiled) {
    const id = '__cl' + Math.random().toString(36).slice(2);
    const box = (window[id] = {});
    const prev = window.onerror;
    window.onerror = (msg) => { box.error = new Error(String(msg)); return true; };
    const s = document.createElement('script');
    s.textContent = `(function(){window['${id}'].ran=true;try{${compiled}\n;window['${id}'].App=(typeof App!=='undefined')?App:null;}catch(e){window['${id}'].error=e;}})();`;
    document.head.appendChild(s); s.remove();
    window.onerror = prev;
    delete window[id];
    if (!box.ran) {
      try { box.App = new Function(compiled + '\n;return (typeof App!=="undefined")?App:null;')(); } catch (e) { box.error = e; }
    }
    return box;
  }
  let ErrorBoundary = null;
  function makeBoundary(onErr) {
    const R = window.React;
    if (!ErrorBoundary) {
      ErrorBoundary = class extends R.Component {
        constructor(p) { super(p); this.state = { err: null }; }
        static getDerivedStateFromError(err) { return { err }; }
        componentDidCatch(err) { this.props.onErr && this.props.onErr(err); }
        render() { return this.state.err ? R.createElement('pre', { style: { color: '#b42318', whiteSpace: 'pre-wrap', margin: 0 } }, 'Render error: ' + (this.state.err.message || this.state.err)) : this.props.children; }
      };
    }
    return ErrorBoundary;
  }
  function mountReact(el, App, onErr) {
    const R = window.React, RD = window.ReactDOM;
    const EB = makeBoundary();
    const root = RD.createRoot(el);
    RD.flushSync(() => root.render(R.createElement(EB, { onErr }, R.createElement(App))));
    return root;
  }
  const testHelpers = {
    sleep,
    click: async (el) => { el.click(); await sleep(40); },
    type: async (el, text) => {
      const setter = Object.getOwnPropertyDescriptor(el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype, 'value').set;
      let v = '';
      for (const ch of text) { v += ch; setter.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })); await sleep(15); }
      await sleep(40);
    },
  };

  /* ---------------- Docs Lens ---------------- */
  const matcherCache = {};
  function docsMatcher(lang) {
    if (matcherCache[lang]) return matcherCache[lang];
    const map = CL.docsMap[lang] || {};
    const keys = Object.keys(map).sort((a, b) => b.length - a.length);
    const alt = keys.map((k) => {
      let e = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (lang === 'sql') e = e.replace(/ /g, '\\s+');
      if (/\w$/.test(k)) e += '(?!\\w)';
      return e;
    }).join('|');
    const flags = lang === 'sql' ? 'i' : '';
    const norm = (t) => (lang === 'sql' ? t.toUpperCase().replace(/\s+/g, ' ') : t);
    const lookup = {};
    keys.forEach((k) => (lookup[norm(k)] = { key: k, url: map[k] }));
    return (matcherCache[lang] = { sticky: new RegExp('(?:' + alt + ')', flags + 'y'), global: new RegExp('(?:' + alt + ')', flags + 'g'), norm, lookup });
  }
  function docsOverlay(lang) {
    const M = docsMatcher(lang);
    return {
      token(stream) {
        const s = stream.string, p = stream.pos;
        if (p > 0 && /\w/.test(s[p - 1]) && /\w/.test(s[p])) { stream.eatWhile(/\w/); return null; }
        M.sticky.lastIndex = p;
        const m = M.sticky.exec(s);
        if (m && m[0].length) { stream.pos = p + m[0].length; return 'doclink'; }
        stream.next();
        return null;
      },
    };
  }
  function findSymbols(lang, code) {
    const M = docsMatcher(lang);
    const seen = new Map();
    M.global.lastIndex = 0;
    let m;
    while ((m = M.global.exec(code))) {
      if (!m[0].length) { M.global.lastIndex++; continue; }
      const prev = code[m.index - 1];
      if (prev && /\w/.test(prev) && /\w/.test(m[0][0])) continue;
      const hit = M.lookup[M.norm(m[0])];
      if (hit && !seen.has(hit.key)) seen.set(hit.key, hit);
    }
    return [...seen.values()];
  }
  function symbolAt(lang, line, ch) {
    const M = docsMatcher(lang);
    M.global.lastIndex = 0;
    let m;
    while ((m = M.global.exec(line))) {
      if (!m[0].length) { M.global.lastIndex++; continue; }
      if (m.index <= ch && ch <= m.index + m[0].length) {
        const prev = line[m.index - 1];
        if (prev && /\w/.test(prev) && /\w/.test(m[0][0])) continue;
        return M.lookup[M.norm(m[0])];
      }
      if (m.index > ch) break;
    }
    return null;
  }

  /* ---------------- Workbench (editor + runner) ---------------- */
  let activeReactRoot = null;
  function disposeReact() { if (activeReactRoot) { try { activeReactRoot.unmount(); } catch (e) {} activeReactRoot = null; } }

  function workbench(host, cfg) {
    // cfg: { kind: algo|lang|sql|react|free, langs:[], lang, initial(lang), onCode(lang, code), onResult(passed, lang), ch, ex, tall }
    let lang = cfg.lang;
    const showTabs = cfg.langs.length > 1;
    host.innerHTML = `
      <div class="wb ${cfg.tall ? 'tall' : ''}">
        <div class="wb-top">
          ${showTabs ? `<div class="tabs" role="tablist">${cfg.langs.map((l) => `<button role="tab" data-lang="${l}">${esc(LANGS[l].name)}<span class="ok"></span></button>`).join('')}</div>` : `<span class="pill acc">${esc(LANGS[lang].name)}</span>`}
          <span class="spacer"></span>
          <button class="btn ghost sm" data-act="reset" title="Restore the starter code">↺ Reset</button>
          <button class="btn ghost sm" data-act="copy" title="Copy the editor contents">⧉ Copy</button>
        </div>
        <div class="ed"></div>
        <div class="wb-actions"></div>
        <div class="banner" hidden></div>
        <div class="out" hidden></div>
        <div class="preview" hidden></div>
        <div class="runbox" hidden></div>
        <div class="schema" hidden></div>
        <div class="lens">
          <div class="lens-head"><b>📘 Docs Lens</b><span class="tiny muted">Dotted-underlined code links to the official docs. Click a symbol or move your cursor onto it.</span></div>
          <div class="lens-focus"></div>
          <div class="lens-list"></div>
        </div>
      </div>`;
    const wb = $('.wb', host);
    const els = { ed: $('.ed', wb), actions: $('.wb-actions', wb), banner: $('.banner', wb), out: $('.out', wb), preview: $('.preview', wb), runbox: $('.runbox', wb), schema: $('.schema', wb), lensList: $('.lens-list', wb), lensFocus: $('.lens-focus', wb) };
    const cm = CodeMirror(els.ed, {
      value: cfg.initial(lang), mode: LANGS[lang].mode, theme: 'lab', lineNumbers: true, indentUnit: LANGS[lang].indent, tabSize: LANGS[lang].indent,
      matchBrackets: true, autoCloseBrackets: true, styleActiveLine: true, lineWrapping: false, viewportMargin: 50,
      extraKeys: {
        'Ctrl-Enter': () => primary(), 'Cmd-Enter': () => primary(), 'Ctrl-/': 'toggleComment', 'Cmd-/': 'toggleComment',
        Tab: (c) => (c.somethingSelected() ? c.indentSelection('add') : c.replaceSelection(' '.repeat(c.getOption('indentUnit')), 'end')),
        'Shift-Tab': (c) => c.indentSelection('subtract'),
      },
    });
    let overlay = docsOverlay(lang);
    cm.addOverlay(overlay);
    setTimeout(() => cm.refresh(), 30);

    let codeTimer = null;
    cm.on('change', () => {
      clearTimeout(codeTimer);
      codeTimer = setTimeout(() => { cfg.onCode && cfg.onCode(lang, cm.getValue()); updateLens(); }, 400);
    });
    cm.on('cursorActivity', () => {
      const c = cm.getCursor();
      const hit = symbolAt(lang, cm.getLine(c.line), c.ch);
      focusDoc(hit);
    });
    cm.getWrapperElement().addEventListener('mousedown', (e) => {
      const t = e.target.closest('.cm-doclink');
      if (!t) return;
      const M = docsMatcher(lang);
      const hit = M.lookup[M.norm(t.textContent)];
      if (hit) setTimeout(() => focusDoc(hit), 0);
    });
    function focusDoc(hit) {
      if (!hit) { els.lensFocus.classList.remove('show'); $$('a', els.lensList).forEach((a) => a.classList.remove('focus')); return; }
      els.lensFocus.innerHTML = `<div class="row"><code>${esc(hit.key)}</code><span class="small muted">${esc(CL.docsLabel[lang] || '')}</span><span class="spacer"></span><a class="btn sm primary" href="${esc(hit.url)}" target="_blank" rel="noopener">Open docs ↗</a></div>`;
      els.lensFocus.classList.add('show');
      $$('a', els.lensList).forEach((a) => a.classList.toggle('focus', a.dataset.key === hit.key));
    }
    function updateLens() {
      const syms = findSymbols(lang, cm.getValue());
      const home = CL.langHome[lang];
      els.lensList.innerHTML = syms.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener" data-key="${esc(s.key)}">${esc(s.key)}</a>`).join('') +
        (home ? `<a href="${esc(home.url)}" target="_blank" rel="noopener" style="font-family:var(--font)">${esc(home.label)} ↗</a>` : '');
    }

    function setBanner(type, html) {
      if (!type) { els.banner.hidden = true; return; }
      els.banner.hidden = false; els.banner.className = 'banner ' + type; els.banner.innerHTML = html;
    }
    function setOut(html) { els.out.hidden = !html; els.out.innerHTML = html || ''; }
    const status = (msg) => { setBanner('info', '⏳ ' + esc(msg)); };

    function renderActions() {
      const runnable = LANGS[lang].run;
      const k = cfg.kind;
      let html = '';
      if (runnable) {
        const label = k === 'free' ? 'Run' : k === 'react' ? 'Run & check' : k === 'sql' ? 'Run & check' : k === 'algo' ? 'Run tests' : 'Run & check';
        html += `<button class="btn primary" data-act="run">▶ ${label}</button>`;
        if (k === 'sql' && cfg.ex) html += `<button class="btn" data-act="runonly">Run only</button>`;
        if (k === 'react' && cfg.ex) html += `<button class="btn" data-act="runonly">Preview only</button>`;
        html += `<span class="tiny muted"><kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>Enter</kbd></span>`;
      } else {
        html += `<button class="btn primary" data-act="copyprog">⧉ Copy ${k === 'algo' ? 'program + tests' : 'program'}</button>`;
        html += (RUNNERS[lang] || []).map((r) => `<a class="btn sm" href="${r.url}" target="_blank" rel="noopener">${esc(r.label)} ↗</a>`).join('');
      }
      if (k === 'algo' && !runnable) html += `<button class="btn ghost sm" data-act="showprog">View full program</button>`;
      els.actions.innerHTML = html;

      // compiled-language helper
      if (!runnable) {
        const lr = LOCAL_RUN[lang];
        const expect = k === 'algo' ? `<code>${cfg.ch.tests.length}/${cfg.ch.tests.length} tests passed</code>` : 'the expected output';
        els.runbox.hidden = false;
        els.runbox.innerHTML = `
          <div class="small"><b>${esc(LANGS[lang].name)} runs outside the browser.</b> Copy the program, run it in an online compiler (links above) or locally, then paste the output here. CodeLab checks it for ${expect}.</div>
          <details class="small"><summary>Run it on your machine</summary><div class="muted" style="margin-top:4px">${esc(lr.note)}, then:</div><pre style="margin:4px 0;background:var(--ed-bg);color:var(--ed-ink);padding:8px 10px;border-radius:8px;overflow:auto">${esc(lr.cmd)}</pre><a href="${lr.doc}" target="_blank" rel="noopener">Setup guide ↗</a></details>
          ${cfg.kind !== 'free' ? `<textarea placeholder="Paste your program's output here…" aria-label="Program output"></textarea><div class="row"><button class="btn" data-act="verify">✓ Check my output</button></div>` : ''}`;
      } else els.runbox.hidden = true;

      if (k === 'sql') {
        els.schema.hidden = false;
        els.schema.innerHTML = `<div class="eyebrow" style="margin-bottom:4px">Database schema (SQLite)</div>` + CL.sqlTables.map((t) => `<div><b>${t.name}</b> <span class="muted">(${esc(t.cols)})</span></div>`).join('');
      } else els.schema.hidden = true;
      els.preview.hidden = k !== 'react';
      if (k === 'react' && !els.preview.innerHTML) els.preview.innerHTML = '<span style="color:#888;font-size:.85rem">Your component renders here.</span>';
    }

    function switchLang(l) {
      if (l === lang) return;
      cfg.onCode && cfg.onCode(lang, cm.getValue());
      lang = l;
      cm.removeOverlay(overlay);
      overlay = docsOverlay(lang);
      cm.setOption('mode', LANGS[lang].mode);
      cm.setOption('indentUnit', LANGS[lang].indent);
      cm.setOption('tabSize', LANGS[lang].indent);
      cm.setValue(cfg.initial(lang));
      cm.addOverlay(overlay);
      cm.clearHistory();
      setBanner(null); setOut('');
      renderActions(); markTabs(); updateLens();
      cfg.onLang && cfg.onLang(lang);
    }
    function markTabs() {
      $$('.tabs button', wb).forEach((b) => {
        b.classList.toggle('on', b.dataset.lang === lang);
        b.setAttribute('aria-selected', b.dataset.lang === lang);
        const solved = cfg.solved && cfg.solved(b.dataset.lang);
        $('.ok', b).textContent = solved ? ' ✓' : '';
      });
    }

    async function primary(onlyRun) {
      const code = cm.getValue();
      cfg.onCode && cfg.onCode(lang, code);
      if (!LANGS[lang].run) { copyProgram(); return; }
      const btn = $('[data-act=run]', wb);
      btn && (btn.disabled = true);
      try {
        if (cfg.kind === 'algo') await runAlgo(code);
        else if (cfg.kind === 'lang' || cfg.kind === 'free') await runStdout(code);
        else if (cfg.kind === 'sql') await runSql(code, onlyRun);
        else if (cfg.kind === 'react') await runReact(code, onlyRun);
      } finally { btn && (btn.disabled = false); }
    }

    let errMarks = [];
    function markErrors(list) {
      errMarks.forEach((h) => cm.removeLineClass(h, 'background', 'line-error'));
      errMarks = (list || []).filter((e) => e.line).map((e) => cm.addLineClass(e.line - 1, 'background', 'line-error'));
    }
    const exec = (code, opts) => (lang === 'python' ? runPy(code, opts, status) : lang === 'typescript' ? runTS(code, opts, status) : runJS(code, opts));

    async function runAlgo(code) {
      const ch = cfg.ch;
      setBanner('info', '⏳ Running tests…'); setOut('');
      const fname = ch.names[lang];
      const r = await exec(code, { tests: ch.tests, fname });
      const te = r.typeErrors || [];
      markErrors(te);
      let html = typeErrorHtml(te) + (r.out ? `<div class="info">— console output —</div>${esc(r.out)}\n\n` : '');
      if (r.error) {
        setBanner('bad', '✗ Your code raised an error before the tests could finish.');
        setOut(html + `<span class="fail">${esc(r.error)}</span>`);
        cfg.onResult && cfg.onResult(false, lang);
        return;
      }
      let passed = 0;
      r.results.forEach((res, i) => {
        const t = ch.tests[i];
        const args = t.args.map((a) => JSON.stringify(a)).join(', ');
        if (res.error) { html += `<span class="fail">✗ Test ${i + 1}</span>  ${esc(fname)}(${esc(args)})\n    ${esc(res.error)}\n`; return; }
        const ok = JSON.stringify(res.got) === JSON.stringify(t.expected);
        if (ok) { passed++; html += `<span class="pass">✓ Test ${i + 1}</span>  ${esc(fname)}(${esc(args)}) → ${esc(JSON.stringify(res.got))}\n`; }
        else html += `<span class="fail">✗ Test ${i + 1}</span>  ${esc(fname)}(${esc(args)})\n    expected ${esc(JSON.stringify(t.expected))}\n    got      ${esc(res.undef ? (lang === 'python' ? 'None' : 'undefined') + ' (did you forget to return?)' : JSON.stringify(res.got))}\n`;
      });
      const all = passed === ch.tests.length && !te.length;
      setBanner(all ? 'good' : 'bad', all ? `✓ All ${passed} tests passed in ${esc(LANGS[lang].name)}!`
        : passed === ch.tests.length ? `All tests pass, but tsc --strict reports ${te.length} type error${te.length > 1 ? 's' : ''}. Fix ${te.length > 1 ? 'them' : 'it'} to complete the challenge.`
        : `${passed} of ${ch.tests.length} tests passed. Read the failing case, predict the fix, and try again.`);
      setOut(html);
      if (all) wb.classList.add('flash'), setTimeout(() => wb.classList.remove('flash'), 1000);
      cfg.onResult && cfg.onResult(all, lang);
    }

    async function runStdout(code) {
      setBanner('info', '⏳ Running…'); setOut('');
      const r = await exec(code, {});
      const te = r.typeErrors || [];
      markErrors(te);
      let html = esc(r.out || '');
      if (r.error) html += (html ? '\n' : '') + `<span class="fail">${esc(r.error)}</span>`;
      if (!html) html = '<span class="info">(no output, use print / console.log)</span>';
      setOut(typeErrorHtml(te) + (te.length ? '<div class="info">— output (types are erased, so it still ran) —</div>' : '') + html);
      if (cfg.kind === 'free' || !cfg.ex) { setBanner(r.error ? 'bad' : te.length ? 'bad' : null, r.error ? '✗ Error' : te.length ? `✗ ${te.length} type error${te.length > 1 ? 's' : ''}` : ''); return; }
      if (te.length && !r.error) {
        setBanner('bad', `✗ tsc --strict reports ${te.length} type error${te.length > 1 ? 's' : ''}. In TypeScript the program must type-check, not just run.`);
        cfg.onResult && cfg.onResult(false, lang);
        return;
      }
      checkOutput(r.error ? null : r.out);
    }

    function normOut(s) { return String(s ?? '').replace(/\r\n/g, '\n').split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').trim(); }
    function checkOutput(out) {
      const exp = normOut(cfg.ex.expected);
      if (out == null) { setBanner('bad', '✗ Fix the error, then run again.'); cfg.onResult && cfg.onResult(false, lang); return; }
      const got = normOut(out);
      if (got === exp) {
        setBanner('good', '✓ Output matches. Nice work!');
        wb.classList.add('flash'); setTimeout(() => wb.classList.remove('flash'), 1000);
        cfg.onResult && cfg.onResult(true, lang);
      } else {
        const gl = got.split('\n'), el = exp.split('\n');
        let i = 0; while (i < Math.max(gl.length, el.length) && gl[i] === el[i]) i++;
        setBanner('bad', `✗ Output differs at line ${i + 1}: expected <code>${esc(el[i] ?? '(end of output)')}</code> but got <code>${esc(gl[i] ?? '(end of output)')}</code>`);
        cfg.onResult && cfg.onResult(false, lang);
      }
    }

    function tableHtml(r) {
      if (!r) return '<span class="info">Query ran. No rows returned.</span>';
      return `<table><tr>${r.columns.map((c) => `<th>${esc(c)}</th>`).join('')}</tr>${r.values.slice(0, 200).map((row) => `<tr>${row.map((v) => `<td>${v === null ? '<span class="info">NULL</span>' : esc(v)}</td>`).join('')}</tr>`).join('')}</table>` +
        `<div class="info" style="margin-top:6px">${r.values.length} row${r.values.length === 1 ? '' : 's'}${r.values.length > 200 ? ' (showing 200)' : ''}</div>`;
    }
    async function runSql(code, onlyRun) {
      setBanner('info', '⏳ Running query…');
      const r = await runSQL(code);
      if (r.error) { setBanner('bad', '✗ SQL error'); setOut(`<span class="fail">${esc(r.error)}</span>`); if (!onlyRun && cfg.ex) cfg.onResult && cfg.onResult(false, lang); return; }
      const last = r.res[r.res.length - 1];
      setOut(tableHtml(last));
      if (onlyRun || !cfg.ex) { setBanner(null); return; }
      const sol = (await runSQL(cfg.ex.solution)).res;
      const exp = sol[sol.length - 1];
      const norm = (rows) => rows.map((row) => row.map((v) => (typeof v === 'number' ? Math.round(v * 1e4) / 1e4 : v)));
      let msg = null;
      if (!last) msg = 'Your query returned no rows.';
      else if (last.columns.length !== exp.columns.length) msg = `Expected ${exp.columns.length} column${exp.columns.length > 1 ? 's' : ''} (<code>${esc(exp.columns.join(', '))}</code>) but got ${last.columns.length}.`;
      else if (last.values.length !== exp.values.length) msg = `Expected ${exp.values.length} row${exp.values.length > 1 ? 's' : ''} but got ${last.values.length}. Check your filters and joins.`;
      else {
        let a = norm(last.values).map((x) => JSON.stringify(x)), b = norm(exp.values).map((x) => JSON.stringify(x));
        if (!cfg.ex.ordered) { a = a.slice().sort(); b = b.slice().sort(); }
        if (a.join() !== b.join()) msg = cfg.ex.ordered && a.slice().sort().join() === b.slice().sort().join() ? 'Right rows, wrong order. Check your ORDER BY.' : 'Same shape, but some values differ. Compare your columns with the prompt.';
      }
      if (msg) { setBanner('bad', '✗ ' + msg); cfg.onResult && cfg.onResult(false, lang); }
      else { setBanner('good', '✓ Your result matches the expected result!'); wb.classList.add('flash'); setTimeout(() => wb.classList.remove('flash'), 1000); cfg.onResult && cfg.onResult(true, lang); }
    }

    async function runReact(code, onlyRun) {
      try { await loadReact(status); } catch (e) { setBanner('bad', '✗ ' + esc(e.message)); return; }
      let compiled;
      try { compiled = compileReact(code); }
      catch (e) { setBanner('bad', '✗ JSX syntax error'); setOut(`<span class="fail">${esc(e.message)}</span>`); return; }
      const box = evalApp(compiled);
      if (box.error || !box.App) { setBanner('bad', '✗ ' + (box.error ? 'Error while running your code' : 'Define a component named App')); setOut(box.error ? `<span class="fail">${esc(box.error.message || box.error)}</span>` : ''); return; }
      disposeReact();
      els.preview.innerHTML = '';
      const errs = [];
      try { activeReactRoot = mountReact(els.preview, box.App, (e) => errs.push(e)); } catch (e) { setOut(`<span class="fail">${esc(e.message)}</span>`); }
      if (onlyRun || !cfg.ex) { setBanner(errs.length ? 'bad' : null, errs.length ? '✗ Render error' : ''); setOut(''); return; }
      setBanner('info', '⏳ Running checks…');
      let html = '', passed = 0;
      for (const t of cfg.ex.tests) {
        const sandbox = document.createElement('div');
        sandbox.style.cssText = 'position:absolute;left:-10000px;top:0;width:600px';
        document.body.appendChild(sandbox);
        let ok = false, err = null, root = null;
        try { root = mountReact(sandbox, box.App, (e) => (err = e)); ok = !!(await t.fn(sandbox, testHelpers)) && !err; }
        catch (e) { err = e; }
        try { root && root.unmount(); } catch (e) {}
        sandbox.remove();
        if (ok) passed++;
        html += ok ? `<span class="pass">✓</span> ${esc(t.name)}\n` : `<span class="fail">✗</span> ${esc(t.name)}${err ? `\n    ${esc(err.message || err)}` : ''}\n`;
      }
      setOut(html);
      const all = passed === cfg.ex.tests.length;
      setBanner(all ? 'good' : 'bad', all ? '✓ All checks passed!' : `${passed} of ${cfg.ex.tests.length} checks passed.`);
      if (all) { wb.classList.add('flash'); setTimeout(() => wb.classList.remove('flash'), 1000); }
      cfg.onResult && cfg.onResult(all, lang);
    }

    function fullProgram() { return cfg.kind === 'algo' ? H.program(cfg.ch, lang, cm.getValue()) : cm.getValue(); }
    function copyProgram() { copyText(fullProgram(), cfg.kind === 'algo' ? 'program with test harness' : 'program'); }

    wb.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-act],[data-lang]');
      if (!b) return;
      if (b.dataset.lang) return switchLang(b.dataset.lang);
      const a = b.dataset.act;
      if (a === 'run') primary();
      else if (a === 'runonly') primary(true);
      else if (a === 'copy') copyText(cm.getValue(), 'code');
      else if (a === 'copyprog') copyProgram();
      else if (a === 'showprog') { setOut(esc(fullProgram())); setBanner('info', 'This is exactly what “Copy program + tests” puts on your clipboard. The harness at the bottom calls your function with each test case.'); }
      else if (a === 'reset') {
        const ok = await modal('Reset code?', '<p>This replaces your code in this editor with the starter code.</p>', [{ label: 'Cancel', value: false }, { label: 'Reset', value: true, primary: true }]);
        if (ok) { cm.setValue(cfg.starter ? cfg.starter(lang) : ''); setBanner(null); setOut(''); }
      } else if (a === 'verify') {
        const txt = $('textarea', els.runbox).value;
        if (!txt.trim()) { setBanner('bad', 'Paste the output from your compiler first.'); return; }
        if (cfg.kind === 'algo') {
          const m = txt.match(/(\d+)\/(\d+) tests passed/);
          const n = cfg.ch.tests.length;
          if (m && +m[1] === n && +m[2] === n) { setBanner('good', `✓ ${n}/${n} tests passed in ${esc(LANGS[lang].name)}. Well done!`); cfg.onResult && cfg.onResult(true, lang); }
          else { setBanner('bad', m ? `${m[1]}/${m[2]} tests passed. Look at the FAIL lines for what went wrong.` : 'Could not find the "N/N tests passed" summary line. Did the program compile?'); cfg.onResult && cfg.onResult(false, lang); }
        } else checkOutput(txt);
      }
    });

    renderActions(); markTabs(); updateLens();
    return {
      cm, get lang() { return lang; }, markTabs,
      load(code) { cm.setValue(code); cm.focus(); },
      setLang: switchLang,
    };
  }

  /* ---------------- Sidebar ---------------- */
  function renderSide() {
    const h = location.hash.slice(1) || 'home';
    const due = dueCards().length;
    const on = (x) => (h === x || h.startsWith(x + '-') ? 'on' : '');
    const curTrack = h.startsWith('lesson-') ? TRACK_OF[h.slice(7)]?.id : h.startsWith('track-') ? h.slice(6) : null;
    $('#side').innerHTML = `
      <a class="brand" href="#home"><span class="brand-mark">&lt;/&gt;</span><b>CodeLab</b></a>
      <a class="nav ${on('home')}" href="#home">🏠 Dashboard</a>
      <a class="nav ${on('review')}" href="#review">🔁 Review ${due ? `<span class="badge">${due}</span>` : ''}</a>
      <a class="nav ${on('playground')}" href="#playground">🧪 Playground</a>
      <a class="nav ${on('notes')}" href="#notes">📝 My notes</a>
      <h4>Tracks</h4>
      ${TRACKS.map((t) => `<a class="nav ${curTrack === t.id ? 'on' : ''}" href="#track-${t.id}"><span class="dot" style="background:${t.color}"></span>${esc(t.name)}<span class="pct">${trackPct(t)}%</span></a>`).join('')}
      <h4>You</h4>
      ${SB && session ? `<a class="nav ${on('account')}" href="#account">👤 ${esc(profile?.display_name || 'My account')}</a>` : ''}
      ${SB && !session ? `<a class="nav" href="#signin">🔑 Sign in to save progress</a>` : ''}
      <a class="nav ${on('settings')}" href="#settings">⚙️ Settings</a>
      <div class="side-foot">
        <div>🔥 ${streak()}-day streak · ${S.xp} XP</div>
        <div class="sync ${syncMode === 'cloud' || syncMode === 'account' ? 'ok' : syncMode === 'error' ? 'err' : ''}" id="syncState"><i></i> ${SYNC_TEXT[syncMode]}</div>
      </div>`;
  }

  /* ---------------- Views ---------------- */
  function viewHome(main) {
    const t = dayKey();
    const todayXp = S.days[t] || 0;
    const goal = S.settings.goal;
    const done = Object.values(LESSON).filter((l) => lessonStatus(l) === 'done').length;
    const total = Object.keys(LESSON).length;
    const due = dueCards().length;
    const last = S.last && LESSON[S.last];
    const lastTrack = last && TRACK_OF[last.id];
    const cont = last && (lessonStatus(last) !== 'done' ? last : nextInTrack(lastTrack));
    const tip = TIPS[Math.floor(Date.now() / 864e5) % TIPS.length];
    // heatmap: 15 weeks ending this week
    const cells = [];
    const end = new Date(); end.setDate(end.getDate() + (6 - end.getDay()));
    for (let i = 15 * 7 - 1; i >= 0; i--) {
      const d = new Date(end); d.setDate(end.getDate() - i);
      const v = S.days[dayKey(d)] || 0;
      const future = d > new Date();
      cells.push(`<i class="${v >= goal ? 'l3' : v >= goal / 2 ? 'l2' : v > 0 ? 'l1' : ''}" style="${future ? 'opacity:.3' : ''}" title="${dayKey(d)}: ${v} XP"></i>`);
    }
    main.innerHTML = `
      <div class="hero">
        <div class="card">
          <div class="eyebrow">Your learning lab</div>
          <h1>${profile ? `${done === 0 ? 'Welcome' : 'Welcome back'}, ${esc(profile.display_name)}` : done === 0 ? 'Welcome to CodeLab' : 'Welcome back'}</h1>
          <p class="muted" style="margin-top:0">Learn a concept, check your understanding, practice in the editor, then reflect. Short daily sessions beat long cramming.</p>
          <div class="row" style="gap:24px;margin:14px 0">
            <div class="ring" style="--p:${Math.min(100, Math.round((100 * todayXp) / goal))}"><div><b>${todayXp}</b>of ${goal} XP</div></div>
            <div class="stat"><b>🔥 ${streak()}</b><span class="small muted">day streak</span></div>
            <div class="stat"><b>${done}<span class="muted" style="font-size:1rem">/${total}</span></b><span class="small muted">lessons done</span></div>
            <div class="stat"><b>${S.xp}</b><span class="small muted">total XP</span></div>
          </div>
          <div class="row">
            ${cont ? `<a class="btn primary" href="#lesson-${cont.id}">Continue: ${esc(cont.title)} →</a>` : `<a class="btn primary" href="#track-algo">Start with Algorithms →</a><a class="btn" href="#track-python">or Python basics</a>`}
            ${due ? `<a class="btn" href="#review">🔁 Review ${due} card${due > 1 ? 's' : ''}</a>` : ''}
          </div>
        </div>
        <div class="card">
          <div class="row"><h3 style="margin:0">Activity</h3><span class="spacer"></span><span class="tiny muted">last 15 weeks</span></div>
          <div class="heat" style="margin:12px 0">${cells.join('')}</div>
          <div class="tip"><b>${esc(tip[0])}.</b> <span class="small">${esc(tip[1])}</span></div>
        </div>
      </div>
      <div class="row" style="margin:24px 0 10px"><h2 style="margin:0">Tracks</h2></div>
      <div class="grid g4">
        ${TRACKS.map((tr) => {
          const p = trackPct(tr); const nx = nextInTrack(tr);
          return `<a class="card track-card" href="#track-${tr.id}">
            <div class="row"><span class="ti" style="background:${tr.color}">${esc(tr.short)}</span><b>${esc(tr.name)}</b></div>
            <div class="small muted" style="flex:1">${esc(tr.blurb)}</div>
            <div class="bar"><i style="width:${p}%;background:${tr.color}"></i></div>
            <div class="tiny muted">${p === 100 ? '✓ Complete' : `${tr.lessons.length} lessons · Next: ${esc(nx.title)}`}</div>
          </a>`;
        }).join('')}
      </div>
      <div class="card" style="margin-top:20px">
        <h3>How each lesson works</h3>
        <div class="grid g4 small">
          <div><b>1 · Learn</b><div class="muted">A focused explanation, key points, and links to the official docs.</div></div>
          <div><b>2 · Check</b><div class="muted">Quick retrieval questions. Every answer joins your spaced-review deck.</div></div>
          <div><b>3 · Practice</b><div class="muted">Write real code with automatic tests, progressive hints, and a docs-linked editor.</div></div>
          <div><b>4 · Reflect</b><div class="muted">Explain it in your own words. Your notes are collected in My notes.</div></div>
        </div>
      </div>`;
  }

  function viewTrack(main, id) {
    const t = TRACKS.find((x) => x.id === id);
    if (!t) return viewHome(main);
    const home = t.lang ? CL.langHome[t.lang] : null;
    main.innerHTML = `
      <div class="crumbs"><a href="#home">Dashboard</a> / ${esc(t.name)}</div>
      <div class="row" style="align-items:flex-start;margin-bottom:16px">
        <span class="ti" style="background:${t.color};width:48px;height:48px;border-radius:12px;display:grid;place-items:center;color:#fff;font-family:var(--mono);font-weight:600">${esc(t.short)}</span>
        <div style="flex:1;min-width:240px"><h1 style="margin:0">${esc(t.name)}</h1><div class="muted">${esc(t.blurb)}</div></div>
        <div style="min-width:180px"><div class="tiny muted">${trackPct(t)}% complete</div><div class="bar"><i style="width:${trackPct(t)}%;background:${t.color}"></i></div></div>
      </div>
      ${home ? `<p class="small">Reference: <a href="${home.url}" target="_blank" rel="noopener">${esc(home.label)} ↗</a>${t.kind === 'lang' && !LANGS[t.lang].run ? ' · Programs run in an online compiler or on your machine, then you paste the output back to check it.' : ''}</p>` : ''}
      ${t.kind === 'algo' ? `<p class="small muted">Solving the same problem in a second language is one of the fastest ways to learn its syntax.</p>` : ''}
      <div class="lesson-list">
        ${t.lessons.map((l, i) => {
          const st = lessonStatus(l);
          const ch = l.challenge && CH[l.challenge];
          const solved = S.lessons[l.id]?.solved || {};
          return `<a class="card lrow ${st}" href="#lesson-${l.id}">
            <span class="lnum">${st === 'done' ? '✓' : i + 1}</span>
            <div style="flex:1;min-width:0"><b>${esc(l.title)}</b><div class="tiny muted">${l.minutes} min${ch ? ` · Challenge: ${esc(ch.title)}` : ''}${l.exercise ? ' · Hands-on exercise' : ''}${!hasPractice(l) ? ' · Concept + quiz' : ''}</div></div>
            ${ch ? `<span class="pill ${ch.difficulty === 'Medium' ? 'warn' : 'acc'}">${ch.difficulty}</span><span class="langdots">${ALGO_LANGS.map((x) => `<span class="${solved[x] ? 'on' : ''}" title="${LANGS[x].name}">${SHORT[x]}</span>`).join('')}</span>` : ''}
          </a>`;
        }).join('')}
      </div>`;
  }

  function viewLesson(main, id) {
    const l = LESSON[id];
    if (!l) return viewHome(main);
    const t = TRACK_OF[id];
    const st = LS(id);
    S.last = id; save();
    const ch = l.challenge && CH[l.challenge];
    const ex = l.exercise;
    const prev = t.lessons[l._i - 1], next = t.lessons[l._i + 1];
    const steps = [['learn', 'Learn'], ['check', 'Check'], ...(hasPractice(l) ? [['practice', 'Practice']] : []), ['reflect', 'Reflect']];

    main.innerHTML = `
      <div class="crumbs"><a href="#home">Dashboard</a> / <a href="#track-${t.id}">${esc(t.name)}</a> / Lesson ${l._i + 1}</div>
      <div class="row" style="margin-bottom:12px"><h1 style="margin:0">${esc(l.title)}</h1><span class="pill">${l.minutes} min</span>${ch ? `<span class="pill ${ch.difficulty === 'Medium' ? 'warn' : 'acc'}">${ch.difficulty}</span>` : ''}<span id="doneMark"></span></div>
      <div class="lesson">
        <div class="lesson-left">
          <div class="steps">${steps.map(([k, n], i) => `<button class="step" data-step="${k}"><b>${i + 1}</b>${n}</button>`).join('')}</div>
          <section class="card concept" id="s-learn">
            <div class="row" style="margin-bottom:6px"><div class="eyebrow">Step 1 · Learn</div><span class="spacer"></span>
              ${CL.simple && CL.simple[id] ? `<div class="tabs" id="lvl" role="group" aria-label="Lesson style"><button data-lv="simple">🧩 Simple steps</button><button data-lv="detailed">📘 Full lesson</button></div>` : ''}</div>
            <div id="learnBody"></div>
          </section>
          <section class="card" id="s-check">
            <div class="eyebrow">Step 2 · Check your understanding</div>
            <p class="small muted" style="margin-top:4px">Answer from memory first. Every question is added to your review deck.</p>
            <div id="quiz"></div>
          </section>
          ${hasPractice(l) ? `<section class="card" id="s-practice"><div class="eyebrow">Step 3 · Practice</div><div id="practice"></div></section>` : ''}
          <section class="card" id="s-reflect">
            <div class="eyebrow">Step ${steps.length} · Reflect</div>
            <p class="small" style="margin:4px 0 8px">In your own words: <b>what is the key idea, and when would you use it?</b> Explaining it plainly (the Feynman technique) shows you what you have really understood.</p>
            <textarea class="reflect" id="note" placeholder="I'd use this when…">${esc(st.note)}</textarea>
            <div class="row" style="margin-top:8px"><button class="btn" id="saveNote">Save reflection</button><span class="tiny muted" id="noteState"></span></div>
          </section>
          <div class="row">
            ${prev ? `<a class="btn" href="#lesson-${prev.id}">← ${esc(prev.title)}</a>` : ''}
            <span class="spacer"></span>
            ${next ? `<a class="btn primary" href="#lesson-${next.id}">Next: ${esc(next.title)} →</a>` : `<a class="btn primary" href="#track-${t.id}">Back to ${esc(t.name)} →</a>`}
          </div>
        </div>
        <div class="lesson-right" id="bench"></div>
      </div>`;

    $$('.step', main).forEach((b) => b.addEventListener('click', () => $('#s-' + b.dataset.step).scrollIntoView({ behavior: 'smooth', block: 'start' })));

    // ----- Learn: Simple steps (cards) or Full lesson
    const cards = (CL.simple && CL.simple[id]) || null;
    let cardIdx = 0;
    const learnBody = $('#learnBody', main);
    const fullHtml = () => `${l.concept}
            <h3 style="margin-top:16px">Key points</h3>
            <ul class="keys">${l.keyPoints.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>
            <h3 style="margin-top:16px">Read the docs</h3>
            ${docLinks(l.docs)}`;
    function renderLearn() {
      const simple = cards && S.settings.level !== 'detailed';
      $$('#lvl button', main).forEach((b) => { const on = (b.dataset.lv === 'simple') === !!simple; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
      if (!simple) { learnBody.innerHTML = fullHtml(); return; }
      const last = cardIdx >= cards.length;
      if (last) {
        learnBody.innerHTML = `<div class="sc done-card">
          <div class="sc-head"><span class="pill good">✓ All ${cards.length} steps done</span></div>
          <div class="sc-title">Nice work! 🎉</div>
          <p>Now see what stuck. Answer the questions below <b>without scrolling back up</b>. Trying to remember is how your brain locks it in.</p>
          <div class="row"><button class="btn primary" id="toCheck">Check my understanding ↓</button><button class="btn ghost" id="again">↺ Go through the steps again</button></div>
          <details class="small" style="margin-top:14px"><summary>Want to go deeper? Read the docs</summary><div style="margin-top:8px">${docLinks(l.docs)}</div></details>
        </div>`;
        $('#toCheck', learnBody).addEventListener('click', () => $('#s-check').scrollIntoView({ behavior: 'smooth', block: 'start' }));
        $('#again', learnBody).addEventListener('click', () => { cardIdx = 0; renderLearn(); });
        return;
      }
      const c = cards[cardIdx];
      learnBody.innerHTML = `<div class="sc" tabindex="-1" aria-live="polite">
          <div class="sc-head"><span class="tiny muted">Step ${cardIdx + 1} of ${cards.length}</span><span class="sc-dots" aria-hidden="true">${cards.map((_, i) => `<i class="${i === cardIdx ? 'on' : i < cardIdx ? 'seen' : ''}"></i>`).join('')}</span></div>
          <div class="sc-title">${c.e ? `<span class="sc-emoji" aria-hidden="true">${c.e}</span>` : ''}${esc(c.t)}</div>
          <div class="sc-body">${c.b}</div>
          ${c.code ? `<pre class="snippet">${esc(c.code)}</pre>` : ''}
          ${c.think ? `<div class="think"><b>🤔 Think about it:</b> ${c.think}</div>` : ''}
          <div class="row sc-nav">
            <button class="btn" id="prevC" ${cardIdx === 0 ? 'disabled' : ''}>← Back</button>
            <span class="spacer"></span>
            <button class="btn primary" id="nextC">${cardIdx === cards.length - 1 ? 'Finish ✓' : 'Next →'}</button>
          </div>
        </div>`;
      $('#prevC', learnBody).addEventListener('click', () => { cardIdx = Math.max(0, cardIdx - 1); renderLearn(); focusCard(); });
      $('#nextC', learnBody).addEventListener('click', () => { cardIdx++; renderLearn(); focusCard(); });
    }
    const focusCard = () => { const el = $('.sc', learnBody); if (el) { el.focus({ preventScroll: true }); const r = el.getBoundingClientRect(); if (r.top < 0 || r.top > innerHeight * 0.6) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } };
    learnBody.addEventListener('keydown', (e) => {
      if (!cards || S.settings.level === 'detailed' || e.target.closest('input,textarea,.CodeMirror')) return;
      if (e.key === 'ArrowRight' && cardIdx < cards.length) { cardIdx++; renderLearn(); focusCard(); }
      if (e.key === 'ArrowLeft' && cardIdx > 0) { cardIdx--; renderLearn(); focusCard(); }
    });
    $('#lvl', main)?.addEventListener('click', (e) => { const b = e.target.closest('[data-lv]'); if (!b) return; setLevel(b.dataset.lv); renderLearn(); });
    renderLearn();
    function refreshSteps() {
      const quizDone = (l.quiz || []).every((_, i) => st.quiz[i] != null);
      const map = { learn: true, check: quizDone, practice: st.passed, reflect: !!st.note.trim() };
      $$('.step', main).forEach((b) => b.classList.toggle('done', !!map[b.dataset.step]));
      const done = lessonStatus(l) === 'done';
      $('#doneMark').innerHTML = done ? '<span class="pill good">✓ Completed</span>' : '';
      if (done) award('done:' + id, 20, 'Lesson complete: ' + l.title);
    }

    // quiz
    const quizEl = $('#quiz', main);
    function renderQuiz() {
      quizEl.innerHTML = l.quiz.map((q, i) => {
        const chosen = st.quiz[i];
        const answered = chosen != null;
        return `<div class="q"><div class="qtext">${i + 1}. ${esc(q.q)}</div><div class="opts">${q.options.map((o, j) => {
          const cls = answered ? (j === q.answer ? 'right' : j === chosen ? 'wrong' : '') : '';
          return `<button class="opt ${cls}" data-q="${i}" data-o="${j}" ${answered ? 'disabled' : ''}><span class="k">${'ABCD'[j]}</span><span>${esc(o)}</span></button>`;
        }).join('')}</div>${answered ? `<div class="why">${chosen === q.answer ? '✓ Correct.' : '✗ Not quite.'} ${esc(q.why)}</div>` : ''}</div>`;
      }).join('');
    }
    renderQuiz();
    quizEl.addEventListener('click', (e) => {
      const b = e.target.closest('.opt'); if (!b || b.disabled) return;
      const i = +b.dataset.q, j = +b.dataset.o, q = l.quiz[i];
      st.quiz[i] = j;
      scheduleCard(id + ':' + i, j === q.answer);
      if (j === q.answer) award('quiz:' + id + ':' + i, 10, 'Correct answer');
      save(); renderQuiz(); refreshSteps(); renderSide();
    });

    // reflection
    $('#saveNote', main).addEventListener('click', () => {
      st.note = $('#note', main).value;
      if (st.note.trim().length >= 20) award('note:' + id, 10, 'Reflection written');
      $('#noteState', main).textContent = st.note.trim().length < 20 && st.note.trim() ? 'Saved. Try writing a full sentence or two for the XP.' : 'Saved to My notes.';
      save(); refreshSteps();
    });

    // practice + workbench
    const bench = $('#bench', main);
    if (ch) {
      const langs = ALGO_LANGS;
      let curLang = st.lastLang || S.settings.algoLang;
      const pr = $('#practice', main);
      const names = langs.map((x) => `<code>${esc(ch.names[x])}</code> <span class="tiny muted">${LANGS[x].name}</span>`).join(' · ');
      pr.innerHTML = `
        <h3 style="margin-top:6px">${esc(ch.title)}</h3>
        <p>${ch.prompt}</p>
        <table class="mini"><tr><th>Input</th><th>Output</th></tr>${ch.tests.slice(0, 3).map((tt) => `<tr><td><code>${esc(tt.args.map((a, i) => ch.params[i].name + ' = ' + JSON.stringify(a)).join(', '))}</code></td><td><code>${esc(JSON.stringify(tt.expected))}</code></td></tr>`).join('')}</table>
        <p class="tiny muted">Function names: ${names}</p>
        <div id="hints"></div>
        <div class="row" style="margin-top:10px"><button class="btn sm" id="hintBtn">💡 Reveal a hint</button><button class="btn sm ghost" id="solBtn">Show solution</button><span class="tiny muted" id="solNote"></span></div>
        <div id="solution"></div>
        <div id="cx"></div>`;
      const renderHints = () => {
        $('#hints', pr).innerHTML = ch.hints.slice(0, st.hints).map((h, i) => `<div class="hint"><b>Hint ${i + 1}:</b> ${esc(h)}</div>`).join('');
        $('#hintBtn', pr).disabled = st.hints >= ch.hints.length;
        $('#hintBtn', pr).textContent = st.hints >= ch.hints.length ? 'All hints shown' : `💡 Reveal hint ${st.hints + 1} of ${ch.hints.length}`;
        const unlocked = st.attempts >= 2 || st.hints >= ch.hints.length || st.sawSolution || Object.keys(st.solved).length;
        $('#solBtn', pr).disabled = !unlocked;
        $('#solNote', pr).textContent = unlocked ? '' : 'Unlocks after 2 attempts or all hints';
      };
      renderHints();
      $('#hintBtn', pr).addEventListener('click', () => { st.hints++; save(); renderHints(); });
      $('#solBtn', pr).addEventListener('click', async () => {
        if (!st.sawSolution && !st.solved[wbApi.lang]) {
          const ok = await modal('Reveal the solution?', '<p>Productive struggle is where learning happens. If you reveal it, read it line by line, then <b>close it and retype it from memory</b>.</p><p class="small muted">Passing after viewing earns 15 XP instead of 30.</p>', [{ label: 'Keep trying', value: false }, { label: 'Reveal', value: true, primary: true }]);
          if (!ok) return;
          st.sawSolution = true; save();
        }
        const lg = wbApi.lang;
        $('#solution', pr).innerHTML = `<div class="row" style="margin-top:12px"><b>Solution: ${LANGS[lg].name}</b><span class="spacer"></span><button class="btn sm" id="loadSol">Load into editor</button></div><pre class="snippet" style="background:var(--ed-bg);color:var(--ed-ink);padding:12px;border-radius:10px;overflow:auto;font-size:.8rem">${esc(ch.solutions[lg])}</pre>`;
        $('#loadSol', pr).addEventListener('click', () => wbApi.load(ch.solutions[lg]));
      });
      const renderCx = () => {
        if (!Object.keys(st.solved).length) { $('#cx', pr).innerHTML = ''; return; }
        const c = ch.complexity;
        $('#cx', pr).innerHTML = `<div class="q" style="margin-top:14px"><div class="qtext">🧠 Bonus: what is the time complexity of the solution?</div><div class="opts">${c.options.map((o, j) => {
          const cls = st.cx != null ? (o === c.answer ? 'right' : j === st.cx ? 'wrong' : '') : '';
          return `<button class="opt ${cls}" data-cx="${j}" ${st.cx != null ? 'disabled' : ''}><span class="k">${'ABCD'[j]}</span>${esc(o)}</button>`;
        }).join('')}</div>${st.cx != null ? `<div class="why">${esc(c.why)}</div>` : ''}</div>`;
      };
      renderCx();
      $('#cx', pr).addEventListener('click', (e) => {
        const b = e.target.closest('[data-cx]'); if (!b || b.disabled) return;
        st.cx = +b.dataset.cx;
        if (ch.complexity.options[st.cx] === ch.complexity.answer) award('cx:' + id, 10, 'Complexity analysis');
        save(); renderCx();
      });
      const wbApi = workbench(bench, {
        kind: 'algo', ch, langs, lang: curLang,
        initial: (lg) => st.code[lg] ?? H.starter(ch, lg),
        starter: (lg) => H.starter(ch, lg),
        onCode: (lg, code) => { if (code !== H.starter(ch, lg) || st.code[lg] != null) { st.code[lg] = code; save(); } },
        onLang: (lg) => { st.lastLang = lg; save(); $('#solution', pr).innerHTML = ''; },
        solved: (lg) => !!st.solved[lg],
        onResult: (ok, lg) => {
          if (!ok) { st.attempts++; save(); renderHints(); return; }
          const first = !st.passed;
          st.passed = true; st.solved[lg] = true; save();
          if (first) award('pass:' + id, st.sawSolution ? 15 : 30, 'Challenge solved');
          else award('lang:' + id + ':' + lg, 20, 'Solved in ' + LANGS[lg].name);
          wbApi.markTabs(); renderCx(); renderHints(); refreshSteps(); renderSide();
          const unsolved = ALGO_LANGS.filter((x) => !st.solved[x]);
          if (unsolved.length) toast(`Try it in <b>${LANGS[unsolved[0]].name}</b> next for +20 XP`);
        },
      });
    } else if (ex) {
      const pr = $('#practice', main);
      const kind = t.kind === 'lang' ? 'lang' : t.kind;
      const lg = t.lang;
      const starter = kind === 'sql' ? `-- ${ex.prompt.replace(/<[^>]+>/g, '')}\nSELECT \n` : ex.starter;
      pr.innerHTML = `
        <p style="margin-top:8px">${ex.prompt}</p>
        ${kind === 'lang' ? `<div class="small muted">Expected output:</div><pre class="snippet" style="background:var(--soft);padding:10px 12px;border-radius:10px;font-size:.82rem;margin:4px 0 0;overflow:auto">${esc(ex.expected)}</pre>` : ''}
        ${kind === 'sql' ? `<p class="small muted">Your result is compared with the expected result: same columns (in order), same rows${ex.ordered ? ', <b>same row order</b>' : ' (any order)'}.</p>` : ''}
        ${kind === 'react' ? `<div class="small muted">Automatic checks:</div><ul class="keys small" style="margin-top:4px">${ex.tests.map((tt) => `<li>${esc(tt.name)}</li>`).join('')}</ul>` : ''}
        <div class="row" style="margin-top:10px"><button class="btn sm ghost" id="solBtn">Show solution</button><span class="tiny muted" id="solNote"></span></div>
        <div id="solution"></div>`;
      const lock = () => {
        const unlocked = st.attempts >= 2 || st.passed || st.sawSolution;
        $('#solBtn', pr).disabled = !unlocked;
        $('#solNote', pr).textContent = unlocked ? '' : 'Unlocks after 2 attempts';
      };
      lock();
      $('#solBtn', pr).addEventListener('click', () => {
        st.sawSolution = true; save();
        $('#solution', pr).innerHTML = `<div class="row" style="margin-top:12px"><b>Solution</b><span class="spacer"></span><button class="btn sm" id="loadSol">Load into editor</button></div><pre class="snippet" style="background:var(--ed-bg);color:var(--ed-ink);padding:12px;border-radius:10px;overflow:auto;font-size:.8rem">${esc(ex.solution)}</pre>`;
        $('#loadSol', pr).addEventListener('click', () => wbApi.load(ex.solution));
      });
      const wbApi = workbench(bench, {
        kind, ex, langs: [lg], lang: lg,
        initial: () => st.code[lg] ?? starter,
        starter: () => starter,
        onCode: (x, code) => { if (code !== starter || st.code[lg] != null) { st.code[lg] = code; save(); } },
        onResult: (ok) => {
          if (!ok) { st.attempts++; save(); lock(); return; }
          const first = !st.passed;
          st.passed = true; save(); lock();
          if (first) award('pass:' + id, st.sawSolution ? 15 : 30, 'Exercise complete');
          refreshSteps(); renderSide();
        },
      });
    } else {
      // concept-only lesson: sandbox
      const code = SANDBOX[id];
      if (code) {
        bench.innerHTML = '<div class="card" style="margin-bottom:12px"><b>Experiment</b><div class="small muted">Run this, then change it. Watching numbers grow makes Big-O concrete.</div></div><div id="sb"></div>';
        workbench($('#sb', bench), { kind: 'free', langs: ['python'], lang: 'python', initial: () => st.code.python ?? code, starter: () => code, onCode: (x, c) => { st.code.python = c; save(); } });
      }
    }
    refreshSteps();
  }

  function viewReview(main) {
    const due = dueCards();
    const total = Object.keys(S.review).length;
    if (!due.length) {
      const upcoming = Object.values(S.review).map((c) => c.due).sort()[0];
      main.innerHTML = `<h1>Review</h1><div class="card empty"><div style="font-size:2.4rem">🎉</div><h2>All caught up</h2>
        <p class="muted">${total ? `You have ${total} card${total > 1 ? 's' : ''} in your deck. The next one is due ${esc(upcoming)}.` : 'Answer lesson quiz questions to build your review deck.'}</p>
        <p class="small muted">CodeLab uses spaced repetition: correct answers come back after 1, 3, 7, 14, then 30 days. Misses come back today.</p>
        <a class="btn primary" href="#home">Back to dashboard</a></div>`;
      return;
    }
    let idx = 0;
    const draw = () => {
      if (idx >= due.length) { renderSide(); return viewReview(main); }
      const qid = due[idx], { lesson, q } = cardQuestion(qid);
      const order = q.options.map((_, i) => i).sort(() => Math.random() - 0.5);
      main.innerHTML = `<h1>Review</h1><p class="muted">Card ${idx + 1} of ${due.length} · from <a href="#lesson-${lesson.id}">${esc(TRACK_OF[lesson.id].name)}: ${esc(lesson.title)}</a></p>
        <div class="card review-card"><div class="q"><div class="qtext" style="font-size:1.1rem">${esc(q.q)}</div><div class="opts">${order.map((j, k) => `<button class="opt" data-o="${j}"><span class="k">${'ABCD'[k]}</span><span>${esc(q.options[j])}</span></button>`).join('')}</div><div id="after"></div></div></div>`;
      $('.opts', main).addEventListener('click', (e) => {
        const b = e.target.closest('.opt'); if (!b || b.disabled) return;
        const j = +b.dataset.o, ok = j === q.answer;
        $$('.opt', main).forEach((x) => { x.disabled = true; if (+x.dataset.o === q.answer) x.classList.add('right'); });
        if (!ok) b.classList.add('wrong');
        scheduleCard(qid, ok);
        if (ok) award('rev:' + qid + ':' + dayKey(), 5, 'Review');
        save();
        $('#after', main).innerHTML = `<div class="why">${ok ? '✓ Correct. See you in ' + BOX_DAYS[S.review[qid].box] + ' day(s).' : '✗ This card will come back today.'} ${esc(q.why)}</div><div class="row" style="margin-top:12px"><span class="spacer"></span><button class="btn primary" id="nextCard">Next →</button></div>`;
        $('#nextCard', main).focus();
        $('#nextCard', main).addEventListener('click', () => { idx++; draw(); });
      });
    };
    draw();
  }

  const PLAY_DEFAULTS = {
    python: '# Python playground. Runs in your browser.\nnums = [5, 3, 8, 1]\nprint(sorted(nums))\n',
    javascript: '// JavaScript playground. Runs in a sandboxed worker.\nconst nums = [5, 3, 8, 1];\nconsole.log(nums.sort((a, b) => a - b));\n',
    typescript: '// TypeScript playground: type-checked in strict mode, then run in your browser.\ninterface Lesson { title: string; minutes: number }\n\nconst plan: Lesson[] = [\n  { title: "Generics", minutes: 15 },\n  { title: "Narrowing", minutes: 15 },\n];\n\nconst total = plan.reduce((sum, l) => sum + l.minutes, 0);\nconsole.log(`${plan.length} lessons, ${total} minutes`);\n',
    go: 'package main\n\nimport (\n\t"fmt"\n\t"slices"\n)\n\nfunc main() {\n\tnums := []int{5, 3, 8, 1}\n\tslices.Sort(nums)\n\tfmt.Println(nums)\n}\n',
    rust: 'fn main() {\n    let mut nums = vec![5, 3, 8, 1];\n    nums.sort();\n    println!("{:?}", nums);\n}\n',
    java: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> nums = new ArrayList<>(List.of(5, 3, 8, 1));\n        Collections.sort(nums);\n        System.out.println(nums);\n    }\n}\n',
    csharp: 'using System;\nusing System.Linq;\n\npublic class Program\n{\n    public static void Main()\n    {\n        int[] nums = { 5, 3, 8, 1 };\n        Console.WriteLine(string.Join(", ", nums.OrderBy(n => n)));\n    }\n}\n',
    cpp: '#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {5, 3, 8, 1};\n    std::sort(nums.begin(), nums.end());\n    for (int n : nums) std::cout << n << " ";\n    std::cout << "\\n";\n    return 0;\n}\n',
    sql: '-- SQL playground: a real SQLite database with departments, employees, customers and orders.\nSELECT d.name AS department, COUNT(e.id) AS headcount, ROUND(AVG(e.salary)) AS avg_salary\nFROM departments d\nLEFT JOIN employees e ON e.dept_id = d.id\nGROUP BY d.name\nORDER BY headcount DESC;\n',
    react: 'const { useState } = React;\n\nfunction App() {\n  const [items, setItems] = useState(["Learn JSX"]);\n  const [text, setText] = useState("");\n  return (\n    <div>\n      <h2>Study list</h2>\n      <form onSubmit={e => { e.preventDefault(); if (text) { setItems([...items, text]); setText(""); } }}>\n        <input value={text} onChange={e => setText(e.target.value)} placeholder="Add a topic" />\n        <button>Add</button>\n      </form>\n      <ul>{items.map((t, i) => <li key={i}>{t}</li>)}</ul>\n    </div>\n  );\n}\n',
  };
  function viewPlayground(main) {
    const langs = ['python', 'javascript', 'typescript', 'java', 'csharp', 'cpp', 'go', 'rust', 'sql', 'react'];
    let lang = S.play._lang || 'python';
    main.innerHTML = `<div class="crumbs"><a href="#home">Dashboard</a> / Playground</div><h1>Playground</h1>
      <p class="muted">Free practice in any language. Your code is saved per language. Python, JavaScript, TypeScript, SQL and React run right here. Java, C#, C++, Go and Rust copy to an online compiler.</p>
      <div class="row" style="margin-bottom:10px"><div class="tabs" id="ptabs">${langs.map((l) => `<button data-pl="${l}">${esc(LANGS[l].name)}</button>`).join('')}</div></div>
      <div id="pbench"></div>`;
    const mount = () => {
      $$('#ptabs button', main).forEach((b) => b.classList.toggle('on', b.dataset.pl === lang));
      disposeReact();
      const kind = lang === 'sql' ? 'sql' : lang === 'react' ? 'react' : 'free';
      workbench($('#pbench', main), {
        kind, langs: [lang], lang, tall: true, ex: null,
        initial: () => S.play[lang] ?? PLAY_DEFAULTS[lang], starter: () => PLAY_DEFAULTS[lang],
        onCode: (x, c) => { S.play[lang] = c; save(); },
      });
    };
    $('#ptabs', main).addEventListener('click', (e) => { const b = e.target.closest('[data-pl]'); if (!b) return; lang = b.dataset.pl; S.play._lang = lang; save(); mount(); });
    mount();
  }

  function viewNotes(main) {
    const items = TRACKS.map((t) => ({ t, ls: t.lessons.filter((l) => S.lessons[l.id]?.note?.trim()) })).filter((x) => x.ls.length);
    main.innerHTML = `<div class="crumbs"><a href="#home">Dashboard</a> / My notes</div><h1>My notes</h1>
      <p class="muted">Your reflections from every lesson, in your own words. Re-reading what <em>you</em> wrote is a fast way to review.</p>
      ${items.length ? `<div class="row" style="margin-bottom:12px"><button class="btn sm" id="copyNotes">⧉ Copy all as Markdown</button></div>` + items.map(({ t, ls }) => `<h2 style="margin-top:18px">${esc(t.name)}</h2>` + ls.map((l) => `<div class="card notes-item"><a href="#lesson-${l.id}"><b>${esc(l.title)}</b></a><p>${esc(S.lessons[l.id].note)}</p></div>`).join('')).join('')
        : '<div class="card empty"><h2>No notes yet</h2><p class="muted">Finish a lesson\'s Reflect step and your note will appear here.</p></div>'}`;
    $('#copyNotes', main)?.addEventListener('click', () => copyText(items.map(({ t, ls }) => `## ${t.name}\n\n` + ls.map((l) => `### ${l.title}\n\n${S.lessons[l.id].note}\n`).join('\n')).join('\n'), 'notes'));
  }

  function viewSettings(main) {
    main.innerHTML = `<div class="crumbs"><a href="#home">Dashboard</a> / Settings</div><h1>Settings</h1>
      <div class="grid g2">
        <div class="card"><h3>Lesson style</h3><div class="tabs" id="level">${[['simple', 'Simple steps'], ['detailed', 'Full lessons']].map(([v, n]) => `<button data-v="${v}" class="${S.settings.level === v ? 'on' : ''}">${n}</button>`).join('')}</div><p class="small muted">Simple steps break each lesson into short cards, one idea at a time. Full lessons show everything at once with more technical detail. You can switch inside any lesson too.</p></div>
        <div class="card"><h3>Appearance</h3><div class="tabs" id="theme">${['auto', 'light', 'dark'].map((x) => `<button data-v="${x}" class="${S.settings.theme === x ? 'on' : ''}">${x[0].toUpperCase() + x.slice(1)}</button>`).join('')}</div></div>
        <div class="card"><h3>Daily goal</h3><div class="tabs" id="goal">${[20, 50, 100, 150].map((x) => `<button data-v="${x}" class="${S.settings.goal === x ? 'on' : ''}">${x} XP</button>`).join('')}</div><p class="small muted">About 50 XP is one lesson plus a review session.</p></div>
        <div class="card"><h3>Default language for algorithm challenges</h3><div class="tabs" id="alang">${ALGO_LANGS.map((x) => `<button data-v="${x}" class="${S.settings.algoLang === x ? 'on' : ''}">${LANGS[x].name}</button>`).join('')}</div></div>
        <div class="card"><h3>Your progress</h3><p class="small muted">${syncMode === 'cloud' || syncMode === 'account' ? 'Saved to your account, so it follows you across devices.' : SB ? 'Saved on this device only. <a href="#signin">Sign in</a> to keep it everywhere.' : 'Saved in this browser.'}</p>
          <div class="row"><button class="btn" id="exp">⧉ Copy backup</button><button class="btn" id="imp">Restore backup</button><button class="btn" id="reset" style="color:var(--bad)">Reset all progress</button></div></div>
      </div>`;
    const bind = (sel, fn) => $(sel, main).addEventListener('click', (e) => { const b = e.target.closest('[data-v]'); if (b) { fn(b.dataset.v); save(); viewSettings(main); } });
    bind('#theme', (v) => { S.settings.theme = v; applyTheme(); });
    bind('#level', (v) => setLevel(v));
    bind('#goal', (v) => (S.settings.goal = +v));
    bind('#alang', (v) => (S.settings.algoLang = v));
    $('#exp', main).addEventListener('click', () => copyText(JSON.stringify(S), 'progress backup'));
    $('#imp', main).addEventListener('click', async () => {
      const go = await modal('Restore backup', '<p class="small">Paste a backup copied from this page. It replaces your current progress.</p><textarea class="reflect" style="font-family:var(--mono);font-size:.75rem"></textarea>', [{ label: 'Cancel', value: null }, { label: 'Restore', value: 'go', primary: true }]);
      if (!go) return;
      try {
        const data = JSON.parse(modal.lastText);
        if (!data || typeof data !== 'object' || !data.lessons) throw new Error('not a CodeLab backup');
        S = Object.assign(defaultState(), data); S.settings = Object.assign(defaultState().settings, S.settings || {});
        save(true); render(); toast('Backup restored');
      } catch (e) { toast('That does not look like a CodeLab backup'); }
    });
    $('#reset', main).addEventListener('click', async () => {
      const ok = await modal('Reset all progress?', '<p>This erases your XP, streak, code, notes and review deck. It cannot be undone. Copy a backup first if you might want it back.</p>', [{ label: 'Cancel', value: false }, { label: 'Erase everything', value: true, primary: true }]);
      if (ok) { const keep = S.settings; S = defaultState(); S.settings = keep; save(true); render(); toast('Progress reset'); }
    });
  }

  /* ---------------- Accounts: sign-in, sign-up, account page ---------------- */
  function setLevel(v) {
    S.settings.level = v === 'detailed' ? 'detailed' : 'simple';
    save();
    if (SB && session) SB.from('profiles').update({ reading_level: S.settings.level, updated_at: new Date().toISOString() }).eq('id', session.user.id).then(() => {});
  }
  function friendlyAuthError(err) {
    const m = String((err && (err.message || err.error_description)) || err || '');
    const code = err && err.code;
    if (/invalid login credentials/i.test(m)) return 'That email and password don’t match. Check for typos, or reset your password.';
    if (/email not confirmed/i.test(m) || code === 'email_not_confirmed') return 'Please confirm your email first. Look for our message in your inbox (and spam folder).';
    if (/already registered|already been registered/i.test(m) || code === 'user_already_exists') return 'There’s already an account with that email. Try signing in instead.';
    if (code === 'over_email_send_rate_limit' || /rate limit/i.test(m)) return 'Too many emails were sent just now. Please wait a few minutes and try again.';
    if (code === 'email_address_not_authorized' || /not authorized/i.test(m)) return 'This site can’t send email to that address yet. (Site owner: connect an email provider in Supabase → Auth → SMTP.)';
    if (/database error saving new user/i.test(m)) return 'We couldn’t create that account. Please check your details and try again.';
    if (/password/i.test(m) && /(weak|short|least|characters)/i.test(m)) return 'Please choose a stronger password: at least 8 characters, mixing letters and numbers.';
    if (/fetch|network/i.test(m)) return 'We couldn’t reach the server. Check your internet connection and try again.';
    return m || 'Something went wrong. Please try again.';
  }
  const redirectBase = () => location.origin + location.pathname;
  const authShell = (inner) => `<div class="auth-wrap"><a class="brand" href="#welcome" style="justify-content:center"><span class="brand-mark">&lt;/&gt;</span><b>CodeLab</b></a>${inner}</div>`;
  function formMsg(el, type, text) { el.className = 'auth-msg ' + type; el.innerHTML = text; el.hidden = !text; }
  async function busy(btn, fn) { const t = btn.textContent; btn.disabled = true; btn.textContent = 'Please wait…'; try { await fn(); } finally { btn.disabled = false; btn.textContent = t; } }
  const pwField = (id, label, auto) => `<label class="field"><span>${label}</span><span class="pw"><input id="${id}" type="password" autocomplete="${auto}" minlength="8" required><button type="button" class="btn ghost sm" data-show="${id}" aria-label="Show password">Show</button></span></label>`;
  function bindShow(root) {
    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-show]'); if (!b) return;
      const i = $('#' + b.dataset.show, root); const show = i.type === 'password';
      i.type = show ? 'text' : 'password'; b.textContent = show ? 'Hide' : 'Show'; b.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  }
  let pendingEmail = '';

  function viewAuth(main, h) {
    if (h === 'welcome') {
      main.innerHTML = authShell(`
        <div class="card auth-card" style="text-align:center">
          <h1 style="font-size:2.1rem">Learn to code,<br>one small step at a time.</h1>
          <p class="muted">Short lessons, a real code editor, and instant feedback. Python, JavaScript, TypeScript, Java, C#, C++, Go, Rust, SQL and React.</p>
          <div class="auth-points">
            <div><b>🧩 Bite-size steps</b><span>Every lesson is broken into short cards. Switch to the full lesson any time.</span></div>
            <div><b>⚡ Code right here</b><span>Write and run code in your browser. No installs.</span></div>
            <div><b>🔁 Remember more</b><span>Quick reviews bring back what you learned, right before you’d forget it.</span></div>
          </div>
          <div class="col-btns">
            <a class="btn primary big" href="#signup">Create a free account</a>
            <a class="btn big" href="#signin">Sign in</a>
            <button class="btn ghost" id="guestBtn">Try it without an account</button>
            <span class="tiny muted">Without an account, your progress stays on this device only.</span>
          </div>
        </div>`);
      $('#guestBtn', main).addEventListener('click', () => { setGuest(true); location.hash = 'home'; });
      return;
    }
    if (h === 'signin') {
      main.innerHTML = authShell(`
        <form class="card auth-card" id="f" novalidate>
          <h2>Welcome back</h2>
          <label class="field"><span>Email</span><input id="email" type="email" autocomplete="email" required value="${esc(pendingEmail)}"></label>
          ${pwField('pw', 'Password', 'current-password')}
          <div class="auth-msg" id="msg" role="alert" hidden></div>
          <button class="btn primary big" type="submit">Sign in</button>
          <div class="row small" style="justify-content:space-between"><a href="#forgot">Forgot your password?</a><a href="#signup">New here? Create an account</a></div>
        </form>
        <p class="tiny muted" style="text-align:center"><a href="#welcome">← Back</a></p>`);
      const f = $('#f', main), msg = $('#msg', main);
      bindShow(f);
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = $('#email', f).value.trim(), password = $('#pw', f).value;
        if (!email || !password) return formMsg(msg, 'bad', 'Please enter your email and password.');
        pendingEmail = email;
        busy($('button[type=submit]', f), async () => {
          const { data, error } = await SB.auth.signInWithPassword({ email, password });
          if (error) {
            const unconfirmed = /not confirmed/i.test(error.message || '') || error.code === 'email_not_confirmed';
            formMsg(msg, 'bad', esc(friendlyAuthError(error)) + (unconfirmed ? ' <button type="button" class="btn sm" id="resend">Send the link again</button>' : ''));
            $('#resend', f)?.addEventListener('click', async () => { const r = await SB.auth.resend({ type: 'signup', email, options: { emailRedirectTo: redirectBase() } }); formMsg(msg, r.error ? 'bad' : 'good', esc(r.error ? friendlyAuthError(r.error) : 'Sent! Check your inbox.')); });
            return;
          }
          await ensureAccount(data.session);
          location.hash = 'home';
        });
      });
      return;
    }
    if (h === 'signup') {
      let blocked = false;
      try { blocked = sessionStorage.getItem('codelab.ageCheck') === 'no'; } catch (e) {}
      if (blocked) {
        main.innerHTML = authShell(`<div class="card auth-card" style="text-align:center"><h2>Thanks for your interest!</h2>
          <p>You can’t create a CodeLab account right now. You can still explore and practice: your progress will stay on this device.</p>
          <div class="col-btns"><button class="btn primary big" id="guestBtn">Explore without an account</button><a class="btn" href="#welcome">Back</a></div></div>`);
        $('#guestBtn', main).addEventListener('click', () => { setGuest(true); location.hash = 'home'; });
        return;
      }
      const now = new Date();
      const years = Array.from({ length: 90 }, (_, i) => now.getFullYear() - i);
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      main.innerHTML = authShell(`
        <form class="card auth-card" id="age" novalidate>
          <div class="eyebrow">Step 1 of 2</div>
          <h2>When were you born?</h2>
          <p class="small muted">We use this once to set up your account. We don’t save your birthday.</p>
          <div class="row" style="flex-wrap:nowrap">
            <label class="field" style="flex:1"><span>Month</span><select id="bm" required><option value="">Month</option>${months.map((m, i) => `<option value="${i + 1}">${m}</option>`).join('')}</select></label>
            <label class="field" style="flex:1"><span>Year</span><select id="by" required><option value="">Year</option>${years.map((y) => `<option>${y}</option>`).join('')}</select></label>
          </div>
          <div class="auth-msg" id="amsg" role="alert" hidden></div>
          <button class="btn primary big" type="submit">Continue</button>
          <p class="small" style="text-align:center">Already have an account? <a href="#signin">Sign in</a></p>
        </form>
        <form class="card auth-card" id="f" novalidate hidden>
          <div class="eyebrow">Step 2 of 2</div>
          <h2>Create your account</h2>
          <label class="field"><span>Nickname</span><input id="nick" maxlength="40" autocomplete="nickname" required placeholder="What should we call you?"><small class="muted">No need to use your full real name.</small></label>
          <label class="field"><span>Email</span><input id="email" type="email" autocomplete="email" required></label>
          ${pwField('pw', 'Password (at least 8 characters)', 'new-password')}
          <fieldset class="field"><legend>How do you like to learn?</legend>
            <div class="choice-row">
              <label class="choice"><input type="radio" name="lvl" value="simple" checked><b>🧩 Simple steps</b><span>Short cards, one idea at a time. Great for starting out.</span></label>
              <label class="choice"><input type="radio" name="lvl" value="detailed"><b>📘 Full lessons</b><span>Everything at once, with more technical words.</span></label>
            </div>
            <small class="muted">You can change this any time.</small>
          </fieldset>
          <div class="auth-msg" id="msg" role="alert" hidden></div>
          <button class="btn primary big" type="submit">Create account</button>
        </form>`);
      const age = $('#age', main), f = $('#f', main), msg = $('#msg', main);
      bindShow(f);
      age.addEventListener('submit', (e) => {
        e.preventDefault();
        const m = +$('#bm', age).value, y = +$('#by', age).value;
        if (!m || !y) return formMsg($('#amsg', age), 'bad', 'Please choose a month and a year.');
        // Conservative: if the birthday month is this month or later, assume it hasn't happened yet this year.
        const ageYears = now.getFullYear() - y - (now.getMonth() + 1 <= m ? 1 : 0);
        if (ageYears < 13) {
          try { sessionStorage.setItem('codelab.ageCheck', 'no'); } catch (e2) {}
          return viewAuth(main, 'signup');
        }
        age.hidden = true; f.hidden = false; $('#nick', f).focus();
      });
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const nick = $('#nick', f).value.trim(), email = $('#email', f).value.trim(), password = $('#pw', f).value;
        const lvl = (f.querySelector('input[name=lvl]:checked') || {}).value || 'simple';
        if (!nick) return formMsg(msg, 'bad', 'Please choose a nickname.');
        if (!/^\S+@\S+\.\S+$/.test(email)) return formMsg(msg, 'bad', 'Please enter a valid email address.');
        if (password.length < 8) return formMsg(msg, 'bad', 'Your password needs at least 8 characters.');
        if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) return formMsg(msg, 'bad', 'Mix letters and numbers in your password to make it stronger.');
        pendingEmail = email;
        busy($('button[type=submit]', f), async () => {
          const { data, error } = await SB.auth.signUp({ email, password, options: { emailRedirectTo: redirectBase(), data: { display_name: nick, reading_level: lvl, age_13_plus: true } } });
          if (error) return formMsg(msg, 'bad', esc(friendlyAuthError(error)));
          if (data.session) { await ensureAccount(data.session); location.hash = 'home'; }
          else location.hash = 'check-email';
        });
      });
      return;
    }
    if (h === 'check-email') {
      main.innerHTML = authShell(`<div class="card auth-card" style="text-align:center"><div style="font-size:2.6rem">📬</div><h2>Check your email</h2>
        <p>We sent a link to <b>${esc(pendingEmail || 'your email')}</b>. Click it to finish creating your account.</p>
        <p class="small muted">Can’t find it? Check your spam or junk folder. The link works on this device and browser.</p>
        <div class="auth-msg" id="msg" role="alert" hidden></div>
        <div class="col-btns">${pendingEmail ? '<button class="btn" id="resend">Send the link again</button>' : ''}<a class="btn ghost" href="#signin">Back to sign in</a></div></div>`);
      $('#resend', main)?.addEventListener('click', (e) => busy(e.target, async () => {
        const r = await SB.auth.resend({ type: 'signup', email: pendingEmail, options: { emailRedirectTo: redirectBase() } });
        formMsg($('#msg', main), r.error ? 'bad' : 'good', esc(r.error ? friendlyAuthError(r.error) : 'Sent again! It can take a minute to arrive.'));
      }));
      return;
    }
    if (h === 'forgot') {
      main.innerHTML = authShell(`<form class="card auth-card" id="f" novalidate><h2>Reset your password</h2>
        <p class="small muted">Enter your email and we’ll send you a link to choose a new password.</p>
        <label class="field"><span>Email</span><input id="email" type="email" autocomplete="email" required value="${esc(pendingEmail)}"></label>
        <div class="auth-msg" id="msg" role="alert" hidden></div>
        <button class="btn primary big" type="submit">Send reset link</button>
        <p class="small" style="text-align:center"><a href="#signin">Back to sign in</a></p></form>`);
      const f = $('#f', main);
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = $('#email', f).value.trim();
        if (!/^\S+@\S+\.\S+$/.test(email)) return formMsg($('#msg', f), 'bad', 'Please enter a valid email address.');
        busy($('button[type=submit]', f), async () => {
          const { error } = await SB.auth.resetPasswordForEmail(email, { redirectTo: redirectBase() });
          // Same message whether or not the account exists, so the form can't be used to look up emails.
          formMsg($('#msg', f), error && !/not found/i.test(error.message) ? 'bad' : 'good', esc(error && !/not found/i.test(error.message) ? friendlyAuthError(error) : 'If there’s an account with that email, a reset link is on its way. Open it on this device.'));
        });
      });
      return;
    }
    if (h === 'new-password') {
      if (!session) { main.innerHTML = authShell(`<div class="card auth-card"><h2>This reset link has expired</h2><p>Reset links only work once and for a short time.</p><a class="btn primary big" href="#forgot">Send a new link</a></div>`); return; }
      main.innerHTML = authShell(`<form class="card auth-card" id="f" novalidate><h2>Choose a new password</h2>
        ${pwField('pw', 'New password (at least 8 characters)', 'new-password')}
        <div class="auth-msg" id="msg" role="alert" hidden></div>
        <button class="btn primary big" type="submit">Save new password</button></form>`);
      const f = $('#f', main); bindShow(f);
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = $('#pw', f).value;
        if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) return formMsg($('#msg', f), 'bad', 'Use at least 8 characters with letters and numbers.');
        busy($('button[type=submit]', f), async () => {
          const { error } = await SB.auth.updateUser({ password });
          if (error) return formMsg($('#msg', f), 'bad', esc(friendlyAuthError(error)));
          toast('Password updated. You’re signed in.');
          location.hash = 'home';
        });
      });
    }
  }

  function viewAccount(main) {
    const email = session.user.email || '';
    main.innerHTML = `<div class="crumbs"><a href="#home">Dashboard</a> / My account</div><h1>My account</h1>
      <div class="grid g2">
        <form class="card" id="pf"><h3>Profile</h3>
          <label class="field"><span>Nickname</span><input id="nick" maxlength="40" value="${esc(profile?.display_name || '')}"></label>
          <label class="field"><span>Email</span><input value="${esc(email)}" disabled></label>
          <div class="row"><button class="btn primary" type="submit">Save</button><span class="tiny muted" id="pfm"></span></div>
        </form>
        <div class="card"><h3>Lesson style</h3><div class="tabs" id="level">${[['simple', 'Simple steps'], ['detailed', 'Full lessons']].map(([v, n]) => `<button data-v="${v}" class="${S.settings.level === v ? 'on' : ''}">${n}</button>`).join('')}</div>
          <p class="small muted">Simple steps show one short idea at a time. Full lessons show everything at once.</p></div>
        <form class="card" id="pwf"><h3>Change password</h3>${pwField('pw', 'New password', 'new-password')}
          <div class="row"><button class="btn" type="submit">Update password</button><span class="tiny muted" id="pwm"></span></div></form>
        <div class="card"><h3>Your data</h3>
          <p class="small muted">CodeLab stores your nickname, email, and learning progress (XP, lesson answers, code and notes). Nothing else. Your birthday was never saved.</p>
          <div class="row"><button class="btn" id="dl">⬇ Download my data</button><button class="btn" id="out">Sign out</button></div>
        </div>
        <div class="card danger"><h3>Delete my account</h3>
          <p class="small">This permanently deletes your account, progress, code and notes. It can’t be undone.</p>
          <button class="btn" id="del" style="color:var(--bad);border-color:var(--bad)">Delete my account…</button>
        </div>
      </div>`;
    bindShow($('#pwf', main));
    $('#level', main).addEventListener('click', (e) => { const b = e.target.closest('[data-v]'); if (b) { setLevel(b.dataset.v); viewAccount(main); } });
    $('#pf', main).addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = $('#nick', main).value.trim().slice(0, 40);
      if (!name) return ($('#pfm', main).textContent = 'Nickname can’t be empty.');
      const { error } = await SB.from('profiles').update({ display_name: name, updated_at: new Date().toISOString() }).eq('id', session.user.id);
      if (error) { $('#pfm', main).textContent = friendlyAuthError(error); return; }
      profile.display_name = name; $('#pfm', main).textContent = 'Saved.'; renderSide();
    });
    $('#pwf', main).addEventListener('submit', async (e) => {
      e.preventDefault();
      const password = $('#pw', main).value;
      if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) return ($('#pwm', main).textContent = 'Use at least 8 characters with letters and numbers.');
      const { error } = await SB.auth.updateUser({ password });
      $('#pwm', main).textContent = error ? friendlyAuthError(error) : 'Password updated.';
      if (!error) $('#pw', main).value = '';
    });
    $('#dl', main).addEventListener('click', () => {
      const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), account: { email, nickname: profile?.display_name }, progress: S }, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'codelab-my-data.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    });
    $('#out', main).addEventListener('click', signOut);
    $('#del', main).addEventListener('click', async () => {
      const go = await modal('Delete your account?', '<p>This permanently deletes your account, progress, code and notes.</p><label class="field"><span>Type <b>DELETE</b> to confirm</span><input autocomplete="off"></label>', [{ label: 'Cancel', value: false }, { label: 'Delete forever', value: true, primary: true }]);
      if (!go) return;
      if (modal.lastText.trim().toUpperCase() !== 'DELETE') { toast('Not deleted: you didn’t type DELETE'); return; }
      const { error } = await SB.rpc('delete_my_account');
      if (error) { toast(esc(friendlyAuthError(error))); return; }
      try { await SB.auth.signOut({ scope: 'local' }); } catch (e2) {}
      endAccount();
      location.hash = 'welcome';
      render();
      toast('Your account was deleted.');
    });
  }

  /* ---------------- router ---------------- */
  const AUTH_VIEWS = ['welcome', 'signin', 'signup', 'forgot', 'new-password', 'check-email'];
  function render() {
    disposeReact();
    applyTheme();
    let h = location.hash.slice(1) || 'home';
    if (SB && !session && !isGuest() && !AUTH_VIEWS.includes(h)) { h = 'welcome'; history.replaceState(null, '', '#welcome'); }
    if (SB && session && AUTH_VIEWS.includes(h) && h !== 'new-password') { h = 'home'; history.replaceState(null, '', '#home'); }
    const main = $('#main');
    main.scrollTop = 0; window.scrollTo(0, 0);
    if (SB && AUTH_VIEWS.includes(h)) {
      document.body.classList.add('auth-mode');
      viewAuth(main, h);
      document.title = 'CodeLab: Learn to code';
      return;
    }
    document.body.classList.remove('auth-mode');
    renderSide();
    if (h === 'account' && SB && session) viewAccount(main);
    else if (h.startsWith('lesson-')) viewLesson(main, h.slice(7));
    else if (h.startsWith('track-')) viewTrack(main, h.slice(6));
    else if (h === 'review') viewReview(main);
    else if (h === 'playground') viewPlayground(main);
    else if (h === 'notes') viewNotes(main);
    else if (h === 'settings') viewSettings(main);
    else viewHome(main);
    $('#side').classList.remove('open');
    const title = h.startsWith('lesson-') && LESSON[h.slice(7)] ? LESSON[h.slice(7)].title + ' · CodeLab' : 'CodeLab: Learn by Doing';
    document.title = title;
  }
  window.addEventListener('hashchange', render);
  $('#menuBtn').addEventListener('click', () => $('#side').classList.toggle('open'));
  window.matchMedia && matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', applyTheme);
  window.addEventListener('beforeunload', () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} });

  if (typeof CodeMirror === 'undefined') {
    $('#main').innerHTML = '<div class="card"><h2>Could not load the code editor</h2><p>Check your connection and reload the page.</p></div>';
    return;
  }
  (async function boot() {
    if (SB) {
      SB.auth.onAuthStateChange((event, sess) => {
        // Supabase recommends not awaiting other Supabase calls inside this callback; defer the work.
        setTimeout(async () => {
          if (event === 'PASSWORD_RECOVERY') { if (sess) await ensureAccount(sess); location.hash = 'new-password'; render(); return; }
          if (event === 'SIGNED_IN' && sess && (!session || session.user.id !== sess.user.id)) {
            await ensureAccount(sess);
            cleanAuthUrl();
            if (AUTH_VIEWS.includes(location.hash.slice(1)) || !location.hash) location.hash = 'home';
            render();
          } else if (event === 'SIGNED_OUT' && session) { endAccount(); location.hash = 'welcome'; render(); }
          else if ((event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') && sess) session = sess;
        }, 0);
      });
      try {
        const { data } = await SB.auth.getSession();
        if (data.session) await ensureAccount(data.session);
      } catch (e) { console.warn('session restore failed', e); }
      cleanAuthUrl();
      render();
    } else {
      render();
      initDb();
    }
  })();
})();
