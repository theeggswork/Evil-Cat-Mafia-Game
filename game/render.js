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
const hp_counter_frames = [
    'url("img/hp_counterbg1.svg")',
    'url("img/hp_counterbg2.svg")',
    'url("img/hp_counterbg3.svg")'
]
const player_frames = player_f_data.map(src => {
    const p_img = new Image();
    p_img.src = src;
    return p_img;
});
let ammo_count_frame = 0
let AMMO_COUNTER = document.getElementById("AMMO_COUNTER");
let HP_COUNTER = document.getElementById("HP_COUNTER")
setInterval(() => { // Ammo-Counter Rendering
    AMMO_COUNTER.style.backgroundImage = ammo_counter_frames[ammo_count_frame];
    ammo_count_frame = (ammo_count_frame + 1) % ammo_counter_frames.length;
}, 200);
setInterval(() => {
    pframe = (pframe + 1) % player_frames.length;
}, 100);
setInterval(() => { // Ammo-Counter Rendering
    HP_COUNTER.style.backgroundImage = hp_counter_frames[ammo_count_frame];
    ammo_count_frame = (ammo_count_frame + 1) % ammo_counter_frames.length;
}, 200);


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
    state.bullets.forEach(obj => {
    ctx.fillRect(obj.x, obj.y, 25, 10);
});
    textdata.forEach(obj => { // Text
        ctx.fillText(obj.text, obj.x, obj.y)
    });
    for (const id in state.players) {

        const p = state.players[id];

        ctx.drawImage(player_frames[pframe], p.x, p.y, 75, 75);
    }
    AMMO_COUNTER.textContent = `${ammo} / ${maxammo}`
    for (const id in state.players) {
        const p = state.players[id];
        HP_COUNTER.textContent = `${p.hp}`
    }
    requestAnimationFrame(renderobjects)
}
renderobjects()