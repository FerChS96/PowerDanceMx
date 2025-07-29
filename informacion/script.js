// IMPORTAR GSAP Y SCROLLTRIGGER EN TU HTML (recomendado en el <head>)
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

document.addEventListener("DOMContentLoaded", function () {
  // Título y subtítulo
  gsap.from(".info2025-title", {
    scrollTrigger: {
      trigger: ".info2025-content",
      start: "top 80%",
    },
    opacity: 0,
    y: 32,
    duration: 0.7,
    ease: "power3.out"
  });

  gsap.from(".info2025-subtitle", {
    scrollTrigger: {
      trigger: ".info2025-content",
      start: "top 85%",
    },
    opacity: 0,
    y: 24,
    delay: 0.12,
    duration: 0.7,
    ease: "power3.out"
  });

  // Stagger cards
  gsap.from(".info2025-card", {
    scrollTrigger: {
      trigger: ".info2025-cards",
      start: "top 90%",
    },
    opacity: 0,
    y: 24,
    stagger: 0.18,
    duration: 0.65,
    ease: "power2.out"
  });

  // Botón animado al hover
  const btn = document.querySelector('.info2025-btn');
  if (btn) {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.08,
        boxShadow: "0 4px 38px 0 #a18cd140, 0 0 12px 0 #fff2",
        duration: 0.23,
        ease: "power2.out"
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        boxShadow: "0 4px 28px 0 #a18cd120",
        duration: 0.19,
        ease: "power2.inOut"
      });
    });
  }
});
