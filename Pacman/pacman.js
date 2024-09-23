
// Obtener el canvas y su contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ajustar el tamaño del canvas
canvas.width = 638;
canvas.height = 700;

const tileSize = 29;  // Ajustamos el tamaño para que coincida con la imagen de fondo

// Nueva matriz de mapa basada en el diseño que subiste
const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
  [1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Hacer invisible el mapa (solo funcionará como colisión)
// Hacer visible el mapa para alinearlo con la imagen de fondo
function drawMap() {
    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[row].length; col++) {
        const tile = map[row][col];
        if (tile === 1) {
          // Dibuja las paredes con un color semitransparente
          ctx.fillStyle = 'rgba(0, 0, 255, 0)'; // Azul semitransparente para las paredes
          ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        } else {
          // Dibuja el fondo con un color también semitransparente
          ctx.fillStyle = 'rgba(255, 255, 255, 0)'; // Blanco muy transparente
          ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
      }
    }
  }
  

// Dibujar el mapa al iniciar
drawMap();

// Imagen del mapa
const backgroundImg = new Image();
backgroundImg.src = 'imagenes/mapa_pacman.png';  // Ruta de la imagen que subiste

// Dibujar la imagen de fondo
backgroundImg.onload = function () {
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
};

// Imágenes de Pac-Man y orbe
const pacmanImg = new Image();
pacmanImg.src = 'imagenes/pac_man.png'; // Imagen de Pac-Man

const orbImg = new Image();
orbImg.src = 'imagenes/apple.png'; // Imagen del orbe

const pacman = { x: 1, y: 1 }; // Posición inicial de Pac-Man
const orbs = [
    { x: 5, y: 1 },
    { x: 6, y: 4 },
    { x: 13, y: 4 },
    { x: 7, y: 10 },
    
    { x: 14, y: 15 },
    { x: 11, y: 18 },
    { x: 12, y: 1 },
];

const pacmanSprites = {
    up: [new Image(), new Image(), new Image()],
    down: [new Image(), new Image(), new Image()],
    left: [new Image(), new Image(), new Image()],
    right: [new Image(), new Image(), new Image()],
};

// Cargar los sprites en sus respectivas posiciones
pacmanSprites.up[0].src = 'imagenes/pacman-up/1.png';
pacmanSprites.up[1].src = 'imagenes/pacman-up/2.png';
pacmanSprites.up[2].src = 'imagenes/pacman-up/3.png';

pacmanSprites.down[0].src = 'imagenes/pacman-down/1.png';
pacmanSprites.down[1].src = 'imagenes/pacman-down/2.png';
pacmanSprites.down[2].src = 'imagenes/pacman-down/3.png';

pacmanSprites.left[0].src = 'imagenes/pacman-left/1.png';
pacmanSprites.left[1].src = 'imagenes/pacman-left/2.png';
pacmanSprites.left[2].src = 'imagenes/pacman-left/3.png';   

pacmanSprites.right[0].src = 'imagenes/pacman-right/1.png';
pacmanSprites.right[1].src = 'imagenes/pacman-right/2.png';
pacmanSprites.right[2].src = 'imagenes/pacman-right/3.png';

// Variables para la animación
let currentFrame = 0;
const totalFrames = 3; // Tenemos 3 sprites por dirección
let frameDelay = 10; // Cambia el sprite cada 10 ciclos de juego
let frameCounter = 0;

// Direcciones y el sprite actual a dibujar
let currentDirection = 'right'; // Dirección inicial de Pac-Man

// Función para dibujar Pac-Man con animación
function drawPacman() {
    // Ciclo para cambiar el sprite
    frameCounter++;
    if (frameCounter > frameDelay) {
        currentFrame = (currentFrame + 1) % totalFrames;
        frameCounter = 0;
    }
    // Dibujar el sprite de acuerdo a la dirección actual
    ctx.drawImage(pacmanSprites[currentDirection][currentFrame], pacman.x * tileSize, pacman.y * tileSize, tileSize, tileSize);
} 


// Función para dibujar Pac-Man y orbes
function drawCharacters() {
    // Dibujar orbes
    orbs.forEach(orb => {
        ctx.drawImage(orbImg, orb.x * tileSize, orb.y * tileSize, tileSize, tileSize);
    });
    // Dibujar Pac-Man animado
    drawPacman();
}

// Función para actualizar el juego
function update() {
    drawMap();
    drawCharacters();
    requestAnimationFrame(update);
}

let collectedOrbs = 0;  // Contador de orbes recogidos

// Función para mostrar el siguiente texto



// Función para ocultar solo los textos relacionados con los orbes
function hideOrbTexts() {
    const orbTexts = document.querySelectorAll("[id^='texto']"); // Selecciona solo los elementos con id que comienzan con 'texto'
    orbTexts.forEach(text => {
        text.style.display = 'none';  // Oculta solo los textos de los orbes
    });
}

// Función para mostrar el siguiente texto con animación
function showNextText() {
    hideOrbTexts();  // Ocultar los textos de los orbes antes de mostrar el nuevo
    const textElement = document.getElementById(`texto${collectedOrbs}`);
    if (textElement) {
        textElement.style.display = 'block';  // Mostrar el texto correspondiente
        textElement.classList.add('orb-text'); // Añadir la clase de animación
        textElement.style.animation = 'popup 0.3s ease-in-out';  // Aplicar animación
    }
}

// Verificar si Pac-Man ha recogido un orbe
function checkOrbCollision() {
    for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        if (pacman.x === orb.x && pacman.y === orb.y) {
            // Pac-Man ha recogido el orbe
            orbs.splice(i, 1);  // Eliminar el orbe del array
            collectedOrbs++;    // Incrementar el contador de orbes recogidos
            showNextText();     // Mostrar el siguiente texto con animación
            break;
        }
    }
}

// Bucle del juego
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height); // Redibujar la imagen de fondo
    drawMap(); // Dibujar el mapa
    drawCharacters(); // Dibujar Pac-Man y orbes
    checkOrbCollision();  // Verificar si Pac-Man colisiona con un orbe
    requestAnimationFrame(gameLoop); // Animar el juego
}

gameLoop();  // Iniciar el bucle del juego




document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
        case 'W':  // Para manejar tanto minúsculas como mayúsculas
            if (map[pacman.y - 1][pacman.x] !== 1) pacman.y -= 1;
            currentDirection = 'up';
            break;
        case 's':
        case 'S':
            if (map[pacman.y + 1][pacman.x] !== 1) pacman.y += 1;
            currentDirection = 'down';
            break;
        case 'a':
        case 'A':
            if (map[pacman.y][pacman.x - 1] !== 1) pacman.x -= 1;
            currentDirection = 'left';
            break;
        case 'd':
        case 'D':
            if (map[pacman.y][pacman.x + 1] !== 1) pacman.x += 1;
            currentDirection = 'right';
            break;
    }
});


// Iniciar la actualización del juego
update();