function Movement() {
    character.oldx = character.x
    character.oldy = character.y
    character.sx *= 0.9
    character.sy *= 0.9
    character.x += character.sx
    character.y += character.sy
    objectdata.forEach((obj) => {
        if (isColliding(character, obj)) {
            character.x = character.oldx
            character.y = character.oldy
            character.sx = 0
            character.sy = 0
        }
    });
    requestAnimationFrame(Movement)
}

function KeyDetection() {
    if (keysPressed['KeyA'] || keysPressed['ArrowLeft']) {
        character.sx -= 0.5
        cam.OX -= 0.5
    }
    if (keysPressed['KeyD'] || keysPressed['ArrowRight']) {
        character.sx += 0.5
        cam.OX += 0.5
    }
    if (keysPressed['KeyW'] || keysPressed['ArrowUp']) {
        character.sy -= 0.5
        cam.OY -= 0.5
    }
    if (keysPressed['KeyS'] || keysPressed['ArrowDown']) {
        character.sy += 0.5
        cam.OY += 0.5
    }
    requestAnimationFrame(KeyDetection)
}
Movement()
KeyDetection()