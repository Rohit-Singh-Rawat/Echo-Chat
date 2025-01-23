import express, { Express } from 'express'
import http from 'http'
import cors from 'cors'
import routes from './routes'
import dotenv from 'dotenv'
import { generalLimiter } from './utils/rate-limiting'
import morgan from 'morgan'
import logger from './utils/Logger'
dotenv.config()

const app: Express = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 4001

const morganFormat = ':method :url :status :response-time ms'

app.use(cors())
app.use(express.json())
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
        }
        logger.info(JSON.stringify(logObject))
      },
    },
  })
)
app.use(generalLimiter)

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/api/v1', routes)

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

export default server
