/**
 * Eclip-Mode Project Core JS
 * Чистый Vanilla JS без сторонних библиотек
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. АНИМАЦИЯ ПОЯВЛЕНИЯ (REVEAL) ---
  const revealElements = () => {
      const observerOptions = {
          threshold: 0.15,
          rootMargin: "0px 0px -50px 0px"
      };

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('reveal--active');
                  observer.unobserve(entry.target);
              }
          });
      }, observerOptions);

      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  };

  // --- 2. ЭФФЕКТ ПЕЧАТНОЙ МАШИНКИ (HERO SECTION) ---
  const typewriterElement = document.getElementById("typewriter");
  if (typewriterElement) {
      const words = ["нового поколения", "без лишней воды", "для твоей карьеры"];
      let wordIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      function type() {
          const currentWord = words[wordIndex];
          if (isDeleting) {
              typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
              charIndex--;
          } else {
              typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
              charIndex++;
          }

          let typeSpeed = isDeleting ? 100 : 200;

          if (!isDeleting && charIndex === currentWord.length) {
              isDeleting = true;
              typeSpeed = 2000; // Пауза в конце слова
          } else if (isDeleting && charIndex === 0) {
              isDeleting = false;
              wordIndex = (wordIndex + 1) % words.length;
              typeSpeed = 500;
          }

          setTimeout(type, typeSpeed);
      }
      type();
  }

  // --- 3. МОБИЛЬНОЕ МЕНЮ (БУРГЕР) ---
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');

  if (burger) {
      burger.addEventListener('click', () => {
          burger.classList.toggle('burger--active');
          nav.classList.toggle('nav--active');
          document.body.classList.toggle('no-scroll'); // Чтобы не скроллился фон
      });

      navLinks.forEach(link => {
          link.addEventListener('click', () => {
              burger.classList.remove('burger--active');
              nav.classList.remove('nav--active');
              document.body.classList.remove('no-scroll');
          });
      });
  }

  // --- 4. ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              e.preventDefault();
              targetElement.scrollIntoView({ behavior: 'smooth' });
          }
      });
  });

  // --- 5. ЛОГИКА ФОРМЫ И КАПЧИ ---
  const contactForm = document.getElementById('contactForm');
  const phoneInput = document.getElementById('phoneInput');
  const captchaText = document.getElementById('captchaQuestion');
  const formStatus = document.getElementById('formStatus');
  let captchaSum;

  const generateCaptcha = () => {
      if (!captchaText) return;
      const n1 = Math.floor(Math.random() * 10);
      const n2 = Math.floor(Math.random() * 10);
      captchaSum = n1 + n2;
      captchaText.textContent = `Сколько будет ${n1} + ${n2}?`;
  };

  if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
      });
  }

  if (contactForm) {
      generateCaptcha();
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const userAnswer = parseInt(document.getElementById('captchaAnswer').value);

          if (userAnswer !== captchaSum) {
              formStatus.textContent = "Ошибка: неверная капча!";
              formStatus.className = "form__status error";
              return;
          }

          const btn = contactForm.querySelector('button');
          btn.disabled = true;
          btn.textContent = "Отправка...";

          // Имитация AJAX-запроса
          setTimeout(() => {
              formStatus.textContent = "Ваша заявка принята! Мы свяжемся с вами.";
              formStatus.className = "form__status success";
              contactForm.reset();
              generateCaptcha();
              btn.disabled = false;
              btn.textContent = "Начать сейчас";
          }, 1500);
      });
  }

  // --- 6. COOKIE POPUP ---
  const cookiePopup = document.getElementById('cookiePopup');
  const acceptBtn = document.getElementById('acceptCookies');

  if (cookiePopup && !localStorage.getItem('cookiesAccepted')) {
      setTimeout(() => {
          cookiePopup.classList.add('cookie-popup--active');
      }, 3000);
  }

  if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
          localStorage.setItem('cookiesAccepted', 'true');
          cookiePopup.classList.remove('cookie-popup--active');
      });
  }

  // --- 7. HEADER SCROLL EFFECT ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.style.padding = '10px 0';
          header.style.background = 'rgba(241, 242, 237, 0.95)';
      } else {
          header.style.padding = '20px 0';
          header.style.background = 'rgba(241, 242, 237, 0.9)';
      }
  });

  // Инициализация анимаций
  revealElements();
});