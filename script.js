document.addEventListener('DOMContentLoaded', () => {
    // Inizializza animazioni AOS
    AOS.init({ duration: 1000, once: true });

    // --- MENU MOBILE & OVERLAY ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const overlay = document.querySelector('.menu-overlay');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    // Chiudi menu se clicchi l'overlay o un link
    [overlay, mainNav].forEach(el => {
        el.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
        });
    });

    // --- CONTATORI ANIMATI ---
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.dataset.target;
                const count = () => {
                    const current = +counter.innerText.replace(',', '.');
                    const inc = target / 100;
                    if (current < target) {
                        counter.innerText = (current + inc).toFixed(target % 1 === 0 ? 0 : 1).replace('.', ',');
                        setTimeout(count, 20);
                    } else {
                        counter.innerText = target.toString().replace('.', ',');
                    }
                };
                count();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));

    // --- SLIDESHOW AUTOMATICA ---
    let slideIndex = 0;
    const showSlides = () => {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) slides[i].style.display = "none";
        slideIndex++;
        if (slideIndex > slides.length) slideIndex = 1;
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 4000); // Cambia foto ogni 4 secondi
    };
    showSlides();
});
