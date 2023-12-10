
const { MongoClient } = require("mongodb");
require('dotenv').config()
const uri = process.env.URI;
const client = new MongoClient(uri)
const database = client.db('dat');
const recruiters = database.collection('recruiters');


exports.findAllRecruiters = async () => {
    try {
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
        const result = await recruiters.insertOne(recruiter)
        console.log(result)
        return result

    } catch (error) {
        console.log(error)
        await client.close();
    }
}