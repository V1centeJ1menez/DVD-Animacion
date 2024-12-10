// Inicializar posición del SVG
const svgElement = document.getElementById('bouncing-svg');
const container = document.getElementById('container');
let dx = 3; // Velocidad en X
let dy = 3; // Velocidad en Y
let position = { x: 0, y: 0 }; // Posición inicial del SVG

// Verificar si el SVG está en el DOM
if (svgElement) {
    // Establecer un tamaño predeterminado para los SVG
    svgElement.style.width = '100px'; // Ancho del SVG
    svgElement.style.height = '100px'; // Alto del SVG

    const updatePosition = () => {
        const rect = container.getBoundingClientRect();
        const svgWidth = svgElement.offsetWidth;
        const svgHeight = svgElement.offsetHeight;

        position.x += dx;
        position.y += dy;

        // Comprobaciones de colisión con los bordes
        if (position.x + svgWidth >= rect.width || position.x <= 0) {
            dx *= -1; // Invertir dirección en X
        }
        if (position.y + svgHeight >= rect.height || position.y <= 0) {
            dy *= -1; // Invertir dirección en Y
        }

        svgElement.style.transform = `translate(${position.x}px, ${position.y}px)`;
    };

    // Ajustar la posición del SVG al cambiar el tamaño de la ventana
    const handleResize = () => {
        const rect = container.getBoundingClientRect();
        position.x = Math.max(0, Math.min(position.x, rect.width - svgElement.offsetWidth));
        position.y = Math.max(0, Math.min(position.y, rect.height - svgElement.offsetHeight));
        svgElement.style.transform = `translate(${position.x}px, ${position.y}px)`;
    };

    window.addEventListener('resize', handleResize);

    // Actualización del SVG cargado mediante botones
    document.querySelectorAll('button[data-svg]').forEach(button => {
        button.addEventListener('click', () => {
            const svgName = button.getAttribute('data-svg');
            const svgPath = `objetos/${svgName}.svg`;

            fetch(svgPath)
                .then(response => response.text())
                .then(svgData => {
                    svgElement.innerHTML = svgData;
                    svgElement.style.width = '100px'; // Restablecer tamaño predeterminado después de cargar el nuevo SVG
                    svgElement.style.height = '100px'; // Restablecer tamaño predeterminado después de cargar el nuevo SVG
                    handleResize(); // Asegurarse de ajustar la posición al cambiar el SVG
                })
                .catch(error => console.error('Error al cargar el SVG:', error));
        });
    });

    // Animación del movimiento
    setInterval(updatePosition, 16); // ~60 FPS
} else {
    console.error('El contenedor SVG no está presente en el DOM');
}
