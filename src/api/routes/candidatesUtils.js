const { MongoClient } = require("mongodb");
require('dotenv').config()
const uri = process.env.URI;
const client = new MongoClient(uri)
const database = client.db('dat');
const candidatesColl = database.collection('candidates');
const usersColl = client.db('dat').collection('users');

exports.submitCandidate = async (newCandidate, userEmail) => {
    const session = client.startSession();
    try {
      session.startTransaction();
  
      //find user
      console.log(userEmail)
      const user = await usersColl.findOne({ email: userEmail }, { session })
      console.log(`Filter matched a user named: ${user.profile.first_name}`)
  
      //Insert new candidate
      newCandidate.user_id = user._id
      newCandidate.sub_date = new Date()
      const result = await candidatesColl.insertOne(newCandidate, { session })
      console.log(`Candidate succesfully inserted with the id: ${result.insertedId}`)
  
      //Update users submitted candidates
      const userUpdate = await usersColl.findOneAndUpdate({_id: user._id}, { $push: { "profile.candidates": result.insertedId } }, { session })
      console.log(`successfully updated the candidates ownership of user: ${user.profile.first_name} with the new submitted candidate with ID: ${result.insertedId}`)
  
      //commiting changes
      await session.commitTransaction();
      console.log('Transacion committed')   
      let id = result.insertedId
      return id
      
    } catch (error) {
      console.log(error)
      await session.abortTransaction();
    } finally {
      await session.endSession();
      
    }
  
  }

  exports.findCandidatesByUser = async (userEmail) => {
    const session = client.startSession();
    try {
      session.startTransaction();
      //find user
      const user = await usersColl.findOne({ email: userEmail }, { session })
      console.log(`User found in the db with name: ${user.profile.first_name}`)

      //find candidates by user
      const candidates = await candidatesColl.find({ user_id: user._id}, { session }).toArray();
      const count = candidates.length
      console.log(`${count} candidates owned by ${user.profile.first_name}`)

      //commiting changes
      await session.commitTransaction();
      console.log('Transacion committed')   
      return candidates

    } catch (error) {
      console.log(error)
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }

  }