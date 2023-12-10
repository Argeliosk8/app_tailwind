const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const recruitersRouter = require('./Routers/recruiters.js');
const { listDatabases } = require('./appUtils.js')

const app = express()
const port = 5000

// Mongodb connection configuration

const { MongoClient } = require("mongodb");
const uri = process.env.URI;
const client = new MongoClient(uri)
const database = "dat"
client.db(database);

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Succefully connected to ${database} database`)
  } catch (error) {
    console.log(`Error connecting to the database ${err}`)
  }
}

const main = async () => {
  try {
    await connectToDatabase()
    await listDatabases(client)
  } catch (err) {
    console.log(`Error connecting to the database ${err}`)
  }
}

//Middlewares

app.use(bodyParser.json());

//Routers

app.use('/recruiters', recruitersRouter);


main();

app.listen(port, () => {
    console.log(`Express listening on port ${port}`)
  })