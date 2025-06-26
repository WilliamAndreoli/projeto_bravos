// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Efeito Parallax suave
function handleParallax() {
    const home = document.getElementById('home');
    if (!home) return;

    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    // // Verifica se é um dispositivo móvel
    // if (window.innerWidth > 768) {
    //     home.style.backgroundPositionY = `calc(50% + ${rate}px)`;
    // }
}

// Animação de fade-in nos elementos
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Adiciona classes de animação aos elementos
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Atualiza o efeito parallax
        handleParallax();
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Inicializa o parallax
    handleParallax();
});

// Otimização do parallax com requestAnimationFrame
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleParallax();
            ticking = false;
        });
        ticking = true;
    }
}); 

// Animação Carousel
const imagens = ["img1.png", "img2.png", "img3.png", "img4.png"];
const imagensPrev = ["img/img2-prev.png", "img/img3-prev.png", "img/img4-prev.png", "img/img1-prev.png"];
const imagensPrevPrev = ["img/img4-prev.png", "img/img1-prev.png", "img/img2-prev.png", "img/img3-prev.png"];

let index = 0;

function adaptaImagemCarouselNext() {
    const img = document.getElementById('img-active');
    const nextImg = document.getElementById('img-next-carousel');

    nextImg.src = imagensPrev[index];

    index = (index + 1) % imagens.length; // loop circular
}

let indexPrev = 0;

function adaptaImagemCarouselPrev() {
    const img = document.getElementById('img-active');
    const prevImg = document.getElementById('img-prev-carousel');

    prevImg.src = imagensPrevPrev[indexPrev];

    indexPrev = (indexPrev + 1) % imagens.length; // loop circular
}

function alternaImagensPeloBotao() {
    adaptaImagemCarouselNext();
    adaptaImagemCarouselPrev();
}

setInterval(adaptaImagemCarouselNext, 5500);
setInterval(adaptaImagemCarouselPrev, 5500);

