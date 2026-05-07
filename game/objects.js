let objectdata = []
let bulletdata = []
let textdata = []
function Defineblock(x, y, width, height, collision, img, type, value) {
    let newobject = {
        x: x,
        y: y,
        width: width,
        height: height,
        collision: collision,
        img: img,
        type: type,
        value: value,
    }
    objectdata.push(newobject)
}

function DefineText(text, x, y) {
    let textobject = {
        text: text,
        x: x,
        y: y,
    }
    textdata.push(textobject)
}

function BulletUpdate() {
    for (let i = state.bullets.length - 1; i >= 0; i--) {
        const obj_bullet = state.bullets[i];

        // move bullet
        obj_bullet.x += obj_bullet.dx * 10;
        obj_bullet.y += obj_bullet.dy * 10;

        // world collision
        for (const obj_object of objectdata) {
            if (obj_object.collision && isColliding(obj_bullet, obj_object)) {
                state.bullets.splice(i, 1);
                break;
            }
        }

        // if bullet got removed, skip everything else
        if (!state.bullets[i]) continue;

        // player collision
        for (const playerId in state.players) {
            const p = state.players[playerId];

            if (playerId === obj_bullet.owner) continue;

            if (isColliding(obj_bullet, {
                x: p.x,
                y: p.y,
                width: 75,
                height: 75
            })) {
                ws.send(JSON.stringify({
                    type: "hit",
                    target: playerId,
                    damage: 10
                }));

                state.bullets.splice(i, 1);
                break;
            }
        }

        // if bullet got removed, skip bounds check
        if (!state.bullets[i]) continue;

        // out of bounds cleanup
        if (
            obj_bullet.x < -100 || obj_bullet.x > canvas.width + 100 ||
            obj_bullet.y < -100 || obj_bullet.y > canvas.height + 100
        ) {
            state.bullets.splice(i, 1);
        }
    }

    requestAnimationFrame(BulletUpdate);
}
BulletUpdate()