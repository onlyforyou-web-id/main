function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    const overlay = document.getElementById('envelope-overlay');
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById('bg-music');

    // 1. Animate Envelope Opening
    envelope.classList.add('open');

    // 2. Play Music (User interaction triggered)
    audio.volume = 0.5; // Start with lower volume
    audio.play().catch(error => {
        console.log("Autoplay prevented:", error);
    });

    // 3. Create Heart Burst
    createHeartBurst();

    // 4. Wait for animation, then hide overlay and show content
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
            mainContent.classList.remove('hidden');
            // Start typing effect after content is visible
            startTypingEffect();
        }, 1000); // Wait for opacity transition
    }, 1500); // Wait for envelope open animation
}

// Heart Burst Effect
function createHeartBurst() {
    const container = document.querySelector('.envelope-container');
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
        heart.style.transition = 'all 1s ease-out';
        heart.style.zIndex = '100';
        heart.style.pointerEvents = 'none';

        container.appendChild(heart);

        setTimeout(() => {
            const x = (Math.random() - 0.5) * 300;
            const y = (Math.random() - 0.5) * 300;
            heart.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`;
            heart.style.opacity = '0';
        }, 50);

        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}

// Typing Effect for Note
function startTypingEffect() {
    const noteText = document.querySelector('.handwritten');
    const originalText = noteText.innerText.trim();
    noteText.innerText = '';

    let i = 0;
    function type() {
        if (i < originalText.length) {
            noteText.innerHTML += originalText.charAt(i);
            i++;
            // Randomize typing speed slightly for realism
            setTimeout(type, 30 + Math.random() * 50);
        }
    }
    type();
}

// Sakura Generator
function createSakura() {
    const sakuraContainer = document.getElementById('sakura-container');
    const sakura = document.createElement('div');
    sakura.classList.add('sakura');

    // Randomize properties
    const size = Math.random() * 10 + 10 + 'px';
    const left = Math.random() * 100 + 'vw';
    const animationDuration = Math.random() * 3 + 5 + 's';
    const animationDelay = Math.random() * 5 + 's';

    // Varied colors
    const colors = ['#ffb7b2', '#ff9aa2', '#ffc1c1', '#ffd1dc', '#ffffff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    sakura.style.width = size;
    sakura.style.height = size;
    sakura.style.left = left;
    sakura.style.backgroundColor = randomColor;
    sakura.style.animationDuration = animationDuration;
    sakura.style.animationDelay = animationDelay;

    // Randomize sway direction
    sakura.style.setProperty('--sway-dir', Math.random() > 0.5 ? 1 : -1);

    sakuraContainer.appendChild(sakura);

    // Remove after animation
    setTimeout(() => {
        sakura.remove();
    }, 8000);
}

// Generate sakura periodically
setInterval(createSakura, 200); // Slightly faster generation

// Cursor Trail
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (!isMobile) {
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.classList.add('heart-trail');
        trail.innerHTML = '💖';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        document.body.appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 1000);
    });
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check local storage
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});
