let objectdata = []
let bulletdata = []
function Defineblock(x, y, width, height, collision, img, type, value) {
    let newobject = {
        x: x,
        y: y,
        width: width,
        height: height,
        collision: collision,
        img: ("img/" + img),
        type: type,
        value: value,
    }
    objectdata.push(newobject)
}
function Definebullet(dx, dy, x, y, width, height) {
    let bulletobject = {
        dx: dx,
        dy: dy,
        x: x,
        y: y,
        width: width,
        height: height
    }
    bulletdata.push(bulletobject)
}

function CreateBullet() {
    let angle = Math.atan2(mouseY - character.y, mouseX - character.x);
    dx = Math.cos(angle) * 10
    dy = Math.sin(angle) * 10
    Definebullet(dx, dy, character.x, character.y, 25, 10)
}

function BulletUpdate() {
    bulletdata.forEach((obj_bullet, bullet_index) => { // movey move move
        obj_bullet.x += obj_bullet.dx
        obj_bullet.y += obj_bullet.dy
        objectdata.forEach(obj_object => { // collide clide collide
        if (isColliding(obj_bullet, obj_object)) {
            bulletdata.splice(bullet_index, 1)
        }
    });
    });
    requestAnimationFrame(BulletUpdate)
}
BulletUpdate()
