let esJugadorUno = true;
let celdas = document.getElementsByClassName("celda");
let clickCount = 0;

for (let i = 0; i < celdas.length; i++) {
    celdas[i].addEventListener('click', userMove)
}

function userMove (e) {
    let celdaValor = e.target.innerHTML;
    if (!celdaValor.length) {
        e.target.innerHTML = esJugadorUno ? 'X' : 'O';
        esJugadorUno = !esJugadorUno;

        clickCount++;

        if (clickCount === 1) {
            // Cambiar la visibilidad de la clase "info1" a visible
            let infoElement1 = document.querySelector('.info1');
            if (infoElement1) {
                infoElement1.style.visibility = 'visible';
            }
        } else if (clickCount === 2) {
            // Cambiar la visibilidad de la clase "info2" a visible
            let infoElement2 = document.querySelector('.info2');
            if (infoElement2) {
                infoElement2.style.visibility = 'visible';
            }
        } else if (clickCount === 3) {
            // Cambiar la visibilidad de la clase "info2" a visible
            let infoElement3 = document.querySelector('.info3');
            if (infoElement3) {
                infoElement3.style.visibility = 'visible';
            }
        } else if (clickCount === 4) {
            // Cambiar la visibilidad de la clase "info2" a visible
            let infoElement4 = document.querySelector('#combinaciones_ganadoras');
            if (infoElement4) {
                infoElement4.style.visibility = 'visible';
            }
        } else if (clickCount === 5) {
            // Cambiar la visibilidad de la clase "info2" a visible
            let infoElement5 = document.querySelector('#combinaciones_perdedoras');
            if (infoElement5) {
                infoElement5.style.visibility = 'visible';
            }
        }
        

        checkLinea(0, 1, 2);
        checkLinea(3, 4, 5);
        checkLinea(6, 7, 8);
        checkLinea(0, 3, 6);
        checkLinea(1, 4, 7);
        checkLinea(2, 5, 8);
        checkLinea(0, 4, 8);
        checkLinea(2, 4, 6);    
    }
}

function checkLinea (c1, c2, c3) {
    if (celdas[c1].innerHTML && 
        celdas[c1].innerHTML === celdas[c2].innerHTML && 
        celdas[c1].innerHTML === celdas[c3].innerHTML
    ) {
       mostrarGanador(celdas[c1].innerHTML);
    }
}

function mostrarGanador (ganador) {
    //document.querySelector('#resultados').innerHTML = ganador + ' ha ganado!';
}