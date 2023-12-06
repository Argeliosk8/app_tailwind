
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


exports.findAllRecruiters = async () => {
    try {
      const database = client.db('dat');
      const recruiters = database.collection('recruiters');
      const query = {}
      const options = {
        sort: {"name": 1},
        projection: {_id: 0, name: 1, reqs: 1, status: 1}
      }
      const recruiter = await recruiters.find(query, options).toArray();
      console.log(recruiter)
      return recruiter
    } catch (error) {
      console.log(error)
      await client.close();
    }
  }

exports.findByName = async (name) => {
    try {
        const database = client.db('dat');
        const recruiters = database.collection('recruiters');
        const query = { name: name }
        const options = {
            projection: {_id: 0, name: 1, reqs: 1, status: 1}
        }
        const recruiter = await recruiters.findOne(query, options);
        console.log(recruiter)
        return recruiter
      } catch (error) {
        console.log(error)
        await client.close();
      }
}

exports.addRecruiter = async (recruiter) => {
    try {
        const database = client.db('dat');
        const recruiters = database.collection('recruiters');
        const result = await recruiters.insertOne(recruiter)
        console.log(result)
        return result

    } catch (error) {
        console.log(error)
        await client.close();
    }
}