// Arreglo de URLs de imágenes
const images = [
  "https://lightslategrey-rhinoceros-951043.hostingersite.com/wp-content/uploads/2025/07/DSC03951-scaled.jpg",
  "https://lightslategrey-rhinoceros-951043.hostingersite.com/wp-content/uploads/2025/07/DSC04113-scaled.jpg",
  "https://lightslategrey-rhinoceros-951043.hostingersite.com/wp-content/uploads/2025/07/DSC04183-scaled.jpg",
  "https://lightslategrey-rhinoceros-951043.hostingersite.com/wp-content/uploads/2025/07/DSC04061-scaled.jpg",
  "https://lightslategrey-rhinoceros-951043.hostingersite.com/wp-content/uploads/2025/07/DSC03829-scaled.jpg",
  "https://lightslategrey-rhinoceros-951043.hostingersite.com/wp-content/uploads/2025/07/DSC03338-scaled.jpg"
];
// Por cada bloque hero-power-dance en la página
document.querySelectorAll('.hero-power-dance').forEach(heroBlock => {
  // 1. Elige UNA imagen aleatoria para todas las imágenes del bloque
  const randomImg = images[Math.floor(Math.random() * images.length)];

  // 2. Cambia el src de todas las imágenes del bloque (las 6)
  heroBlock.querySelectorAll('.hero__image-cont img').forEach(img => {
    img.src = randomImg;
  });

  // 3. GSAP Animations SOLO en este bloque
  gsap.registerPlugin(ScrollTrigger);

  // Animación de las "swipes"
  gsap.to(heroBlock.querySelectorAll('.anim-swipe'), {
    yPercent: 300,
    delay: 0.2,
    duration: 3,
    stagger: {
      from: "random",
      each: 0.1
    },
    ease: "sine.out"
  });

  // Animación parallax de las imágenes al hacer scroll
  gsap.to(heroBlock.querySelectorAll('.hero__image-cont > img'), {
    scale: 1.5,
    xPercent: 20,
    scrollTrigger: {
      trigger: heroBlock.querySelector(".hero"),
      start: "top top",
      end: "+=3000px",
      scrub: true
    }
  });

  // Opcional: Si quieres animación parallax sutil solo en móvil, agrega aquí el código adaptado si lo necesitas.
});

