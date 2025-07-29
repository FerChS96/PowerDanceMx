 // ===== CONFIGURACIÓN DE FULLPAGE.JS =====
        new fullpage('#fullpage', {
            licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
            // Configuración básica
            scrollOverflow: true,
            autoScrolling: true,
            scrollHorizontally: true,
            
            // Loop infinito vertical
            loopTop: true,
            loopBottom: true,
            
            // Navegación
            navigation: true,
            navigationPosition: 'right',
            navigationTooltips: ['Inicio', 'Promoción', 'Nosotros', 'Clases', 'Galería', 'Únete', 'Contacto'],
            showActiveTooltip: true,
            
            // Anclas para navegación por URL
            anchors: ['inicio', 'promocion', 'nosotros', 'clases', 'galeria', 'unirse', 'contacto'],
            
            // Transiciones suaves
            css3: true,
            easingcss3: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            scrollingSpeed: 1000,
            
            // Responsive
            responsiveWidth: 0,
            responsiveHeight: 0,
            
            onLeave: function(origin, destination, direction) {
            const nextAnchor = destination.anchor.toLowerCase(); // Asegura minúsculas
            const bg = document.getElementById('heroBackground');

            if (nextAnchor === 'inicio') {
                bg.classList.add('active'); // Aparece suavemente
                console.log('Preparando fondo para INICIO');
            } else {
                bg.classList.remove('active'); // Se desvanece
                console.log('Ocultando fondo fijo');
            }
        },


        afterLoad: function(origin, destination, direction) {
            const anchorLink = destination.anchor;

            // Aquí mantienes las lógicas adicionales
            if (anchorLink === 'galeria') {
                startSlideshow();
            }

            if (anchorLink === 'testimonios') {
                startTestimonialRotation();
            }
        }
        
        });

        // Cerrar menú con tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });

        // ===== DETECCIÓN DE DISPOSITIVO MÓVIL =====
        function isMobile() {
            return window.innerWidth <= 768;
        }

        // ===== OPTIMIZACIONES PARA MÓVIL =====
        if (isMobile()) {
            // Ajustar configuración de fullpage para móvil
            console.log('Dispositivo móvil detectado - Optimizando experiencia');
            
            // Reducir velocidad de transición en móvil
            document.documentElement.style.setProperty('--scroll-speed', '800ms');
        }

        // ===== INICIADORES AL CARGAR LA PÁGINA =====
        document.addEventListener('DOMContentLoaded', function() {            
            // Configurar transiciones suaves para testimonios
            const testimonialText = document.getElementById('testimonialText');
            const testimonialAuthor = document.getElementById('testimonialAuthor');
            
            if (testimonialText && testimonialAuthor) {
                testimonialText.style.transition = 'opacity 0.3s ease';
                testimonialAuthor.style.transition = 'opacity 0.3s ease';
            }
            
            console.log('Power Dance - Landing Page cargada exitosamente');
        });

        // ===== MANEJO DE ERRORES =====
        window.addEventListener('error', function(e) {
            console.log('Error detectado:', e.error);
            // Aquí podrías enviar errores a un servicio de monitoreo
        });

        // ===== ANALYTICS Y SEGUIMIENTO (PLACEHOLDER) =====
        function trackEvent(eventName, eventData) {
            // Aquí puedes integrar Google Analytics, Facebook Pixel, etc.
            console.log('Evento:', eventName, eventData);
        }

        // Rastrear clics en CTAs
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', function() {
                trackEvent('CTA_Click', {
                    button_text: this.textContent,
                    section: this.closest('.section').dataset.anchor
                });
            });
        });

        // ===== FUNCIONES DE UTILIDAD =====
        
        // Función para obtener la sección actual
        function getCurrentSection() {
            return fullpage_api.getActiveSection().anchor;
        }
        
        // Función para ir a una sección específica
        function goToSection(sectionName) {
            fullpage_api.moveTo(sectionName);
            closeMenu();
        }
        
        // Función para alternar modo oscuro (futura implementación)
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        }
        
        // Restaurar preferencia de modo oscuro
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }

        // ===== MENSAJE DE CONSOLE PARA DESARROLLADORES =====
        console.log(`
        🕺 ¡Bienvenido a Power Dance! 💃
        ===================================
        
        Esta landing page incluye:
        ✅ FullPage.js con scroll infinito
        ✅ Menú hamburguesa responsivo
        ✅ 8 secciones con efectos parallax
        ✅ Slideshow automático
        ✅ Testimonios rotativos
        ✅ Animaciones CSS/JS
        ✅ Diseño completamente responsivo
        
        Para personalizar:
        - Cambia las imágenes en las rutas img/
        - Modifica colores en las variables CSS
        - Ajusta textos y contenido
        - Configura enlaces de contacto reales
        
        ¡Que tengas un excelente día bailando! 🎵
        `);

const galeriaHTML = `

  <style>
    *, *:before, *:after {
      box-sizing: inherit;
      margin: 0;
      padding: 0;
      border: 0 none;
      position: relative;
    }

    html {
      background: #fff;
      box-sizing: border-box;
      font-family: 'Rubik Mono One', sans-serif;
      font-size: 1rem;
      color: #000;
    }

    @media screen and (min-width: 700px) {
      body > article {
        display: flex;
        flex-wrap: wrap;
      }
      figure {
        background: #eee;
        width: calc(50% + 1px);
        height: 100vh;
        margin: 0 auto 10vh 0;
        position: sticky;
        top: 0;
        overflow: hidden;
        box-shadow: 4px -4px 8px rgba(0,0,0,.4);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5vmin;
      }
      figure:nth-of-type(2n)::after {
        right: 45%;
        left: 5vmin;
      }
      section {
        background: #ff1919;
        width: calc(50% + 1px);
        height: 100vh;
        margin: 0 0 10vh auto;
        position: sticky;
        top: 0;
        padding: 5vmin;
        box-shadow: -4px -4px 8px rgba(0,0,0,.4);
        overflow: hidden;
      }
      figure:nth-of-type(1),
      section:nth-of-type(1) {
        margin: 0 0 10vh 0;
        width: 50%;
      }
      figure:nth-of-type(2n) {
        margin: 0 0 10vh auto;
        box-shadow: -4px -4px 8px rgba(0,0,0,.4);
      }
      section:nth-of-type(2n) {
        margin: 0 auto 10vh 0;
        box-shadow: 4px -4px 8px rgba(0,0,0,.4);
      }
      section::before {
        background: inherit;
        z-index: 1;
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 7vmin;
        height: 7vmin;
        transform: translate(calc(-50% + 1px), -50%) rotate(-45deg);
        clip-path: polygon(-15% -15%, 110% 0%, 0% 110%);
        box-shadow: -4px -2px 8px rgba(0,0,0,.4);
        border-radius: 1.5vmin 0 0 0;
      }
      section:nth-of-type(2n)::before {
        left: auto;
        right: 0;
        transform: translate(calc(50% - 1px), -50%) rotate(-45deg) scale(-1);
      }
    
      section:nth-of-type(2n):after {
        right: 5vmin;
        left: 45%;
      }
      
      /* Mejoras en las imágenes */
      figure img {
        position: fixed;
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain;
        object-position: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        transition: transform 0.3s ease;
      }
      
      figure img:hover {
        transform: scale(1.05);
      }
      
      section > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        padding: 1rem;
        overflow: hidden;
      }
      
      /* Animaciones para los textos */
      h1, h2 {
        margin: 15% 0 auto;
        font-size: 3.5rem;
        text-align: left;
        font-weight: 700;
        line-height: 1;
        word-spacing: .5rem;
      
        opacity: 0;
        max-width: 90%;
      }
      
      /* Textos pares vienen desde la derecha */
      section:nth-of-type(2n) h1,
      section:nth-of-type(2n) h2 {
        animation: slideInFromRight 1s ease-out 0.5s forwards;
      }
      
      p {
        text-align: left;
        width: 100%;
        font-family: "Inter", serif;
        font-weight: 200;
        font-style: italic;
        font-size: calc(1.5vmin + 1.75vmax);
        margin-bottom: 5%;
        opacity: 0;
        animation: slideInFromLeft 1s ease-out 0.8s forwards;
      }
      
      /* Párrafos pares vienen desde la derecha */
      section:nth-of-type(2n) p {
        animation: slideInFromRight 1s ease-out 0.8s forwards;
        text-align: left;
      }
      
      /* Keyframes para animaciones */
      @keyframes slideInFromLeft {
        0% {
          opacity: 0;
          transform: translateX(-100px);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slideInFromRight {
        0% {
          opacity: 0;
          transform: translateX(100px);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      /* Animación trigger basada en scroll */
      .animate-on-scroll {
        opacity: 0;
        transform: translateX(-100px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .animate-on-scroll.from-right {
        transform: translateX(100px);
      }
      
      .animate-on-scroll.visible {
        opacity: 1;
        transform: translateX(0);
      }
      
      /* Efecto parallax sutil en las imágenes */
      figure {
        will-change: transform;
      }
      
      /* Responsive adjustments */
      @media screen and (max-width: 1200px) {
        figure img {
          max-width: 90%;
          max-height: 90%;
        }
      }
      
      @media screen and (max-width: 900px) {
        figure img {
          max-width: 95%;
          max-height: 95%;
        }
        
        h1, h2 {
          font-size: calc(4vmin + 2.5vmax);
        }
        
        p {
          font-size: calc(2vmin + 1.5vmax);
        }
      }
    }
  @media screen and (max-width: 699px) {
  body > article {
    display: flex;
    flex-wrap: wrap;
  }

  figure, section {
    width: 100%;
    height: 100vh;
    margin: 0;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  figure img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
    background: #111;
  }

  h1, h2, p {
    color: white;
    opacity: 0;
    animation: slideInFromLeft 1s ease-out 0.5s forwards;
  }

  section:nth-of-type(2n) h1,
  section:nth-of-type(2n) h2,
  section:nth-of-type(2n) p {
    animation: slideInFromRight 1s ease-out 0.5s forwards;
  }

  p {
    font-size: 1.2rem;
      font-family: 'Inter', sans-serif;
  font-weight: 200;
  font-style: italic;
  }

  h1, h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .logo-overlay {
  position: absolute;
  bottom: 2vh;
  right: 2vw;
  transform: translateX(-50%);
  width: 80px;
  max-width: 50vw;
  height: auto;
  opacity: 0.9;
  filter: drop-shadow(1px 1px 4px rgba(0,0,0,0.5));
  pointer-events: none;
}

}

.logo-overlay {
  position: absolute;
  bottom: 2vh;
  right: 2vw;
  transform: translateX(-50%);
  width: 150px;
  max-width: 25vw;
  opacity: 0.85;
  filter: drop-shadow(2px 2px 5px rgba(0,0,0,0.5));
  pointer-events: none;
}
  </style>
  <article>
    <figure>
      <img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/DSC00967.jpg" alt="Foto 1" class="parallax-img" />
      <img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/POWER-DANCE-LOGO-2025-1-scaled.png" alt="Logo Power Dance" class="logo-overlay">

    </figure>
    <section>
      <div>
        <h1 class="animate-text">Power Dance</h2>
        <p class="animate-text">Expresión, energía y pasión en cada paso.</p>
      </div>
    </section>

    <figure>
      <img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/DSC00985.jpg" alt="Foto 2" class="parallax-img" />
      <img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/POWER-DANCE-LOGO-2025-1-scaled.png" alt="Logo Power Dance" class="logo-overlay">
    </figure>
    <section>
      <div>
        <h2 class="animate-text">Más que baile</h2>
        <p class="animate-text">Una comunidad que vibra con movimiento.</p>
      </div>
    </section>

<figure>
  <img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/DSC01036-scaled.jpg" alt="Foto Power Dance 4" class="parallax-img" />
  <img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/POWER-DANCE-LOGO-2025-1-scaled.png" alt="Logo Power Dance" class="logo-overlay">

</figure>
<section>
  <div>
    <h2 class="animate-text">Energía en cada movimiento</h2>
    <p class="animate-text">La danza transforma, empodera y conecta.</p>
  </div>
</section>

<figure>
  <img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/DSC01077-scaled.jpg" alt="Foto Power Dance 5" class="parallax-img" />
  <img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/POWER-DANCE-LOGO-2025-1-scaled.png" alt="Logo Power Dance" class="logo-overlay">

</figure>
<section>
  <div>
    <h2 class="animate-text">Fuerza y armonía</h2>
    <p class="animate-text">Cada paso expresa lo que las palabras no pueden.</p>
  </div>
</section>

<figure>
  <img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/DSC01133-scaled.jpg" alt="Foto Power Dance 6" class="parallax-img" />
<img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/POWER-DANCE-LOGO-2025-1-scaled.png" alt="Logo Power Dance" class="logo-overlay">

</figure>
<section>
  <div>
    <h2 class="animate-text">Transforma tu ritmo</h2>
    <p class="animate-text">Baila como si ya fueras quien sueñas ser.</p>
  </div>
</section>

<figure>
  <img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/DSC01207-scaled.jpg" alt="Foto Power Dance 7" class="parallax-img" />
<img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/POWER-DANCE-LOGO-2025-1-scaled.png" alt="Logo Power Dance" class="logo-overlay">

</figure>
<section>
  <div>
    <h2 class="animate-text">Escenario de sueños</h2>
    <p class="animate-text">En Power Dance, todos brillan con luz propia.</p>
  </div>
</section>

<figure>
  <img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/DSC01218-scaled.jpg" alt="Foto Power Dance 8" class="parallax-img" />
<img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/POWER-DANCE-LOGO-2025-1-scaled.png" alt="Logo Power Dance" class="logo-overlay">

</figure>
<section>
  <div>
    <h2 class="animate-text">Confianza y arte</h2>
    <p class="animate-text">Tu autenticidad es el mejor paso de todos.</p>
  </div>
</section>

<figure>
  <img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/DSC02578-scaled.jpg" alt="Foto Power Dance 9" class="parallax-img" />
<img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/POWER-DANCE-LOGO-2025-1-scaled.png" alt="Logo Power Dance" class="logo-overlay">

</figure>
<section>
  <div>
    <h2 class="animate-text">Vibra Power Dance</h2>
    <p class="animate-text">Cuando bailas desde el alma, no hay error posible.</p>
  </div>
</section>


    <figure>
      <img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/DSC00995.jpg" alt="Foto 3" class="parallax-img" />
<img src="https://mediumvioletred-sparrow-189149.hostingersite.com/wp-content/uploads/2025/06/POWER-DANCE-LOGO-2025-1-scaled.png" alt="Logo Power Dance" class="logo-overlay">

    </figure>
    <section>
      <div>
        <h2 class="animate-text">Únete</h2>
        <p class="animate-text">Descubre tu potencial. Vive Power Dance.</p>
      </div>
    </section>
  </article>`;

    // Animaciones basadas en scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          const texts = section.querySelectorAll('.animate-text');
          
          texts.forEach((text, index) => {
            setTimeout(() => {
              text.style.opacity = '1';
              text.style.transform = 'translateX(0)';
            }, index * 200);
          });
        }
      });
    }, observerOptions);

    // Observar todas las secciones
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    // Efecto parallax sutil en las imágenes
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-img');
      
      parallaxElements.forEach((element, index) => {
        const rate = scrolled * -0.1;
        const yPos = -(rate / (index + 1));
        element.style.transform = `translateY(${yPos}px)`;
      });
    });

    // Mejorar la experiencia de carga
    document.addEventListener('DOMContentLoaded', () => {
      // Precargar imágenes para mejor rendimiento
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const newImg = new Image();
        newImg.src = img.src;
      });
    });