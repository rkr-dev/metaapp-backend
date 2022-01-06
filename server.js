import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { connectMongo } from './config/db.js'

const app = express()
connectMongo()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the root route' })
})

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log(`$$ ~ Server started running on port ${PORT}`)
})

process.on('UnhandledRejection', (err, promise) => {
  console.log(`Error occured ${err.message}`)
  server.close(() => process.exit(1))
})
