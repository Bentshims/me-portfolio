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

// Particules et lignes animées (effet constellation)
const canvas = document.getElementById('particles-bg');
if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        let mouse = { x: null, y: null };
        window.addEventListener('mousemove', e => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
        });
        window.addEventListener('resize', () => {
                width = window.innerWidth;
                height = window.innerHeight;
                canvas.width = width;
                canvas.height = height;
        });

        const PARTICLE_COUNT = Math.floor(width / 32);
        const particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        vx: (Math.random() - 0.5) * 0.7,
                        vy: (Math.random() - 0.5) * 0.7,
                        r: 1.2 + Math.random() * 1.8
                });
        }

        function drawParticles() {
                ctx.clearRect(0, 0, width, height);
                // Lignes entre particules proches
                for (let i = 0; i < particles.length; i++) {
                        for (let j = i + 1; j < particles.length; j++) {
                                const dx = particles[i].x - particles[j].x;
                                const dy = particles[i].y - particles[j].y;
                                const dist = Math.sqrt(dx * dx + dy * dy);
                                if (dist < 110) {
                                        ctx.save();
                                        ctx.globalAlpha = 0.13;
                                        ctx.strokeStyle = '#5A45FF';
                                        ctx.lineWidth = 1;
                                        ctx.beginPath();
                                        ctx.moveTo(particles[i].x, particles[i].y);
                                        ctx.lineTo(particles[j].x, particles[j].y);
                                        ctx.stroke();
                                        ctx.restore();
                                }
                        }
                }
                // Lignes vers la souris
                if (mouse.x && mouse.y) {
                        particles.forEach(p => {
                                const dx = p.x - mouse.x;
                                const dy = p.y - mouse.y;
                                const dist = Math.sqrt(dx * dx + dy * dy);
                                if (dist < 140) {
                                        ctx.save();
                                        ctx.globalAlpha = 0.18;
                                        ctx.strokeStyle = '#38bdf8';
                                        ctx.lineWidth = 1;
                                        ctx.beginPath();
                                        ctx.moveTo(p.x, p.y);
                                        ctx.lineTo(mouse.x, mouse.y);
                                        ctx.stroke();
                                        ctx.restore();
                                }
                        });
                }
                // Particules
                particles.forEach(p => {
                        ctx.save();
                        ctx.globalAlpha = 0.7;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(80,255,200,0.18)';
                        ctx.shadowColor = '#5A45FF';
                        ctx.shadowBlur = 8;
                        ctx.fill();
                        ctx.restore();
                });
        }

        function updateParticles() {
                for (let p of particles) {
                        p.x += p.vx;
                        p.y += p.vy;
                        if (p.x < 0 || p.x > width) p.vx *= -1;
                        if (p.y < 0 || p.y > height) p.vy *= -1;
                        // Effet de répulsion souris
                        if (mouse.x && mouse.y) {
                                const dx = p.x - mouse.x;
                                const dy = p.y - mouse.y;
                                const dist = Math.sqrt(dx * dx + dy * dy);
                                if (dist < 60) {
                                        p.vx += dx / dist * 0.09;
                                        p.vy += dy / dist * 0.09;
                                }
                        }
                        // Légère friction
                        p.vx *= 0.99;
                        p.vy *= 0.99;
                }
        }

        // Lignes animées (waves lumineuses)
        function drawWaves() {
                ctx.save();
                ctx.globalAlpha = 0.10;
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1.5;
                const t = Date.now() * 0.001;
                for (let i = 0; i < 2; i++) {
                        ctx.beginPath();
                        for (let x = 0; x < width; x += 8) {
                                const y = height * (0.15 + 0.2 * i) + Math.sin(x * 0.01 + t * (1.2 + i * 0.5)) * 18;
                                ctx.lineTo(x, y);
                        }
                        ctx.stroke();
                }
                ctx.restore();
        }

        function animate() {
                drawParticles();
                drawWaves();
                updateParticles();
                requestAnimationFrame(animate);
        }
        animate();
}
