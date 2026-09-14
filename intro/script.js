const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

// Cursor atmosphere: intentionally tiny and inexpensive.
const glow = $('.cursor-glow');
window.addEventListener('pointermove', e => { glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; }, {passive:true});

// Product-tour reveal and section progress.
const sections = $$('main > section');
const railCurrent = $('#railCurrent');
const railFill = $('.rail-line i');
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    const n = entry.target.dataset.index;
    if (n) { railCurrent.textContent = n; railFill.style.height = `${(Number(n) / 6) * 100}%`; }
  }
}), {threshold:.18});
sections.forEach(section => observer.observe(section));

$$('[data-scroll]').forEach(button => button.addEventListener('click', () => $(button.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));

// Command typing loop in the hero.
const commandEl = $('#typedCommand');
const commands = ['open youtube', 'open youtube hlo', '! gh nextengine', 'music'];
let commandIndex = 0, charIndex = 0, deleting = false;
function typeCommand(){
  const word = commands[commandIndex];
  commandEl.textContent = deleting ? word.slice(0, charIndex--) : word.slice(0, charIndex++);
  let delay = deleting ? 38 : 72;
  if (!deleting && charIndex > word.length) { deleting = true; delay = 1400; }
  if (deleting && charIndex < 0) { deleting = false; commandIndex = (commandIndex + 1) % commands.length; charIndex = 0; delay = 320; }
  setTimeout(typeCommand, delay);
}
typeCommand();

// Command demo buttons update the console copy.
$$('.command-chip').forEach(chip => chip.addEventListener('click', () => {
  const old = chip.textContent;
  chip.textContent = '✓ ' + chip.dataset.command;
  chip.style.borderColor = 'var(--green)';
  setTimeout(() => { chip.textContent = old; chip.style.borderColor = ''; }, 1200);
}));

// Reader mode demonstration.
const readerToggle = $('[data-toggle="reader"]');
readerToggle.addEventListener('click', () => {
  readerToggle.classList.toggle('active');
  $('#readerPreview').classList.toggle('reader');
  $('#readerState').textContent = readerToggle.classList.contains('active') ? 'CLEAN READING EXPERIENCE' : 'CLUTTERED ARTICLE';
});

// Theme demonstration.
$$('.theme-btn').forEach(btn => btn.addEventListener('click', () => {
  $$('.theme-btn').forEach(item => item.classList.remove('active'));
  btn.classList.add('active');
  const demo = $('#themeDemo');
  demo.classList.remove('light','night');
  if (btn.dataset.theme !== 'dark') demo.classList.add(btn.dataset.theme);
}));

// AI response delight.
$('#askAi').addEventListener('click', () => {
  const response = $('#aiResponse');
  response.animate([{opacity:.35, transform:'translateY(6px)'},{opacity:1, transform:'translateY(0)'}], {duration:420, easing:'cubic-bezier(.23,1,.32,1)'});
  response.querySelector('p').textContent = 'The signal is clear: NextEngine gives your attention back by turning browsing into a deliberate, intelligent flow.';
  $('#askAi').innerHTML = 'Context understood <span>✓</span>';
});

// Command information modal.
const modal = $('#modal');
$$('[data-open="commands"]').forEach(btn => btn.addEventListener('click', () => { modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); }));
$('#modalClose').addEventListener('click', () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); });
modal.addEventListener('click', e => { if (e.target === modal) $('#modalClose').click(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') $('#modalClose').click(); });


// Feature block interactions
$$('.demo-tab').forEach(tab => tab.addEventListener('click', () => {
  $$('.demo-tab').forEach(t => t.classList.remove('active')); tab.classList.add('active');
}));
$$('.mini-switch').forEach(sw => sw.addEventListener('click', () => sw.classList.toggle('active')));
$$('.bang-row').forEach(row => row.addEventListener('click', () => {
  $$('.bang-row').forEach(r => r.classList.remove('active')); row.classList.add('active');
  const bang = row.dataset.bang;
  const labels = {yt:'YouTube search', gh:'GitHub search', mdn:'MDN search'};
  $('#bangResult').textContent = `!${bang} ${bang === 'gh' ? 'nextengine' : bang === 'mdn' ? 'web api' : 'cats'}`;
  $('#bangResult').nextElementSibling.textContent = `→ ${labels[bang]}`;
}));
$('#downloadPulse').addEventListener('click', () => {
  const button = $('#downloadPulse'); button.textContent = 'Downloads opened ✓'; button.style.color = 'var(--green)';
  setTimeout(() => { button.textContent = 'Open Downloads'; button.style.color = ''; }, 1500);
});
$('#focusToggle').addEventListener('click', () => {
  const toggle = $('#focusToggle'), block = $('.focus-block'); toggle.classList.toggle('active'); block.classList.toggle('is-focused');
  $('#focusState').textContent = toggle.classList.contains('active') ? 'FOCUS MODE ON' : 'FOCUS READY';
});
$('#revealPassword').addEventListener('click', e => { const field = e.target.previousElementSibling; field.textContent = field.textContent.startsWith('•') ? '••••••••••••' : '••••••••••••'; e.target.textContent = 'VIEW'; });
$$('.proxy-choice').forEach(choice => choice.addEventListener('click', () => {
  $$('.proxy-choice').forEach(c => c.classList.remove('active')); choice.classList.add('active'); $('#proxyMode').textContent = choice.dataset.proxy;
}));
setInterval(() => { const count = $('#blockedCount'); if (count) count.textContent = (1284 + Math.floor(Date.now()/1000)%17).toLocaleString(); }, 2500);
