// Project filters, project detail dialog, and alternate cart interactions.
const filters = document.querySelectorAll('.filter');
const cards = [...document.querySelectorAll('.project-card')];
filters.forEach(filter => filter.addEventListener('click', () => {
  filters.forEach(item => item.classList.toggle('active', item === filter));
  const value = filter.dataset.filter;
  cards.forEach(card => { card.hidden = value !== 'all' && card.dataset.category !== value; });
}));
const modal = document.getElementById('projectModal');
const closeModal = () => { modal.classList.remove('open'); document.body.style.overflow = ''; };
cards.forEach(card => card.addEventListener('click', () => {
  document.getElementById('modalType').textContent = card.dataset.type;
  document.getElementById('modalTitle').textContent = card.dataset.title;
  document.getElementById('modalDesc').textContent = card.dataset.desc;
  document.getElementById('modalTools').textContent = card.dataset.tools;
  modal.classList.add('open'); document.body.style.overflow = 'hidden'; document.getElementById('modalClose').focus();
}));
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
document.querySelectorAll('.cart-tile').forEach(tile => tile.addEventListener('click', () => {
  document.getElementById('modalType').textContent = tile.dataset.type;
  document.getElementById('modalTitle').textContent = tile.dataset.title;
  document.getElementById('modalDesc').textContent = tile.dataset.desc;
  document.getElementById('modalTools').textContent = tile.dataset.tools;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalClose').focus();
}));
document.getElementById('printBtn').addEventListener('click', () => window.print());

// CV trolley and receipt dialog.
const billModal = document.getElementById('billModal');
function closeBill() { billModal.classList.remove('open'); document.body.style.overflow = ''; }
document.querySelectorAll('.textile-item').forEach(item => item.addEventListener('click', () => {
  document.getElementById('billItem').textContent = item.dataset.item.toUpperCase();
  const billTitles = { PROFILE: 'The Designer', SKILLS: 'Skills & Tools', EDUCATION: 'Education', EXPERIENCE: 'Experience', PROJECTS: 'Selected Work', CONTACT: 'Get in Touch' };
  document.getElementById('billTitle').textContent = billTitles[item.dataset.section] || 'Vanshika Makheja';
  document.querySelectorAll('.bill-section').forEach(section => section.classList.toggle('active', section.dataset.section === item.dataset.section));
  billModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('billClose').focus();
}));
document.getElementById('billClose').addEventListener('click', closeBill);
document.getElementById('billCloseBottom').addEventListener('click', closeBill);
billModal.addEventListener('click', event => { if (event.target === billModal) closeBill(); });
document.getElementById('billPrint').addEventListener('click', () => window.print());
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeBill(); });
const toast = document.getElementById('toast');
function showToast(message) { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2100); }

// Contact actions and footer details.
document.getElementById('emailBtn').addEventListener('click', async () => {
  const email = document.getElementById('emailLink').textContent.trim();
  try { await navigator.clipboard.writeText(email); showToast('Email copied to clipboard'); }
  catch { showToast('Sample email: ' + email); }
});
document.getElementById('year').textContent = new Date().getFullYear();
