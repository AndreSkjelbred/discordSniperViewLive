import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'
const express = require('express')
const mongoOptions = {}
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

const client = new MongoClient(
  'mongodb+srv://skjelbred321:iNNEWtX51dXMBjx2@cluster0.lazfdsy.mongodb.net/',
  mongoOptions
)

const clientPromise = client.connect()

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const { username } = data
    if (!username) return NextResponse.json({ status: false })
    const mongoClient = await clientPromise

    const collection = mongoClient.db('usernames').collection('usernames')

    const allUsernames = await collection.find({}).toArray()
    let usernames = allUsernames.map((username) => username.username)
    if (usernames.includes(username))
      return NextResponse.json({ status: true, usernames })
    await collection.insertOne({ username })

    usernames.push(username)

    return NextResponse.json({ status: true, usernames })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: err })
  }
}
