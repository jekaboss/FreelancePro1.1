const translations = {
  uk: {
    logo: "ФрилансПро",
    back: "Повернутися додому",
    postTaskTitle: "Розмістити нове завдання",
    taskTitleLabel: "Назва завдання",
    taskDescriptionLabel: "Опис",
    taskFileLabel: "Завантажити файл або зображення (макс. 10MB)",
    taskBudgetLabel: "Бюджет (грн)",
    taskDeadlineLabel: "Термін виконання (дата)",
    taskCategoryLabel: "Категорія",
    selectCategory: "Оберіть категорію",
    categoryProgramming: "Програмування",
    categoryDesign: "Дизайн",
    categoryMarketing: "Маркетинг",
    categoryWriting: "Тексти",
    categoryVideo: "Відео",
    categoryAudio: "Аудіо",
    categoryPhotography: "Фотографія",
    categoryTranslation: "Переклад",
    categoryDataEntry: "Введення даних",
    categoryGraphicDesign: "Графічний дизайн",
    categoryAnimation: "Анімація",
    categoryVirtualAssistant: "Віртуальний асистент",
    categoryConsulting: "Консультації",
    submitTaskButton: "Подати завдання",
    footerAbout: "Про нас",
    footerTerms: "Умови використання",
    footerSupport: "Підтримка",
    footerPrivacy: "Політика конфіденційності",
    fileSizeError: "Розмір файлу перевищує ліміт 10MB!",
    submitSuccess: "Завдання успішно подано!"
  },
  ru: {
    logo: "ФрилансПро",
    back: "Вернуться домой",
    postTaskTitle: "Разместить новое задание",
    taskTitleLabel: "Название задания",
    taskDescriptionLabel: "Описание",
    taskFileLabel: "Загрузить файл или изображение (макс. 10MB)",
    taskBudgetLabel: "Бюджет (грн)",
    taskDeadlineLabel: "Срок выполнения (дата)",
    taskCategoryLabel: "Категория",
    selectCategory: "Выберите категорию",
    categoryProgramming: "Программирование",
    categoryDesign: "Дизайн",
    categoryMarketing: "Маркетинг",
    categoryWriting: "Тексты",
    categoryVideo: "Видео",
    categoryAudio: "Аудио",
    categoryPhotography: "Фотография",
    categoryTranslation: "Перевод",
    categoryDataEntry: "Ввод данных",
    categoryGraphicDesign: "Графический дизайн",
    categoryAnimation: "Анимация",
    categoryVirtualAssistant: "Виртуальный ассистент",
    categoryConsulting: "Консультации",
    submitTaskButton: "Отправить задание",
    footerAbout: "О нас",
    footerTerms: "Условия использования",
    footerSupport: "Поддержка",
    footerPrivacy: "Политика конфиденциальности",
    fileSizeError: "Размер файла превышает лимит 10MB!",
    submitSuccess: "Задание успешно отправлено!"
  },
  en: {
    logo: "FreelancePro",
    back: "Back to Home",
    postTaskTitle: "Post a New Task",
    taskTitleLabel: "Task Title",
    taskDescriptionLabel: "Description",
    taskFileLabel: "Upload File or Image (max 10MB)",
    taskBudgetLabel: "Budget (UAH)",
    taskDeadlineLabel: "Deadline (Date)",
    taskCategoryLabel: "Category",
    selectCategory: "Select Category",
    categoryProgramming: "Programming",
    categoryDesign: "Design",
    categoryMarketing: "Marketing",
    categoryWriting: "Writing",
    categoryVideo: "Video",
    categoryAudio: "Audio",
    categoryPhotography: "Photography",
    categoryTranslation: "Translation",
    categoryDataEntry: "Data Entry",
    categoryGraphicDesign: "Graphic Design",
    categoryAnimation: "Animation",
    categoryVirtualAssistant: "Virtual Assistant",
    categoryConsulting: "Consulting",
    submitTaskButton: "Submit Task",
    footerAbout: "About Us",
    footerTerms: "Terms of Use",
    footerSupport: "Support",
    footerPrivacy: "Privacy Policy",
    fileSizeError: "File size exceeds 10MB limit!",
    submitSuccess: "Task submitted successfully!"
  }
};

function changeLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (key === 'logo') {
      element.innerHTML = `<img src="logo.png" class="logo-icon" alt="FreelancePro Logo"><span class="logo-text">${translations[lang][key]}</span>`;
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

function updateFileList() {
  const fileInput = document.getElementById('taskFile');
  const uploadedFilesDiv = document.getElementById('uploadedFiles');
  const files = fileInput.files;

  uploadedFilesDiv.innerHTML = '';
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const p = document.createElement('p');
      p.textContent = files[i].name;
      uploadedFilesDiv.appendChild(p);
    }
  } else {
    const p = document.createElement('p');
    p.textContent = 'No files uploaded';
    uploadedFilesDiv.appendChild(p);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.getElementById('theme-toggle').checked = savedTheme === 'dark';
  const savedLang = localStorage.getItem('language') || 'en';
  changeLanguage(savedLang);

  const fileInput = document.getElementById('taskFile');
  fileInput.addEventListener('change', updateFileList);

  const form = document.getElementById('taskForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('taskFile');
    const files = fileInput.files;
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes

    if (files.length > 0) {
      for (let file of files) {
        if (file.size > maxSize) {
          alert(translations[savedLang]['fileSizeError']);
          return;
        }
      }
    }

    const taskData = {
      title: document.getElementById('taskTitle').value,
      description: document.getElementById('taskDescription').value,
      files: files,
      budget: document.getElementById('taskBudget').value,
      deadline: document.getElementById('taskDeadline').value,
      category: document.getElementById('taskCategory').value
    };
    console.log('Task submitted:', taskData);
    alert(translations[savedLang]['submitSuccess']);
    form.reset();
    updateFileList(); // Оновити список після скидання форми
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