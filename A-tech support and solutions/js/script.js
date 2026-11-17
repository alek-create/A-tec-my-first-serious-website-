console.log("JavaScript is geladen!");

const closeMenu = document.getElementById('close-menu');
const menuButton = document.getElementById('menu-button');
const sidebar = document.getElementById('sidebar');

menuButton.addEventListener("click", function() {
    console.log("Menu knop geklikt!");
    sidebar.classList.toggle("open");
});

closeMenu.addEventListener("click", function() {
    console.log("Sluit knop geklikt!");
    sidebar.classList.remove("open");
});

document.querySelectorAll(".menu > button").forEach(function(button) {
    const submenu = document.getElementById(button.getAttribute("aria-controls"));

    button.addEventListener("click", function() {
        const isOpen = submenu.classList.toggle("open");
        button.setAttribute("aria-expanded", isOpen);
    });
});


// =================================
// Bewegende achtergrondvormen
// =================================

const shapeContainer = document.getElementById("floating-shapes");

const shapeTypes = ["circle", "square", "diamond"];

const shapeColors = [
    "#5dfce9",
    "#145c74",
    "#11d694",
    "#2c3c97",
    "#ffffff"
];
const shapes = [];

for (let i = 0; i < 85; i++) {

    const shape = document.createElement("div");

    const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

    const size = Math.random() * 3 + 7;

    shape.classList.add("floating-shape", type);

    const color = shapeColors[Math.floor(Math.random() * shapeColors.length)];

    shape.style.backgroundColor = color;
    shape.style.opacity = Math.random() * 0.25 + 0.10;

    shape.style.width = size + "px";
    shape.style.height = size + "px";

    shape.style.left = Math.random() * 100 + "%";
    shape.style.top = Math.random() * 100 + "%";
    shape.dataset.phase = Math.random() * Math.PI * 2;
    shape.dataset.speed = Math.random() * 0.3 + 0.2;
    shape.dataset.moveX = Math.random() * 30 + 10;
    shape.dataset.moveY = Math.random() * 30 + 10;

    shapeContainer.appendChild(shape);
    shapes.push(shape);
}

// =================================
// Muispositie bijhouden
// =================================

let mouseX = -1000;
let mouseY = -1000;

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// =================================
// Muisinteractie
// =================================

function updateShapes() {

    const time = performance.now() / 1000;

    shapes.forEach(shape => {

        const phase = Number(shape.dataset.phase);
        const speed = Number(shape.dataset.speed);

        // Zweefbeweging
        const moveX = Math.sin(time * speed + phase) * Number(shape.dataset.moveX);
        const moveY = Math.cos(time * speed + phase) * Number(shape.dataset.moveY);

        // Positie bepalen
        const rect = shape.getBoundingClientRect();

        const shapeX = rect.left + rect.width / 2;
        const shapeY = rect.top + rect.height / 2;

        // Afstand tot muis
        const distance = Math.hypot(mouseX - shapeX, mouseY - shapeY);

        const influence = Math.max(0, 1 - distance / 180);
        const scale = 1 + influence * 1;

        // Vormgeving en beweging combineren
        const rotation = shape.classList.contains("diamond") ? 45 : 0;

        shape.style.transform =
            `translate(${moveX}px, ${moveY}px) scale(${scale}) rotate(${rotation}deg)`;
    });

    requestAnimationFrame(updateShapes);
}

updateShapes();