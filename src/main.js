// Базовая логика хедера
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = 'none';
    }
});

// Плавный скролл для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Эффект печатной машинки
const words = ["нового поколения", "без лишней воды", "для твоей карьеры"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type() {
    currentWord = words[i];
    if (isDeleting) {
        document.getElementById("typewriter").textContent = currentWord.substring(0, j - 1);
        j--;
        if (j == 0) {
            isDeleting = false;
            i++;
            if (i == words.length) i = 0;
        }
    } else {
        document.getElementById("typewriter").textContent = currentWord.substring(0, j + 1);
        j++;
        if (j == currentWord.length) {
            isDeleting = true;
        }
    }
    setTimeout(type, isDeleting ? 100 : 200);
}

document.addEventListener("DOMContentLoaded", () => {
    type();
    // Анимация появления при скролле (Intersection Observer)
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal--active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});
    // Логика аккордеона
const accordionItems = document.querySelectorAll('.accordion__item');

accordionItems.forEach(item => {
    item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Закрываем все открытые
        accordionItems.forEach(el => el.classList.remove('active'));
        
        // Если кликнули по закрытому — открываем
        if (!isActive) {
            item.classList.add('active');
        }
    });
});
    
});
// Капча и валидация
let captchaResult;

function generateCaptcha() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    captchaResult = a + b;
    document.getElementById('captchaQuestion').textContent = `Сколько будет ${a} + ${b}?`;
}

const phoneInput = document.getElementById('phoneInput');
phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userAnswer = parseInt(document.getElementById('captchaAnswer').value);
    
    if (userAnswer !== captchaResult) {
        formStatus.textContent = "Неверный ответ капчи!";
        formStatus.className = "form__status error";
        return;
    }

    // Имитация AJAX
    const btn = contactForm.querySelector('button');
    btn.textContent = "Отправка...";
    btn.disabled = true;

    setTimeout(() => {
        formStatus.textContent = "Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.";
        formStatus.className = "form__status success";
        contactForm.reset();
        generateCaptcha();
        btn.textContent = "Начать сейчас";
        btn.disabled = false;
    }, 1500);
});

// Инициализация капчи при загрузке
document.addEventListener('DOMContentLoaded', generateCaptcha);