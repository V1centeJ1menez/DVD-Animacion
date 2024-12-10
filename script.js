// Variables para las dimensiones de la pantalla
const container = document.getElementById('container');
const svg = document.getElementById('dvd-logo');
let posX = container.clientWidth / 2 - svg.clientWidth / 2; // Centra el logo inicial
let posY = container.clientHeight / 2 - svg.clientHeight / 2; // Centra el logo inicial
let dirX = 1; // Dirección inicial derecha
let dirY = 1; // Dirección inicial abajo
const speed = 5; // Velocidad de movimiento

function move() {
    // Actualizar posición
    posX += dirX * speed; // Mueve de `speed` en `speed` unidades cada vez
    posY += dirY * speed; // Mueve de `speed` en `speed` unidades cada vez

    // Rebotar al chocar con las paredes
    if (posX <= 0 || posX >= container.clientWidth - svg.clientWidth) {
        dirX *= -1; // Inversa dirección horizontal
    }
    if (posY <= 0 || posY >= container.clientHeight - svg.clientHeight) {
        dirY *= -1; // Inversa dirección vertical
    }

    // Aplicar la nueva posición
    svg.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(move); // Llama a move nuevamente en el siguiente frame
}

move(); // Iniciar animación
