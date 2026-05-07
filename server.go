package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

type Message struct {
	Type   string  `json:"type"`
	X      float64 `json:"x"`
	Y      float64 `json:"y"`
	DX     float64 `json:"dx"`
	DY     float64 `json:"dy"`
	ID     string  `json:"id"`
	HP     int     `json:"hp"`
	Target string  `json:"target"`
	Damage int     `json:"damage"`
}

var ids = make(map[*websocket.Conn]string)
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var clients = make(map[*websocket.Conn]bool)
var health = make(map[string]int)

func wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}

	clients[conn] = true

	defer func() {
		leavePacket := map[string]interface{}{
			"type": "leave",
			"id":   ids[conn],
		}

		delete(clients, conn)
		delete(ids, conn)

		for client := range clients {
			client.WriteJSON(leavePacket)
		}

		conn.Close()

		fmt.Println("Player left")
	}()

	for {
		var msg Message

		err := conn.ReadJSON(&msg)
		if err != nil {
			log.Println("WebSocket Read Error:", err)
			break
		}

		switch msg.Type {

		case "join":
			ids[conn] = msg.ID
			health[msg.ID] = 100
			broadcast(msg)
			fmt.Println("Joined:", ids[conn])

		case "character":
			id := ids[conn]
			if id == "" {
				continue
			}
			if _, exists := health[id]; !exists {
				health[id] = 100
			}
			msg.ID = id
			msg.HP = health[id]
			broadcast(msg)

		case "shoot":
			id := ids[conn]
			if id == "" {
				continue
			}
			msg.ID = id
			msg.Type = "shoot"

			broadcast(msg)
		case "hit":
			target := msg.Target

			health[target] -= msg.Damage
			if health[target] < 0 {
				health[target] = 0
			}

			broadcast(Message{
				Type: "damage",
				ID:   target,
				HP:   health[target],
			})
		}
	}

}

func broadcast(msg Message) {
	data, _ := json.Marshal(msg)

	for client := range clients {
		client.WriteMessage(websocket.TextMessage, data)
	}
}

func main() {
	http.HandleFunc("/ws", wsHandler)

	log.Println("Server running on :8080")
	http.ListenAndServe(":8080", nil)
}
