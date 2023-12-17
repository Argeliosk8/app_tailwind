const { MongoClient } = require("mongodb");
require('dotenv').config()
const uri = process.env.URI;
const client = new MongoClient(uri)
const database = "dat"
client.db(database);
const usersCollection = client.db(database).collection("users")

const names = ['Tommy', "Sheldon"]
const level = 500

const connectToDatabase = async () => {
    try {
      await client.connect();
      console.log(`Succefully connected to ${database} database`)
    } catch (error) {
      console.log(`Error connecting to the database ${error}`)
    }
  }

const setLevel = async (names, level) => {
    const nameFilter = { "profile.first_name": { $in: names } }
    const updatedLevel = { $set: { "profile.level": level } }
    try {
        await connectToDatabase()
        const result = await usersCollection.updateMany(nameFilter, updatedLevel)
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }
}

/*

  const main = async () => {
    try {
      await connectToDatabase()
    } catch (err) {
      console.log(`Error connecting to the database ${err}`)
    } finally {
      await client.close()
    }
  }

  */

  //main();
  setLevel(names, level);