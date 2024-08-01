// JavaScript cho hiệu ứng cuộn mượt
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// JavaScript để thêm hiệu ứng khi kỹ năng hiển thị trên màn hình
document.addEventListener("DOMContentLoaded", function() {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(skillLevel => {
        const width = skillLevel.style.width;
        skillLevel.style.width = 0;
        skillLevel.style.transition = 'width 1s';
        setTimeout(() => {
            skillLevel.style.width = width;
        }, 100);
    });
});

// JavaScript để thêm hiệu ứng hiển thị dần khi cuộn trang
document.addEventListener("DOMContentLoaded", function() {
    const projectCards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        observer.observe(card);
    });
});

// JavaScript để thêm hiệu ứng khi cuộn trang
document.addEventListener("DOMContentLoaded", function() {
    const educationItems = document.querySelectorAll('.education-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    educationItems.forEach(item => {
        observer.observe(item);
    });
});

const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
    });
});
