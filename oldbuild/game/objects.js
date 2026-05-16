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
function Definebullet(dx, dy, x, y, width, height, angle) {
    let bulletobject = {
        dx: dx,
        dy: dy,
        x: x,
        y: y,
        width: width,
        height: height,
        angle: angle,
    }
    bulletdata.push(bulletobject)
}

function DefineText(text, x, y) {
    let textobject = {
        text: text,
        x: x,
        y: y,
    }
    textdata.push(textobject)
}

function CreateBullet() {
    let angle = Math.atan2((mouseY + cam.Y) - (character.y + (character.height / 2)), (mouseX + cam.X) - (character.x +(character.width / 2)));
    dx = Math.cos(angle) * 10
    dy = Math.sin(angle) * 10
    Definebullet(dx, dy, character.x + (character.width / 2), character.y + (character.height / 2), 25, 10, angle)
}

function BulletUpdate() {
    bulletdata.forEach((obj_bullet, bullet_index) => { // movey move move
        obj_bullet.x += obj_bullet.dx
        obj_bullet.y += obj_bullet.dy
        objectdata.forEach(obj_object => { // collide clide collide
            if (isColliding(obj_bullet, obj_object) && obj_object.collision == true) {
                bulletdata.splice(bullet_index, 1)
            }
        });
    });
    requestAnimationFrame(BulletUpdate)
}
BulletUpdate()
