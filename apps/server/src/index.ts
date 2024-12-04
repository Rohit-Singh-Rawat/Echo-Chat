import express, { Express } from 'express'
import http from 'http'
import cors from 'cors'
import routes from './routes'
// import { errorHandler } from './middleware/errorHandler'
import dotenv from 'dotenv'
dotenv.config()
const app: Express = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 4001

app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/api/v1', routes)

// Error handling
// app.use(errorHandler)

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

export default server
