
function changeLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (key === 'logo') {
      element.innerHTML = `<img src="img/logo.png" class="logo-icon" alt="FreelancePro Logo"><span class="logo-text">${translations[lang][key]}</span>`;
    } else {
      element.textContent = translations[lang][key];
    }
  });
  document.documentElement.lang = lang;
  localStorage.setItem('language', lang);
}

function toggleTheme() {
  const theme = document.getElementById('theme-toggle').checked ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function toggleNav() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
  const burgerMenu = document.querySelector('.burger-menu');
  burgerMenu.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.getElementById('theme-toggle').checked = savedTheme === 'dark';
  const savedLang = localStorage.getItem('language') || 'en';
  changeLanguage(savedLang);

  const form = document.getElementById('taskForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskData = {
      title: document.getElementById('taskTitle').value,
      description: document.getElementById('taskDescription').value,
      budget: document.getElementById('taskBudget').value,
      deadline: document.getElementById('taskDeadline').value,
      category: document.getElementById('taskCategory').value
    };
    console.log('Task submitted:', taskData);
    alert(translations[savedLang]['submitSuccess']);
    form.reset();
  });

  document.addEventListener('click', (event) => {
    const navLinks = document.querySelector('.nav-links');
    const burgerMenu = document.querySelector('.burger-menu');
    if (!navLinks.contains(event.target) && !burgerMenu.contains(event.target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      burgerMenu.textContent = '☰';
    }
  });
});