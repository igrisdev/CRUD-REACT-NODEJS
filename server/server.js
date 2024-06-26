import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import records from './routes/record.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use('/record', records)

// crear el port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
  console.log(`http://localhost:${PORT}/record`)
})
