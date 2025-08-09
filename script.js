// Apparition animée des sections au scroll
const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
                if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in');
                }
        });
}, { threshold: 0.15 });

document.querySelectorAll('section').forEach(section => {
        section.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
        observer.observe(section);
});

// Effet de survol lumineux sur les cartes projets/services
const cards = document.querySelectorAll('.group');
cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
        });
        card.addEventListener('mouseleave', () => {
                card.style.removeProperty('--mouse-x');
                card.style.removeProperty('--mouse-y');
        });
});

// Menu mobile animé
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                mobileMenu.classList.toggle('animate-slide-in');
        });
}

// Objets animés flottants (cercles SVG)
function createFloatingObjects() {
        const container = document.createElement('div');
        container.className = 'fixed top-0 left-0 w-full h-full pointer-events-none z-0';
        for (let i = 0; i < 8; i++) {
                const circle = document.createElement('div');
                circle.className = 'floating-circle';
                circle.style.left = `${Math.random() * 100}%`;
                circle.style.top = `${Math.random() * 100}%`;
                circle.style.width = circle.style.height = `${40 + Math.random() * 60}px`;
                circle.style.animationDuration = `${8 + Math.random() * 8}s`;
                container.appendChild(circle);
        }
        document.body.appendChild(container);
}
createFloatingObjects();
