/* m-translate.at – Hauptskript
   Baut Kopfzeile und Fußzeile aus config.js, schaltet die Sprache um (inkl. Schreibrichtung),
   steuert das Menü und versendet das Kontaktformular.
   Texte stehen in assets/lang/*.js, Daten in assets/js/config.js. */
(() => {
  'use strict';
  const S = window.SITE;
  const D = (window.I18N = window.I18N || {});
  const $ = (q, r = document) => r.querySelector(q);
  const $$ = (q, r = document) => [...r.querySelectorAll(q)];
  const de = k => (D.de && D.de[k]) || '';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const tel = n => 'tel:' + n.replace(/[^+\d]/g, '');
  const tx = (tag, key, attrs = '') => `<${tag} ${attrs} data-i18n="${key}">${de(key)}</${tag}>`;

  const ICONS = {
    doc: 'M7 3h8l4 4v14H7z M15 3v4h4 M10 12h6 M10 16h6',
    scale: 'M12 3v18 M6 21h12 M5 7h14 M5 7l-3 7a3 3 0 0 0 6 0z M19 7l-3 7a3 3 0 0 0 6 0z',
    chat: 'M4 5h16v11H9l-5 4z',
    globe: 'M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18',
    pulse: 'M3 12h4l2-6 4 12 2-6h6',
    spark: 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z',
    phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
    mail: 'M3 6h18v12H3z M3 7l9 7 9-7',
    pin: 'M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z M12 7a3 3 0 1 0 0 6a3 3 0 0 0 0-6z',
    clock: 'M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z M12 7v5l3 2'
  };
  const icon = n => ICONS[n] ? `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[n]}"/></svg>` : '';
  const caret = '<svg class="ico caret" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  const burger = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';

  const slug = h => h.replace(/[#?].*$/, '').replace(/\.html$/, '');
  const cur = slug(location.pathname.split('/').pop() || 'index') || 'index';
  const A = S.address;

  /* ---------- Kopfzeile ---------- */
  const navItem = i => i.children
    ? `<li class="has-sub"><button type="button" class="sub-btn" aria-expanded="false">${tx('span', i.key)}${caret}</button><ul class="sub">${i.children.map(navItem).join('')}</ul></li>`
    : `<li><a${i.cta ? ' class="cta-link"' : ''} href="${i.href}"${slug(i.href) === cur ? ' aria-current="page"' : ''} data-i18n="${i.key}">${de(i.key)}</a></li>`;

  $('#site-header').innerHTML = `<div class="wrap bar">
    <a class="brand" href="index.html"><b>${esc(S.name)}</b>${tx('small', 'brand.sub')}</a>
    <nav class="nav" id="nav" aria-label="Navigation"><ul>${S.nav.map(navItem).join('')}</ul></nav>
    <div class="langs" role="group" aria-label="Sprache / Language / اللغة">${S.languages.map(l => `<button type="button" data-lang="${l.code}" lang="${l.code}" aria-pressed="false">${esc(l.short)}</button>`).join('')}</div>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav" data-i18n-attr="aria-label:nav.menu" aria-label="${esc(de('nav.menu'))}">${burger}</button>
  </div>`;
  $$('.has-sub').forEach(li => { if ($('[aria-current]', li)) li.classList.add('current'); });

  /* ---------- Kontaktdaten & Fußzeile ---------- */
  const row = (ic, key, html) => `<li>${icon(ic)}<span>${tx('span', key, 'class="lbl"')}${html}</span></li>`;
  const contactList = () => [
    row('pin', 'c.address', `${esc(A.street)}<br>${esc(A.zip)} ${esc(A.city)}, ${esc(A.country)}`),
    row('phone', 'c.phone', `<a class="ltr" href="${tel(S.phone)}">${esc(S.phone)}</a>`),
    row('phone', 'c.mobile', `<a class="ltr" href="${tel(S.mobile)}">${esc(S.mobile)}</a>`),
    row('mail', 'c.email', `<a class="ltr" href="mailto:${esc(S.email)}">${esc(S.email)}</a>`),
    de('site.hours') ? row('clock', 'c.hours', tx('span', 'site.hours')) : ''
  ].join('');
  const flat = a => a.flatMap(i => i.children ? flat(i.children) : [i]);
  const link = i => `<li><a href="${i.href}" data-i18n="${i.key}">${de(i.key)}</a></li>`;

  $('#site-footer').innerHTML = `<div class="wrap"><div class="fgrid">
    <div><h2>${esc(S.name)}</h2>${tx('p', 'footer.about')}</div>
    <div>${tx('h2', 'footer.pages')}<ul>${flat(S.nav).map(link).join('')}</ul></div>
    <div>${tx('h2', 'footer.contact')}<ul class="info">${contactList()}</ul></div>
    <div>${tx('h2', 'footer.legal')}<ul>${S.legal.map(link).join('')}</ul></div>
  </div>
  <div class="fbase"><span>© ${new Date().getFullYear()} ${esc(S.name)}</span><span>GISA ${esc(S.gisa)}</span><span>UID ${esc(S.uid)}</span>${tx('span', 'footer.legalnote')}</div></div>`;

  /* ---------- Dynamische Bereiche auf den Seiten ---------- */
  $$('[data-contact]').forEach(el => { el.innerHTML = contactList(); });
  $$('[data-services]').forEach(el => {
    const n = +el.dataset.limit || S.services.length;
    el.innerHTML = S.services.slice(0, n).map(s => `<div class="svc"><span class="ico-wrap">${icon(s.icon)}</span><div>${tx('h3', `svc.${s.id}.t`)}${tx('p', `svc.${s.id}.d`)}</div></div>`).join('');
  });
  $$('[data-gallery]').forEach(el => {
    el.innerHTML = S.gallery.map(g => `<figure><img${g.fit === 'contain' ? ' class="contain"' : ''} src="${esc(g.src)}" alt="${esc(de(g.key))}" data-i18n-attr="alt:${g.key}" loading="lazy" decoding="async">${tx('figcaption', g.key)}</figure>`).join('');
  });
  const sel = $('#service');
  if (sel) {
    const opt = (v, k) => `<option value="${esc(v)}" data-i18n="${k}">${esc(de(k))}</option>`;
    sel.innerHTML = `<option value="" disabled selected data-i18n="form.choose">${esc(de('form.choose'))}</option>`
      + S.services.map(s => opt(de(`svc.${s.id}.t`), `svc.${s.id}.t`)).join('')
      + opt('Sonstiges', 'svc.other.opt');
  }
  $$('i[data-icon]').forEach(el => { el.outerHTML = icon(el.dataset.icon); });
  $$('[data-call]').forEach(a => { a.href = tel(S.mobile); });
  const vals = { name: S.name, phone: S.phone, mobile: S.mobile, email: S.email, gisa: S.gisa, uid: S.uid, street: A.street, zip: A.zip, city: A.city, domain: S.domain };
  $$('[data-site]').forEach(el => {
    const k = el.dataset.site, v = vals[k];
    if (v == null) return;
    el.textContent = v;
    if (el.tagName === 'A') el.href = k === 'email' ? 'mailto:' + v : (k === 'phone' || k === 'mobile') ? tel(v) : v;
  });

  /* ---------- Sprache ---------- */
  const codes = S.languages.map(l => l.code);
  let lang = 'de';

  function apply(l) {
    lang = l;
    const meta = S.languages.find(x => x.code === l) || S.languages[0];
    document.documentElement.lang = l;
    document.documentElement.dir = meta.dir || 'ltr';
    $$('[data-i18n]').forEach(el => {
      if (el._de === undefined) el._de = el.innerHTML;       // deutsche Ausgangsfassung merken
      el.innerHTML = l === 'de' ? el._de : ((D[l] && D[l][el.dataset.i18n]) ?? el._de);
    });
    $$('[data-i18n-attr]').forEach(el => {
      el._dea = el._dea || {};
      el.dataset.i18nAttr.split(';').forEach(p => {
        const [a, k] = p.split(':');
        if (!(a in el._dea)) el._dea[a] = el.getAttribute(a) || '';
        el.setAttribute(a, l === 'de' ? el._dea[a] : ((D[l] && D[l][k]) ?? el._dea[a]));
      });
    });
    $$('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
  }
  const load = code => new Promise(res => {
    if (code === 'de' || D[code]) return res();
    const s = document.createElement('script');
    s.src = `assets/lang/${code}.js`;
    s.onload = s.onerror = () => res();
    document.head.appendChild(s);
  });
  async function setLang(code, save = true) {
    if (!codes.includes(code)) code = S.defaultLang;
    await load(code);
    apply(code);
    if (save) { try { localStorage.setItem('lang', code); } catch (e) { /* ignorieren */ } }
  }
  function pick() {
    const q = new URLSearchParams(location.search).get('lang');
    if (codes.includes(q)) return q;
    try { const s = localStorage.getItem('lang'); if (codes.includes(s)) return s; } catch (e) { /* ignorieren */ }
    if (S.autoDetect) {
      const n = (navigator.languages || [navigator.language || '']).map(x => x.slice(0, 2).toLowerCase()).find(x => codes.includes(x));
      if (n) return n;
    }
    return S.defaultLang;
  }
  $$('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  setLang(pick(), false);

  /* ---------- Menü ---------- */
  const hdr = $('#site-header');
  const toggle = $('.nav-toggle');
  const closeSubs = () => $$('.has-sub.open').forEach(li => { li.classList.remove('open'); li.firstElementChild.setAttribute('aria-expanded', 'false'); });
  toggle.addEventListener('click', () => toggle.setAttribute('aria-expanded', String(hdr.classList.toggle('nav-open'))));
  $$('.sub-btn').forEach(b => b.addEventListener('click', () => {
    const li = b.parentElement, open = !li.classList.contains('open');
    closeSubs();
    li.classList.toggle('open', open);
    b.setAttribute('aria-expanded', String(open));
  }));
  $$('.nav a').forEach(a => a.addEventListener('click', () => { hdr.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); }));
  document.addEventListener('click', e => { if (!e.target.closest('.has-sub')) closeSubs(); });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeSubs(); hdr.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false');
  });

  /* ---------- Kontaktformular (Web3Forms, ohne eigenen Server) ---------- */
  const form = $('#contact-form');
  if (form) {
    form.elements.access_key.value = S.formKey;
    const st = $('#form-status'), btn = $('button[type="submit"]', form);
    const show = k => {
      st.className = 'status ' + k;
      st.dataset.i18n = 'form.' + k;
      delete st._de;
      st.innerHTML = de('form.' + k);
      apply(lang);
    };
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (form.elements.botcheck.checked) return;            // Spam-Falle (Honeypot)
      btn.disabled = true;
      try {
        const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
        const j = await r.json();
        if (!r.ok || !j.success) throw new Error('send');
        form.reset();
        show('ok');
      } catch (err) { show('err'); }
      btn.disabled = false;
    });
  }
})();
