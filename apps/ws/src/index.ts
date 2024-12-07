import { WebSocketServer } from 'ws'
import { User } from './Models/User'

const wss = new WebSocketServer({ port: 4000 })
console.log('WebSocket server started on port 4000')

wss.on('connection', function connection(ws) {
  console.log('New client connected')
  new User(ws)
  console.log('Created new user instance')
})
