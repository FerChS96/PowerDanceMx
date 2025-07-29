document.addEventListener("DOMContentLoaded", function () {
    const bannerHTML = `
    <style>
        .floating-breaking-news {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
            width: 100%;
            font-family: Arial, sans-serif;
            background-color: transparent;
            pointer-events: auto;
            transition: all 0.3s ease;
        }
        
        .floating-breaking-news.collapsed {
            transform: translateY(-35px);
        }
        
        .breaking-news-title {
            background-color: #cec0e1;
            height: 40px;
            width: 90px;
            font-size: 12px;
            padding: 8px 10px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 3;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            box-sizing: border-box;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .breaking-news-title:hover {
            background-color: #b8a3d1;
        }
        
        .breaking-news-title::after {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            right: -12px;
            top: 0;
            border-right: 12px solid transparent;
            border-left: 0;
            border-top: 40px solid #cec0e1;
            transition: border-top-color 0.3s ease;
        }
        
        .breaking-news-title:hover::after {
            border-top-color: #b8a3d1;
        }
        
        .breaking-news-container {
            position: relative;
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .floating-breaking-news.collapsed .breaking-news-container {
            opacity: 0;
            transform: translateY(-10px);
            pointer-events: none;
        }
        
        .breaking-news-colour {
            height: 40px;
            background-color: #5397c2;
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            z-index: 1;
        }
        
        .breaking-news-headline {
            display: block;
            position: absolute;
            top: 10px;
            left: 110px;
            right: 20px;
            height: 20px;
            line-height: 20px;
            color: white;
            white-space: nowrap;
            animation: marquee 15s linear infinite;
            font-size: 14px;
            z-index: 2;
        }
        
        .floating-breaking-news.collapsed .breaking-news-headline {
            animation-play-state: paused;
        }
        
        @keyframes marquee {
            0% { 
                transform: translateX(100%); 
            }
            100% { 
                transform: translateX(-100%); 
            }
        }
        
        @media (max-width: 600px) {
            .breaking-news-title {
                width: 70px;
                font-size: 10px;
                height: 40px;
            }
            .breaking-news-title::after {
                border-top: 40px solid #cec0e1;
            }
            .breaking-news-title:hover::after {
                border-top-color: #b8a3d1;
            }
            .breaking-news-headline {
                left: 82px;
                font-size: 12px;
                right: 10px;
            }
        }
        
    </style>
    <div class="floating-breaking-news" id="breakingNewsBanner">
        <div class="breaking-news-container">
            <div class="breaking-news-colour"></div>
            <div class="breaking-news-title" id="newsToggleBtn">NEWS</div>
            <a class="breaking-news-headline">A&O se transforma a Administrare Habit</a>
        </div>
    </div>
    `;
    
    // Crear contenedor para insertar el HTML del banner
    const bannerContainer = document.createElement('div');
    bannerContainer.innerHTML = bannerHTML;
    
    // Insertarlo al inicio del body
    document.body.appendChild(bannerContainer);
    
    
    
    // Opcional: cerrar automáticamente después de un tiempo
    // setTimeout(() => {
    //     if (!isCollapsed) {
    //         toggleBtn.click();
    //     }
    // }, 10000); // Se cierra automáticamente después de 10 segundos
});