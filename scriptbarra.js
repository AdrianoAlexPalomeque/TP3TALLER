const ScrollControl = {
    isScrollEnabled: true,
    gameCompleteCallbacks: [],
    activeZone: null,  // Para saber qué zona está activa
    zonesWithGames: {
        'zona3': { gameStarted: false, iframeId: 'pacmanIframe' }, // Pac-Man en la zona 2
        // Aquí puedes añadir más zonas con minijuegos en el futuro
    },

    init: function() {
        this.initProgressBar();
    },

    enableScrolling: function() {
        document.body.style.overflow = 'auto';
        this.isScrollEnabled = true;
        console.log('Scroll habilitado');
    },

    disableScrolling: function() {
        document.body.style.overflow = 'hidden';
        this.isScrollEnabled = false;
        console.log('Scroll deshabilitado');
    },

    onGameComplete: function(callback) {
        this.gameCompleteCallbacks.push(callback);
    },

    initProgressBar: function() {
        const porcentaje = document.querySelector('.porcentaje');
        const progreso = document.querySelector('.progreso');
        const icono = document.querySelector('.icono-movil');
        const zonas = ['zona0', 'zona1', 'zona2', 'zona3', 'zona4']; // Lista de zonas

        const updateProgress = (percent) => {
            porcentaje.textContent = percent + '%';
            const newHeight = percent * 8;
            progreso.style.height = newHeight + 'px';
            icono.style.top = newHeight + 'px';
        };

        // Detectar cuando se intersecta una zona
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const zonaClass = entry.target.classList[1]; // Capturamos la clase de la zona
                    const zonaIndex = zonas.indexOf(zonaClass); // Obtenemos el índice de la zona
                    if (zonaIndex !== -1) {
                        const progressPercent = zonaIndex * 25;
                        updateProgress(progressPercent);

                        // Si la zona tiene un juego y no ha sido iniciado aún
                        if (this.zonesWithGames[zonaClass] && !this.zonesWithGames[zonaClass].gameStarted) {
                            this.startGameForZone(zonaClass);
                        }
                    }
                }
            });
        }, { threshold: 0.5 });

        // Observar las zonas definidas
        zonas.forEach(zona => {
            const element = document.querySelector(`.${zona}`);
            if (element) {
                observer.observe(element);
            }
        });
    },

    // Iniciar el juego correspondiente a la zona detectada
    startGameForZone: function(zonaClass) {
        this.disableScrolling();  // Deshabilitar scroll al iniciar el juego
        this.activeZone = zonaClass;
        this.zonesWithGames[zonaClass].gameStarted = true;

        // Enfocar el iframe del juego correspondiente
        const iframeId = this.zonesWithGames[zonaClass].iframeId;
        document.getElementById(iframeId).contentWindow.focus();

        console.log(`Juego en la zona ${zonaClass} iniciado`);
    },

    // Finalizar el juego de la zona actual y habilitar scroll
    endGameForZone: function(zonaClass) {
        this.enableScrolling();
        this.activeZone = null;
        this.zonesWithGames[zonaClass].gameStarted = false;
        console.log(`Juego en la zona ${zonaClass} completado, scroll habilitado`);
    }
};

// Inicializar el control de scroll y la barra de progreso
ScrollControl.init();

// Escuchar mensajes desde los iframes de los juegos
window.addEventListener('message', function(event) {
    if (event.data === 'gameComplete' && ScrollControl.activeZone) {
        ScrollControl.endGameForZone(ScrollControl.activeZone);
    }
}, false);