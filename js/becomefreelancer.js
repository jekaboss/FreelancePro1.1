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

function showTab(tabId) {
  document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

function handleSubmit(event) {
  event.preventDefault();
  const formData = {
    name: document.getElementById('freelancerName').value,
    phone: document.getElementById('freelancerPhone').value,
    country: document.getElementById('freelancerCountry').value,
    skills: document.getElementById('freelancerSkills').value
  };
  console.log('Application submitted:', formData);
  alert(`Thank you, ${formData.name}! Your application has been submitted. Check your email for next steps. (Language: ${document.documentElement.lang})`);
  document.getElementById('freelancerForm').reset();
}

function handleRegister(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const phone = document.getElementById('phone').value;
  const gender = document.getElementById('gender').value;
  const country = document.getElementById('country').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match! Please try again.');
    return;
  }

  const formData = { username, phone, gender, country, password };
  console.log('Registration submitted:', formData);
  alert(`Thank you, ${username}! Your registration is complete. Check your email for confirmation. (Language: ${document.documentElement.lang})`);
  document.getElementById('registerForm').reset();
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.getElementById('theme-toggle').checked = savedTheme === 'dark';
  const savedLang = localStorage.getItem('language') || 'en';
  changeLanguage(savedLang);

  document.addEventListener('click', (event) => {
    const navLinks = document.querySelector('.nav-links');
    const burgerMenu = document.querySelector('.burger-menu');
    if (!navLinks.contains(event.target) && !burgerMenu.contains(event.target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      burgerMenu.textContent = '☰';
    }
  });
});