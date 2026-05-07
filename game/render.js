let renderimage = new Image()
const ammo_counter_frames = [
    'url("img/ammo_counterbg1.svg")',
    'url("img/ammo_counterbg2.svg")',
    'url("img/ammo_counterbg3.svg")'
];
const player_f_data = [
    "img/Idle.svg",
    "img/Idle4.svg",
    "img/Idle2.svg",
    "img/Idle3.svg",
    "img/Idle5.svg"
]
const player_frames = player_f_data.map(src => {
    const p_img = new Image();
    p_img.src = src;
    return p_img;
});
let frame = 0
let AMMO_COUNTER = document.getElementById("AMMO_COUNTER");
setInterval(() => { // Ammo-Counter Rendering
    AMMO_COUNTER.style.backgroundImage = ammo_counter_frames[frame];
    frame = (frame + 1) % ammo_counter_frames.length;
}, 200);
setInterval(() => {
    pframe = (pframe + 1) % player_frames.length;
}, 100);


function renderobjects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FF0000";
    objectdata.forEach(obj => {
        if (obj.img != "") { // Objects
            ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height)
        } else {
            ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
        }
    });
    bulletdata.forEach(obj => { // Bullets
        ctx.save();               // Save current state
        ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2); // Move to object center
        ctx.rotate(obj.angle);      // Rotate the canvas
        // Draw relative to the new origin (0,0 is now the center)
        ctx.fillRect(-obj.width / 2, -obj.height / 2, obj.width, obj.height)
        ctx.restore();
    });
    textdata.forEach(obj => { // Text
        ctx.fillText(obj.text, obj.x, obj.y)
    });
    ctx.drawImage(player_frames[pframe], character.x, character.y, character.width, character.height) // Character
    AMMO_COUNTER.textContent = `${ammo} / ${maxammo}`
    requestAnimationFrame(renderobjects)
}
renderobjects()