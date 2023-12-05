const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
const { MongoClient } = require("mongodb");
require('dotenv').config()

const uri = process.env.URI;

const client = new MongoClient(uri)

async function run() {
  try {
    const database = client.db('dat');
    const recruiters = database.collection('recruiters');
    const options = {
      sort: {"name": 1},
      projection: {_id: 0, name: 1, reqs: 1}
    }
    const recruiter = await recruiters.find(query, options).toArray();
    console.log(recruiter)
    return recruiter
  } catch (error) {
    console.log(error)
    await client.close();
  }
}

app.use(bodyParser.json());

app.param('status', (req, res, next, stat) => {
  const status = String(stat)
  req.status = status
})

app.get('/hello', async (req, res) => {
    const recruiter = await run()
    res.send(recruiter)
  })
  
  app.get('/hello/:status', (req, res) => {
    const query = { status: req.status}
    const collection = "recruiters"
    run()

  })

  app.listen(port, () => {
    console.log(`Express listening on port ${port}`)
  })