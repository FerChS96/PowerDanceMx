// PowerDance Login Menu Script - VERSIÓN INTERACTIVA
(function() {
    'use strict';
    
    // Verificar que no se ejecute dos veces
    if (document.getElementById('powerDanceLoginMenu')) return;
    
    // Variables para el arrastre
    let isDragging = false;
    let dragStartTime = 0;
    let dragTimeout = null;
    let initialX = 0;
    let initialY = 0;
    let currentX = 0;
    let currentY = 0;
    let xOffset = 0;
    let yOffset = 0;
    let canDrag = false;
    
    // CSS Styles (con nuevas animaciones)
    const styles = `
        <style id="powerdance-login-styles">
        /* Contenedor de la pestaña flotante */
        .login-toggle-container {
          position: fixed;
          top: 120px;
          left: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          user-select: none;
        }
        
        .login-toggle-container.dragging {
          cursor: move !important;
          z-index: 99999;
        }
        
        /* Botón de toggle (pestaña) */
        .login-toggle-btn {
          background-color: #FF0000;
          color: white;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
          transition: all 0.5s ease;
          animation: dance-beat 2s ease-in-out infinite;
          position: relative;
          overflow: visible;
        }
        
        /* Animación de latido/baile */
        @keyframes dance-beat {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.05);
          }
          50% {
            transform: scale(1.02);
          }
          75% {
            transform: scale(1.08);
          }
        }
        
        /* Solo el icono puede rotar */
        .login-toggle-btn i {
          transition: transform 0.6s ease;
          z-index: 2;
          position: relative;
        }
        
        .login-toggle-btn:hover {
          background-color: black;
          animation: dance-beat-fast 1s ease-in-out infinite;
        }
        
        /* Animación más rápida en hover */
        @keyframes dance-beat-fast {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        
        .login-toggle-btn.open {
          background-color: black;
          box-shadow: 0 0 15px rgba(255, 0, 0, 0.4), 2px 2px 8px rgba(0, 0, 0, 0.3);
          animation: dance-beat-active 1.5s ease-in-out infinite;
        }
        
        /* Animación cuando está activo/abierto */
        @keyframes dance-beat-active {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 15px rgba(255, 0, 0, 0.4), 2px 2px 8px rgba(0, 0, 0, 0.3);
          }
          50% {
            transform: scale(1.06);
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.6), 2px 2px 12px rgba(0, 0, 0, 0.4);
          }
        }
        
        .login-toggle-btn.open i {
          transform: rotate(180deg);
        }
        
        /* Ondas expansivas */
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 0, 0, 0.8) 0%, rgba(255, 0, 0, 0.4) 40%, transparent 70%);
          transform: scale(0);
          animation: ripple-effect 0.8s cubic-bezier(0, 0, 0.2, 1) forwards;
          pointer-events: none;
          z-index: 1;
        }
        
        @keyframes ripple-effect {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        /* Menú desplegable */
        .login-menu {
          background-color: black;
          padding: 8px 0;
          min-width: 160px;
          box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          opacity: 0;
          transform: translateX(-100%);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: left center;
        }
        
        .login-menu.open {
          opacity: 1;
          transform: translateX(0);
        }
        
        /* Enlaces del menú */
        .login-menu-item {
          display: block;
          color: white;
          text-decoration: none;
          padding: 12px 20px;
          font-size: 14px;
          font-family: Poppins, sans-serif;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateX(-20px);
        }
        
        /* Animación de entrada para los elementos del menú */
        .login-menu.open .login-menu-item {
          opacity: 1;
          transform: translateX(0);
        }
        
        .login-menu.open .login-menu-item:nth-child(1) {
          transition-delay: 0.1s;
        }
        
        .login-menu.open .login-menu-item:nth-child(2) {
          transition-delay: 0.2s;
        }
        
        .login-menu-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background-color: #FF0000;
          transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }
        
        .login-menu-item:hover::before {
          left: 0;
        }
        
        .login-menu-item:hover {
          color: white;
          transform: translateX(8px);
        }
        
        /* Overlay de flash rojo */
        .flash-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: red;
          opacity: 0;
          pointer-events: none;
          z-index: 99999;
          transition: opacity 0.05s ease-in-out;
        }
        
        .flash-overlay.flash {
          opacity: 0.1;
        }
        
        /* Indicador de drag habilitado */
        .login-toggle-container.drag-enabled .login-toggle-btn {
          cursor: move;
          animation: drag-ready 1s ease-in-out infinite;
        }
        
        @keyframes drag-ready {
          0%, 100% {
            box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 0 rgba(255, 0, 0, 0.7);
          }
          50% {
            box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 8px rgba(255, 0, 0, 0);
          }
        }
        </style>
    `;
    
    // HTML Structure
    const html = `
        <!-- Overlay para el flash rojo -->
        <div class="flash-overlay" id="flashOverlay"></div>
        
        <div class="login-toggle-container" id="powerDanceLoginMenu">
          <div class="login-toggle-btn" id="toggleLoginMenu">
            <i class="fas fa-sign-in-alt"></i>
          </div>
          <div class="login-menu" id="loginMenu">
            <a href="https://powerdancemx.com.mx/login/" class="login-menu-item">Login</a>
            <a href="https://powerdancemx.com.mx/registration/" class="login-menu-item">Register</a>
          </div>
        </div>
    `;
    
    // Función para crear ondas
    function createRipple(e, element) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        // Eliminar la onda después de la animación
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 800);
    }
    
    // Funciones de arrastre
    function dragStart(e) {
        const container = document.getElementById('powerDanceLoginMenu');
        if (!canDrag) return;
        
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
        
        if (e.target === document.getElementById('toggleLoginMenu') || 
            e.target.parentNode === document.getElementById('toggleLoginMenu')) {
            isDragging = true;
            container.classList.add('dragging');
        }
    }
    
    function dragEnd() {
        if (!isDragging) return;
        
        const container = document.getElementById('powerDanceLoginMenu');
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
        container.classList.remove('dragging');
        
        // Mantener dentro de los límites de la pantalla
        const rect = container.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;
        
        if (currentX < 0) currentX = 0;
        if (currentY < 0) currentY = 0;
        if (currentX > maxX) currentX = maxX;
        if (currentY > maxY) currentY = maxY;
        
        xOffset = currentX;
        yOffset = currentY;
        
        setTranslate(currentX, currentY, container);
    }
    
    function drag(e) {
        if (!isDragging || !canDrag) return;
        
        e.preventDefault();
        
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }
        
        xOffset = currentX;
        yOffset = currentY;
        
        setTranslate(currentX, currentY, document.getElementById('powerDanceLoginMenu'));
    }
    
    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
    
    // Función para cargar Font Awesome si no existe
    function loadFontAwesome() {
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
            document.head.appendChild(link);
        }
    }
    
    // Función para inicializar el menú
    function initPowerDanceMenu() {
        // Cargar Font Awesome
        loadFontAwesome();
        
        // Agregar estilos
        document.head.insertAdjacentHTML('beforeend', styles);
        
        // Agregar HTML
        document.body.insertAdjacentHTML('beforeend', html);
        
        // Elementos
        const container = document.getElementById('powerDanceLoginMenu');
        const toggleBtn = document.getElementById("toggleLoginMenu");
        const loginMenu = document.getElementById("loginMenu");
        const flashOverlay = document.getElementById("flashOverlay");
        
        if (toggleBtn && loginMenu && flashOverlay && container) {
            
            // Event listener para el botón principal
            toggleBtn.addEventListener("mousedown", function(e) {
                dragStartTime = Date.now();
                
                // Configurar timeout para habilitar drag después de 3 segundos
                dragTimeout = setTimeout(() => {
                    canDrag = true;
                    container.classList.add('drag-enabled');
                }, 3000);
            });
            
            toggleBtn.addEventListener("mouseup", function(e) {
                const holdTime = Date.now() - dragStartTime;
                
                // Limpiar timeout si se suelta antes de 3 segundos
                if (dragTimeout) {
                    clearTimeout(dragTimeout);
                    dragTimeout = null;
                }
                
                // Si se mantuvo presionado menos de 3 segundos, actuar como click normal
                if (holdTime < 3000 && !isDragging) {
                    // Toggle del menú
                    loginMenu.classList.toggle("open");
                    toggleBtn.classList.toggle("open");
                    
                    // Crear ondas
                    createRipple(e, toggleBtn);
                    
                    // Efecto de flash rojo
                    flashOverlay.classList.add("flash");
                    setTimeout(function() {
                        flashOverlay.classList.remove("flash");
                    }, 80);
                }
                
                // Reset drag state después de un momento
                setTimeout(() => {
                    canDrag = false;
                    container.classList.remove('drag-enabled');
                }, 1000);
            });
            
            // Event listeners para arrastre
            container.addEventListener('mousedown', dragStart, false);
            container.addEventListener('touchstart', dragStart, false);
            
            document.addEventListener('mousemove', drag, false);
            document.addEventListener('touchmove', drag, false);
            
            document.addEventListener('mouseup', dragEnd, false);
            document.addEventListener('touchend', dragEnd, false);
            
            // Cerrar menú al hacer clic fuera
            document.addEventListener("click", function (e) {
                if (!isDragging && !toggleBtn.contains(e.target) && !loginMenu.contains(e.target)) {
                    loginMenu.classList.remove("open");
                    toggleBtn.classList.remove("open");
                }
            });
            
            // Múltiples clics para más ondas
            let clickCount = 0;
            toggleBtn.addEventListener('click', function(e) {
                if (!isDragging && !canDrag) {
                    clickCount++;
                    createRipple(e, toggleBtn);
                    
                    // Reset contador después de 1 segundo
                    setTimeout(() => {
                        clickCount = 0;
                    }, 1000);
                }
            });
        }
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPowerDanceMenu);
    } else {
        initPowerDanceMenu();
    }
    
})();