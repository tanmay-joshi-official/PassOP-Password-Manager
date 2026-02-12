require("dotenv").config();

const express = require('express')
const { MongoClient } = require('mongodb')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(bodyparser.json())

// Connection url
const url = process.env.MONGO_URI
const client = new MongoClient(url)

// Database name
const dbName = 'PassOP'


async function startServer() {
    await client.connect()

    // Get all the passwords
    app.get('/:userId', async (req, res) => {
        const db = client.db(dbName)
        const collection = db.collection('passwords')
        const findResult = await collection.find({userId: req.params.userId}).toArray()
        res.json(findResult)
    })

    // Save a password
    app.post('/', async (req, res) => {
        const password = req.body
        const db = client.db(dbName)
        const collection = db.collection('passwords')
        const findResult = await collection.insertOne(password)
        res.send({ success: true, result: findResult })
    })

    // Delete a password
    app.delete('/', async (req, res) => {
        const password = req.body
        const db = client.db(dbName)
        const collection = db.collection('passwords')
        const findResult = await collection.deleteOne(password)
        res.send({ success: true, result: findResult })
    })

    // Deletes all passwords
    app.delete('/all/:userId', async (req, res) => {
        const db = client.db(dbName)
        const collection = db.collection('passwords')
        const findResult = await collection.deleteMany({userId: req.params.userId})
        res.send({ success: true, result: findResult })
    })

    app.listen(port, () => {
        console.log(`App is ruunning at port ${port}`)
    })
}

startServer()
