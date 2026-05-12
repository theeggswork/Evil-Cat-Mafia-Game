const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');
const keysPressed = {};

window.addEventListener('keydown', (e) => {
    keysPressed[e.code] = true;
});

window.addEventListener('keyup', (e) => {
    keysPressed[e.code] = false;
});
let mouseX;
let mouseY;
canvas.addEventListener('mousemove', (event) => {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
});

let character = {
    x: 400,
    y: 350,
    oldx: 0,
    oldy: 0,
    width: 75,
    height: 75,
}
let speedx = 0
let speedy = 0
let canshoot = true
let dx;
let dy;
let ammo = 30
let maxammo = 60
let reloadammo = 0
let pframe = 0
function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}