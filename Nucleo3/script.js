document.getElementById('principal-point').addEventListener('click', function() {
    showInfo('principal-info');
    resetPlanetImage(); // Vuelve al planeta original
});

document.getElementById('npc-point').addEventListener('click', function() {
    showInfo('npc-info');
    resetPlanetImage(); // Vuelve al planeta original
});

document.getElementById('procedural-point').addEventListener('click', function() {
    showInfo('procedural-info');
    resetPlanetImage(); // Vuelve al planeta original
});

document.getElementById('critico1-point').addEventListener('click', function() {
    showInfo('critico1-info');
    changePlanetImage('imagenes_nucleo3/Planeta_base_nucleo3_rojo.png'); // Cambia la imagen del planeta
});

document.getElementById('critico2-point').addEventListener('click', function() {
    showInfo('critico2-info');
    changePlanetImage('imagenes_nucleo3/Planeta_base_nucleo3_rojo.png'); // Cambia la imagen del planeta
});

function showInfo(id) {
    // Oculta todo el contenido
    document.querySelectorAll('.info-content').forEach(function(content) {
        content.classList.remove('active', 'popup-animation');
        content.style.display = 'none'; // Ocultar todo inicialmente
    });

    // Muestra solo el contenido seleccionado
    const contentToShow = document.getElementById(id);
    contentToShow.style.display = 'block'; // Mostrar el contenido seleccionado
    contentToShow.classList.add('active', 'popup-animation'); // Añadir la clase para la animación

    // Remueve la animación después de que termine
    setTimeout(function() {
        contentToShow.classList.remove('popup-animation');
    }, 300); // Duración de la animación es 300ms
}

function changePlanetImage(imageSrc) {
    // Cambia la imagen del planeta
    document.getElementById('planet-image').src = imageSrc;
}

function resetPlanetImage() {
    // Vuelve a la imagen original del planeta
    document.getElementById('planet-image').src = 'imagenes_nucleo3/Planeta_base_nucleo3.png';
}

// Selecciona todos los divs con la clase 'point'
const points = document.querySelectorAll('.point img');

// Añade un evento 'click' a cada imagen dentro de los divs 'point'
points.forEach(point => {
    point.addEventListener('click', function() {
        // Restablece todas las imágenes a su estado normal
        points.forEach(p => {
            p.src = p.src.replace('_azul', ''); // Remueve '_azul' para volver al estado normal
        });

        // Cambia la imagen seleccionada a la versión azul
        point.src = point.src.replace('.png', '_azul.png');
    });
});
