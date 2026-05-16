function render() {
    cam.X = character.x - (canvas.width / 2) + cam.OX
    cam.Y = character.y - (canvas.height / 2) + cam.OY
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(-cam.X, -cam.Y)
    ctx.clearRect(cam.X, cam.Y,  canvas.width, canvas.height);
    ctx.fillRect(character.x, character.y, character.w, character.h)
    objectdata.forEach((obj) => {
        ctx.fillRect(obj.x, obj.y, obj.w, obj.h)
    });
    requestAnimationFrame(render)
}

render()