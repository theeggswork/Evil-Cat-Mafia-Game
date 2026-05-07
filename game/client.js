const state = {
    ws: null,
    players: {},
    bullets: [],
    myId: null,
    connected: false,
    socket_status: false
};
function connect() {
    ws = new WebSocket("ws://localhost:8080/ws");

    ws.onopen = function () {
        console.log("Connected to WebSocket server");
        state.socket_status = true
        ws.send(JSON.stringify({
            type: "join",
            id: character.id
        }));
        state.myId = character.id;
    }
    ws.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.type === "character") {
            state.players[data.id] = {
                x: data.x,
                y: data.y,
                hp: data.hp
            };
        }

        if (data.type === "leave") {
            delete state.players[data.id];
        }

        if (data.type === "shoot") {
            state.bullets.push({
                x: data.x,
                y: data.y,
                dx: data.dx,
                dy: data.dy,
                owner: data.id,
                width: 25,
                height: 10,
                id: character.id
            });
        }
        if (data.type === "damage") {
            if (state.players[data.id]) {
                state.players[data.id].hp = data.hp;
            }
        }
    };

    ws.onclose = function () {
        console.log("WebSocket connection closed, retrying...");
        socket_status = false
        setTimeout(connect, 1000); // Reconnect after 1 second
    };

    ws.onerror = function (error) {
        console.error("WebSocket error:", error);
    };
};



function sendMessage() {
    if (state.socket_status && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
            type: "character",
            x: character.x,
            y: character.y,
            id: character.id
        }));
    }
}

function ShootBullet() {
    if (state.socket_status && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
            type: "shoot",
            x: character.x + (character.width / 2),
            y: character.y + (character.height / 2),
            dx: Math.cos(character.angle),
            dy: Math.sin(character.angle),

        }));
    }
}

// 20 times/sec
setInterval(sendMessage, 20);

connect();