
const { MongoClient } = require("mongodb");
require('dotenv').config()

const uri = process.env.URI;

const client = new MongoClient(uri)

exports.run = async (query) => {
  try {
    const database = client.db('dat');
    const recruiters = database.collection('recruiters');
    const options = {
      sort: {"name": -1},
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
