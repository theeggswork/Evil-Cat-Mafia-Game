const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const keysPressed = {};
let cam = {
    X: 0,
    Y: 0,
    OX: 0,
    OY: 0,
}
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
    x: 0,
    y: 0,
    oldx: 0,
    oldy: 0,
    sx: 0,
    sy: 0,
    w: 50,
    h: 50,
}
let objectdata = []
function isColliding(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}