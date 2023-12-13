require('dotenv').config()
const { addRecruiter } = require('./routes/utils')
const { MongoClient } = require("mongodb");
const uri = process.env.URI;
const client = new MongoClient(uri)
const database = "dat"
client.db(database);

const newUser = {
    email: "argelio@gmail.com",
    pwd: "welcome",
    reqs: [],
    status: "Active",
    profile: {
        first_name: "Argelio",
        last_name: "Baca",
        role: "Manager",
        reqs: [],
        reports: []
    }

}

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Succefully connected to ${database} database`)
  } catch (error) {
    console.log(`Error connecting to the database ${error}`)
  }
}

const insertUser = async (newUser) => {
  try {
    await connectToDatabase()
    await addRecruiter(newUser)
  } catch (err) {
    console.log(`Error connecting to the database ${err}`)
  } finally {
    await client.close()
  }
}

insertUser(newUser);

