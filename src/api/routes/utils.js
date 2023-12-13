
const { MongoClient } = require("mongodb");
require('dotenv').config()
const uri = process.env.URI;
const client = new MongoClient(uri)
const database = client.db('dat');
const users = database.collection('users');
const bcrypt = require('bcrypt');

exports.findAllUsers = async () => {
    try {
      const query = {}
      const options = {
        sort: {"email": 1},
        projection: {_id: 0, email: 1, status: 1, profile: 1}
      }
      const user = await users.find(query, options).toArray();
      console.log(user)
      return user
    } catch (error) {
      console.log(error)
      await client.close();
    }
  }

exports.findUserByName = async (name) => {
    try {
        const query = { "profile.first_name": name }
        const options = {
            projection: {_id: 0, email: 1, profile: 1, status: 1}
        }
        const user = await users.findOne(query, options);
        console.log(user)
        return user
      } catch (error) {
        console.log(error)
        await client.close();
      }
}

exports.addUser = async (user) => {
    try {
        
        bcrypt.hash(user.pwd, 10, (err, hash) => {
          user.pwd = hash
        })

        const result = await users.insertOne(user)
        console.log(result)
        return result

    } catch (error) {
        console.log(error)
        await client.close();
    }
}

exports.login = async (name, pwd) => {
  let message =  ''
    const recruiter = await this.findByName(name)
    if (!recruiter) {
      message = "no user found"
    }
    if (recruiter) {
      bcrypt.compare(pwd, recruiter.pwd, (err, result) => {
        if(result === false) {
          message =  'wrong password'
        } 
        if(result === true) {
          message = `logged in as ${recruiter.name}`
        }
      })
    }
    return message
}