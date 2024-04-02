import express from 'express'
import { ObjectId } from 'mongodb'

import db from '../db/connection.js'

const router = express.Router()

// ruta para obtener todos los registros de la colección "records" de la base de datos.
router.get('/', async (req, res) => {
  let collection = await db.collection('records')
  let results = await collection.find({}).toArray()
  res.send(results).status(200)
})
router.get('/:id', async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) }
  let collection = await db.collection('records')
  let result = await collection.findOne(query)

  if (!result) res.send('Not found').status(404)
  else res.send(result).status(200)
})

// ruta para crear un nuevo registro en la colección "records" de la base de datos.
router.post('/', async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    }
    let collection = await db.collection('records')
    let result = await collection.insertOne(newDocument)
    res.send(result).status(200)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error adding record')
  }
})

// ruta para actualizar un registro en la colección "records" de la base de datos.
router.put('/:id', async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) }
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    }
    let collection = await db.collection('records')
    let result = await collection.updateOne(query, updates)
    res.send(result).status(200)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error updating record')
  }
})

// ruta para eliminar un registro en la colección "records" de la base de datos.
router.delete('/:id', async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) }
    const collection = await db.collection('records')
    let result = await collection.deleteOne(query)
    res.send(result).status(200)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error deleting record')
  }
})

export default router
