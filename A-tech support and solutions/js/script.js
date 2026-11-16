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
