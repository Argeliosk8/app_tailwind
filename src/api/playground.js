require('dotenv').config()
const { addRecruiter } = require('./routes/usersUtils')
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

const newCandidate = {
  first_name: 'James',
  last_name: 'Rodriguez',
  email: 'james@gmail.com',
  phone: '333-558-8899',
  resume: null,
  sub_date: new Date()
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


const submitCandidate = async () => {
  const session = client.startSession();
  try {
    session.startTransaction();

    //find user
    const usersColl = client.db('dat').collection('users')
    const user = await usersColl.findOne({ 'profile.first_name': 'Argelio' }, { session })
    console.log(`Filter matched a user named: ${user.profile.first_name}`)

    //Insert new candidate
    const candidatesColl = client.db('dat').collection('candidates')
    newCandidate.user_id = user._id
    const result1 = await candidatesColl.insertOne(newCandidate, { session })
    console.log(`Candidate succesfully inserted with the id: ${result1.insertedId}`)

    //Update users submitted candidates
    const result2 = await usersColl.findOneAndUpdate({_id: user._id}, { $push: { "profile.candidates": result1.insertedId } }, { session })
    console.log(`successfully updated the candidates ownership of user: ${user.profile.first_name} with the new submitted candidate with ID: ${result1.insertedId}`)

    //commiting changes
    await session.commitTransaction();
    console.log('Transacion committed')   

  } catch (error) {
    console.log(error)
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }

}

submitCandidate();

//insertUser(newUser);

