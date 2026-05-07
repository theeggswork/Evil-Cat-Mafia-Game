function Movement() {
    character.oldx = character.x
    character.oldy = character.y
    speedx *= 0.9
    speedy *= 0.9
    character.x += speedx
    character.y += speedy
    character.angle = Math.atan2(mouseY - (character.y + (character.height / 2)), mouseX - (character.x +(character.width / 2)));
    objectdata.forEach((obj, index) => { // AABB Collisions for each object inside of Object_Data
        if (isColliding(character, obj)) {
            if (obj.collision == true) {
                character.x = character.oldx;
                character.y = character.oldy;
                speedx = 0
                speedy = 0
            } else if (obj.type == "ammo") {
                maxammo += obj.value
                objectdata.splice(index, 1)
            }
        }

    });
    requestAnimationFrame(Movement)
}
function KeyDetection() {
    if (keysPressed['KeyA'] || keysPressed['ArrowLeft']) {
        speedx += -0.5
    }
    if (keysPressed['KeyD'] || keysPressed['ArrowRight']) {
        speedx += 0.5
    }
    if (keysPressed['KeyW'] || keysPressed['ArrowUp']) {
        speedy -= 0.5
    }
    if (keysPressed['KeyS'] || keysPressed['ArrowDown']) {
        speedy += 0.5
    }
    if (keysPressed['Space'] && canshoot == true && ammo > 0) { // ammo
        ShootBullet()
        canshoot = false
        ammo -= 1
        AMMO_COUNTER.classList.add("pop");
        setTimeout(() => {
            canshoot = true;
            AMMO_COUNTER.classList.remove("pop");
        }, 100);
    } else if (keysPressed[`Space`] && canshoot == true) { // no ammo
        EmptyBullets.currentTime = 0
        EmptyBullets.play()
    }
    if (keysPressed['KeyR'] && ammo < 30) { // Reload
        if (maxammo > 0) {
            ReloadBullets.currentTime = 0
            ReloadBullets.play()
            setTimeout(() => {
                AMMO_COUNTER.classList.add("big_pop")
                reloadammo = Math.min(30 - ammo, maxammo);
                ammo += reloadammo;
                maxammo -= reloadammo;
                setTimeout(() => {
                    AMMO_COUNTER.classList.remove("big_pop")
                }, 300);
            }, 1500);
        } else {
            EmptyBullets.currentTime = 0
            EmptyBullets.play()
        }

    }
    requestAnimationFrame(KeyDetection)
}
Movement()
KeyDetection()