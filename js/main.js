// -----------------------------------------------------------
// Reads SOCIALS, CATEGORIES, ENTRIES, EXPERIENCE, EDUCATION
// and PUBLICATIONS from data.js and builds every dynamic part
// of the site. Nothing here needs editing when you add content —
// that all happens in data.js instead.
// -----------------------------------------------------------

const categoryBySlug = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]));

// How many entries to show at once on the Projects page before
// the person has to click "Load more". Raise or lower freely —
// this is the one place that controls it.
const PAGE_SIZE = 6;

// "Language Learning" -> "Language Learning Tag"
function tagLabel(name) {
  return `${name} Tag`;
}

// "2026-07-20" -> "Date: 2026.07.20"
function formatDate(isoDate) {
  const [y, m, d] = isoDate.split('-');
  return `Date: ${y}.${m}.${d}`;
}

// A link counts as "external" if it points somewhere off this
// site — used to decide whether it opens in a new tab.
function isExternalLink(url) {
  return /^https?:\/\//i.test(url);
}

// -----------------------------------------------------------
// LOG ROW
// Optional entry.image renders a small thumbnail; optional
// entry.link makes the title clickable. Both are skipped
// cleanly when absent — no blank space, no broken markup.
// -----------------------------------------------------------
function renderLogRow(entry) {
  const category = categoryBySlug[entry.category] || { name: entry.category, color: '#9A968A' };

  const imageHtml = entry.image
    ? `<img src="${entry.image}" alt="" class="log-row__image">`
    : '';

  const titleHtml = entry.link
    ? `<a href="${entry.link}" ${isExternalLink(entry.link) ? 'target="_blank" rel="noopener"' : ''}>${entry.title} →</a>`
    : entry.title;

  return `
    <div class="log-row" data-category="${entry.category}">
      <span class="log-row__date">${formatDate(entry.date)}</span>
      <span class="log-row__dot" style="background:${category.color}"></span>
      <div class="log-row__content">
        ${imageHtml}
        <h3 class="log-row__title">${titleHtml}</h3>
        <p class="log-row__desc">${entry.description}</p>
        <span class="log-row__tag">${tagLabel(category.name)}</span>
      </div>
    </div>`;
}

// Always sorts newest-first using real Date comparison
// (robust regardless of the order entries are listed in data.js).
function sortEntriesByDateDesc(entries) {
  return [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
}

// -----------------------------------------------------------
// PAGINATED LOG (Projects page)
// Renders entries in batches of PAGE_SIZE with a "Load more"
// button, instead of dumping the whole list at once. This is
// the scaling strategy: as entries grow into the hundreds,
// the page still opens fast because most rows aren't in the
// DOM until asked for.
// -----------------------------------------------------------
function createPaginatedLog(container, loadMoreButton) {
  let entries = [];
  let shown = 0;

  function renderNextPage() {
    const nextBatch = entries.slice(shown, shown + PAGE_SIZE);
    container.insertAdjacentHTML('beforeend', nextBatch.map(renderLogRow).join(''));
    shown += nextBatch.length;
    loadMoreButton.style.display = shown < entries.length ? 'inline-flex' : 'none';
  }

  loadMoreButton.addEventListener('click', renderNextPage);

  // Called whenever the full list changes (initial load, or a filter click)
  return function setEntries(newEntries) {
    entries = newEntries;
    shown = 0;
    container.innerHTML = '';
    renderNextPage();
  };
}

// Builds the filter buttons and connects them to the paginated log.
function renderFilters(container, setLogEntries, allEntriesSorted) {
  if (!container) return;

  const allButton = `<button class="filter-btn is-active" data-category="all">All</button>`;
  const categoryButtons = CATEGORIES.map((c) => `
    <button class="filter-btn" data-category="${c.slug}">
      <span class="filter-btn__dot" style="background:${c.color}"></span>${tagLabel(c.name)}
    </button>`).join('');

  container.innerHTML = allButton + categoryButtons;

  const buttons = container.querySelectorAll('.filter-btn');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      button.classList.add('is-active');

      const selected = button.dataset.category;
      const filtered = selected === 'all'
        ? allEntriesSorted
        : allEntriesSorted.filter((e) => e.category === selected);

      setLogEntries(filtered);
    });
  });
}

function renderTagsExplainer(container) {
  if (!container) return;
  container.innerHTML = CATEGORIES.map((c) => `
    <div class="tag-explainer-row">
      <div class="tag-explainer-row__label">
        <span class="filter-btn__dot" style="background:${c.color}"></span>
        <span>${tagLabel(c.name)}</span>
      </div>
      <p class="tag-explainer-row__desc">${c.description}</p>
    </div>`).join('');
}

function renderContactSocialRows(container) {
  if (!container) return;
  container.innerHTML = SOCIALS.map((s) => `
    <div class="contact-row">
      <span class="contact-row__label">${s.name}</span>
      <a href="${s.url}" target="_blank" rel="noopener" class="contact-row__value">Visit →</a>
    </div>`).join('');
}

function renderSocialLinks(container) {
  if (!container) return;
  container.innerHTML = SOCIALS.map((s) => `
    <a href="${s.url}" target="_blank" rel="noopener">${s.name}</a>`).join('');
}

// -----------------------------------------------------------
// ABOUT PAGE — Experience, Education, Publications
// -----------------------------------------------------------
function renderCvRows(container, items, { linkable = false } = {}) {
  if (!container) return;
  container.innerHTML = items.map((item) => {
    const title = linkable && item.url
      ? `<a href="${item.url}" target="_blank" rel="noopener">${item.title} →</a>`
      : item.title;
    return `
      <div class="cv-row">
        <span class="cv-row__period">${item.period || item.year}</span>
        <div>
          <h3 class="cv-row__title">${title}</h3>
          <p class="cv-row__org">${item.org || item.venue || ''}</p>
          ${item.description ? `<p class="cv-row__desc">${item.description}</p>` : ''}
        </div>
      </div>`;
  }).join('');
}

// -----------------------------------------------------------
// PAGE WIRING — each page only has the containers it needs;
// anything not found on the current page is simply skipped.
// -----------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const sortedEntries = sortEntriesByDateDesc(ENTRIES);

  // Home: latest 4, no filters, no pagination needed
  const recentContainer = document.getElementById('log-recent');
  if (recentContainer) {
    recentContainer.innerHTML = sortedEntries.slice(0, 4).map(renderLogRow).join('');
  }

  // Projects: full list, filterable, paginated
  const fullContainer = document.getElementById('log-full');
  const loadMoreButton = document.getElementById('load-more');
  if (fullContainer && loadMoreButton) {
    const setLogEntries = createPaginatedLog(fullContainer, loadMoreButton);
    setLogEntries(sortedEntries);
    renderFilters(document.getElementById('filters'), setLogEntries, sortedEntries);
  }

  renderTagsExplainer(document.getElementById('tags-explainer'));

  // About page
  renderCvRows(document.getElementById('experience-list'), EXPERIENCE);
  renderCvRows(document.getElementById('education-list'), EDUCATION);
  renderCvRows(document.getElementById('publications-list'), PUBLICATIONS, { linkable: true });

  // Shared across all pages
  document.querySelectorAll('[data-social-list]').forEach(renderSocialLinks);
  renderContactSocialRows(document.getElementById('contact-social-rows'));
});

// -----------------------------------------------------------
// MOBILE NAV TOGGLE
// -----------------------------------------------------------
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('is-open');
  });
}
