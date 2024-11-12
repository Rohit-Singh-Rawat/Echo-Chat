import WebSocket, { WebSocketServer } from 'ws'

const PORT = 8080
const wss: WebSocketServer = new WebSocket.Server({ port: PORT })

interface Message {
  action: string
  room?: string
  data?: string
}

interface Client extends WebSocket {
  currentRoom?: string
}

const rooms: { [key: string]: Set<Client> } = {}

wss.on('connection', (ws: Client) => {
  ws.on('message', (message: string) => {
    try {
      const parsedMessage: Message = JSON.parse(message)

      switch (parsedMessage.action) {
        case 'join':
          if (parsedMessage.room) {
            if (!rooms[parsedMessage.room]) {
              rooms[parsedMessage.room] = new Set<Client>()
            }
            if (ws.currentRoom && rooms[ws.currentRoom]) {
              // rooms[ws.currentRoom ].delete(ws);
            }
            rooms[parsedMessage.room]?.add(ws)
            ws.currentRoom = parsedMessage.room
            ws.send(
              JSON.stringify({ action: 'joined', room: parsedMessage.room })
            )
          }
          break

        case 'leave':
          if (ws.currentRoom && rooms[ws.currentRoom]) {
            rooms[ws.currentRoom]?.delete(ws)
            ws.currentRoom = undefined
            ws.send(
              JSON.stringify({ action: 'left', room: parsedMessage.room })
            )
          }
          break

        case 'message':
          if (ws.currentRoom && rooms[ws.currentRoom]) {
            rooms[ws.currentRoom]?.forEach((client) => {
              if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(
                  JSON.stringify({
                    action: 'message',
                    room: ws.currentRoom,
                    data: parsedMessage.data,
                  })
                )
              }
            })
          }
          break

        default:
          ws.send(
            JSON.stringify({ action: 'error', message: 'Unknown action' })
          )
          break
      }
    } catch (e) {
      ws.send(
        JSON.stringify({ action: 'error', message: 'Invalid message format' })
      )
    }
  })

  ws.on('close', () => {
    if (ws.currentRoom && rooms[ws.currentRoom]) {
      rooms[ws.currentRoom]?.delete(ws)
    }
  })

  ws.send(
    JSON.stringify({
      action: 'welcome',
      message: 'Welcome to the WebSocket server!',
    })
  )
})

console.log(`WebSocket server is running on ws://localhost:${PORT}`)
