let renderimage = new Image()
const ammo_counter_frames = [
    'url("img/ammo_counterbg1.svg")',
    'url("img/ammo_counterbg2.svg")',
    'url("img/ammo_counterbg3.svg")'
];
const player_frames = [
    "img/Idle.svg",
    "img/Idle4.svg",
    "img/Idle2.svg",
    "img/Idle3.svg",
    "img/Idle5.svg"
]
let frame = 0
let AMMO_COUNTER = document.getElementById("AMMO_COUNTER");
setInterval(() => { // Ammo-Counter Rendering
    AMMO_COUNTER.style.backgroundImage = ammo_counter_frames[frame];
    frame = (frame + 1) % ammo_counter_frames.length;
}, 200);
setInterval(() => { // Ammo-Counter Rendering
    catimage = new Image()
    catimage.src = player_frames[pframe];
    pframe = (pframe + 1) % player_frames.length;
}, 100);


function renderobjects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FF0000";
    objectdata.forEach(obj => {
        if (obj.img != "") { // Objects
            let renderimage = new Image()
            renderimage.src = obj.img
            ctx.drawImage(renderimage, obj.x, obj.y, obj.width, obj.height)
        } else {
            ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
        }
    });
    bulletdata.forEach(obj => { // Bullets
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
    });
    ctx.drawImage(catimage, character.x, character.y, character.width, character.height) // Character
    ctx.fillText('You cant actually kill the enemies with the gun. Go into a battle or smt', 50, 50);
    AMMO_COUNTER.textContent = `${ammo} / ${maxammo}`
    requestAnimationFrame(renderobjects)
}
renderobjects()