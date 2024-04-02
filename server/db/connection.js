import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()
const uri = process.env.ATLAS_URI || ''

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

try {
  // conexión a la base de datos
  await client.connect()

  await client.db('admin').command({ ping: 1 })
  console.log('Pinged your deployment. You successfully connected to MongoDB!')
} catch (err) {
  console.log(err)
}

let db = client.db('employees')

export default db
