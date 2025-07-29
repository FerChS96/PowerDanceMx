 document.addEventListener('DOMContentLoaded', () => {
  const galeria = document.querySelector('#galeria-powerdance');
  if (!galeria) return;


    // Efecto parallax sutil en las imágenes
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = galeria.querySelectorAll('.parallax-img');
      
      parallaxElements.forEach((element, index) => {
        const rate = scrolled * -0.1;
        const yPos = -(rate / (index + 1));
        element.style.transform = `translateY(${yPos}px)`;
      });
    });

    // Mejorar la experiencia de carga
    
      // Precargar imágenes para mejor rendimiento
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const newImg = new Image();
        newImg.src = img.src;
      });
    });