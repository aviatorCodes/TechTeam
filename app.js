const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const icon = document.getElementById('themeIcon');

    const sunIconSrc = 'images/sun.png';
    const moonIconSrc = 'images/moon.png';

    function updateThemeUI(isDark) {
      icon.src = isDark ? moonIconSrc : sunIconSrc;
      html.classList.toggle('dark', isDark);
    }

    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

    toggle.checked = isDark;
    updateThemeUI(isDark);

    toggle.addEventListener('change', () => {
      const isNowDark = toggle.checked;
      updateThemeUI(isNowDark);
      localStorage.setItem('theme', isNowDark ? 'dark' : 'light');
    });


const phrases = [
  "Tech Team Ko Bulao!  ",
  "Iska YouTube, Instagram Sab Udado  ",
  "Kuch Personal To Nahi Hai Na!  ",
  "Iska Phone Lock kardo  "
];


const el = document.getElementById('typewriter-text');
    let currentPhrase = '';
    let currentIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let lastTimestamp = 0;
    let delay = 0;

    function getRandomDelay(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function typeLoop(timestamp) {
      if (timestamp < lastTimestamp + delay) {
        requestAnimationFrame(typeLoop);
        return;
      }

      lastTimestamp = timestamp;
      currentPhrase = phrases[currentIndex];

      if (!isDeleting) {
        letterIndex++;
        el.textContent = currentPhrase.slice(0, letterIndex);
        delay = getRandomDelay(60, 120);
        if (letterIndex === currentPhrase.length) {
          isDeleting = true;
          delay = 1000;
        }
      } else {
        letterIndex--;
        el.textContent = currentPhrase.slice(0, letterIndex) || '\u00A0'; 
        delay = getRandomDelay(40, 80);
        if (letterIndex === 0) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % phrases.length;
          delay = 500;
        }
      }

      requestAnimationFrame(typeLoop);
    }

    requestAnimationFrame(typeLoop);


document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("img");
  trail.src = "./images/shobhit.png";
  trail.className = "cursor-trail";
  trail.style.left = `${e.clientX}px`;
  trail.style.top = `${e.clientY}px`;

  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 600);
});


window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    const page = document.getElementById("page");

    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.pointerEvents = "none";

      setTimeout(() => {
        preloader.remove();

        page.classList.add("loaded");
      }, 500);
    }, 3000);
  });