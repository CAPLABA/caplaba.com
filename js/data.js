// -----------------------------------------------------------
// SINGLE SOURCE OF TRUTH for socials, categories, log entries,
// and About-page content (experience/education/publications).
//
// This is the file you edit day to day. Nothing in the HTML
// or the rest of main.js needs to change when you add,
// rename, or remove something here.
// -----------------------------------------------------------

// -----------------------------------------------------------
// SOCIAL LINKS — Home hero + footer on every page + Contact list
// -----------------------------------------------------------
const SOCIALS = [
  { name: 'Instagram', url: 'https://www.instagram.com/ca_pla_ba/' },
  { name: 'YouTube',   url: 'https://www.youtube.com/@carlosbaeza3200' },
  { name: 'TikTok',    url: 'https://www.tiktok.com/@ca_pla_ba' },
  { name: 'Behance',   url: 'https://www.behance.net/carlosbaeza10' },
  { name: 'Pinterest', url: 'https://pin.it/4atjr7wv4' },
  { name: 'Facebook',  url: 'https://www.facebook.com/caplaba/' },
];

// -----------------------------------------------------------
// CATEGORIES ("pursuit" tags)
//   slug        stable id — never changes even if you rename "name"
//   name        label shown on screen
//   color       accent color for this category's dot
//   description shown in the "About the tags" section
// -----------------------------------------------------------
const CATEGORIES = [
  { slug: 'language-learning', name: 'Language Learning',           color: '#3B5BA5', description: 'Studying and practicing new languages — grammar, vocabulary, and real conversation.' },
  { slug: 'human-body',        name: 'Human Body Capabilities',     color: '#3F7859', description: 'Physical training: strength, mobility, and endurance work.' },
  { slug: 'biology',           name: 'Biology',                     color: '#1F7A6C', description: 'Understanding how living systems work, from nutrition to physiology.' },
  { slug: 'coding',            name: 'Coding',                      color: '#4B5563', description: 'Software projects, tools, and technical experiments — including this site.' },
  { slug: 'artistic-craft',    name: 'Artistic Craft',              color: '#B23A6B', description: 'Drawing, music, writing, or any hands-on creative practice.' },
  { slug: 'traveling',         name: 'Traveling and Exploring',     color: '#C4772B', description: 'New places, cultures, and what being somewhere unfamiliar teaches.' },
  { slug: 'reading',           name: 'Reading',                     color: '#7A4FA0', description: 'Books and long-form writing, plus notes on what stuck.' },
  { slug: 'mind',              name: 'Mind Capabilities',           color: '#8A5A44', description: 'Memory, focus, meditation, and other mental training.' },
  { slug: 'communication',     name: 'Communication Capabilities',  color: '#2E8FA3', description: 'Public speaking, writing clearly, and connecting with people.' },
];

// -----------------------------------------------------------
// ENTRIES
// Order in this array doesn't matter — main.js always sorts
// by "date" so the newest entry shows first, automatically.
//
// Required:  date ("YYYY-MM-DD"), category (a slug above), title, description
// Optional:  image  — path to a picture, e.g. "assets/images/chair-design.jpg"
//            link   — a URL (another page, or a social/external link);
//                      the title becomes clickable and opens it
// Leave "image" and/or "link" out entirely for entries that don't need them.
// -----------------------------------------------------------
const ENTRIES = [
  { date: '2026-07-20', category: 'language-learning', title: 'Communauté Francophone Contactée', description: 'Rencontre de francophones organisée par le groupe « Quoi de neuf » à Mérida' },
  { date: '2026-07-26', category: 'coding', title: 'Built and shipped the Caplaba site from scratch', description: 'Plain HTML, CSS and JavaScript — no framework, so every line is readable.' },
  { date: '2026-07-11', category: 'traveling', title: 'Camping trip to San Crisanto - Yucatán', description: 'Campamento Ejidal manejado por la comunidad - Visita al Manglar' },
  { date: '2026-06-29', category: 'human-body', title: 'Handstand Training', description: 'Dos semanas de ejercicios progresivos para conseguir Handstand.' },
  { date: '2026-06-15', category: 'reading', title: 'Currently reading "Homo Sapiens - Yuval Noah Harari"', description: 'The Cognitive Revolution; The Agricultural Revolution; The Scientific Revolution.' },
  { date: '2026-06-02', category: 'biology', title: 'Started using iNaturalist', description: 'Recolectando avistamientos de especies.' },
  { date: '2026-05-30', category: 'human-body', title: 'Ran 6k', description: 'Testing base fitness before starting a structured block.' },
  { date: '2026-05-18', category: 'language-learning', title: 'Subscription to MEL', description: 'Subscribed to Mérida English Library — reading English classics.' },
  { date: '2026-05-10', category: 'mind', title: '30 days of daily meditation', description: 'Ten minutes each night, tracked without exception.' },
  // Example of the optional "link" field: title becomes clickable.
  { date: '2026-04-28', category: 'artistic-craft', title: 'Developing Chair Design', description: 'Chair design for the RIZOMA project, in collaboration with craftsmen from Pichátaro, Michoacán, México.', link: 'https://www.behance.net/carlosbaeza10' },
];

// -----------------------------------------------------------
// ABOUT PAGE — replace with your real information
// -----------------------------------------------------------
const EXPERIENCE = [
  { period: '2024 — Present', title: 'Role / project name', org: 'Organization or self-directed', description: 'One or two sentences on what this involved.' },
  { period: '20XX — 20XX', title: 'Previous role', org: 'Organization', description: 'One or two sentences on what this involved.' },
];

const EDUCATION = [
  { period: '20XX — 20XX', title: 'Degree or program', org: 'Institution' },
];

const PUBLICATIONS = [
  { year: '2026', title: 'Publication or project title', venue: 'Where it appeared', url: '' },
];
