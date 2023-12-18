const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
require('dotenv').config()
const usersRouter = require('./routes/users.js');
const candidatesRouter = require('./routes/candidates.js')
const { listDatabases } = require('./appUtils.js') 
var jwt = require('jsonwebtoken');

const app = express()
const port = 5000
app.set("trust proxy", 1);
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
    console.log(`Error connecting to the database ${error}`)
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


const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  if(typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (error, authData) => {
      if(error) {
        console.log('Unable to verify token')
        res.status(403).json({ msg: 'Unable to verify token'})        
      } else {
        console.log(`User verified with email: ${authData.user.email}`)
        req.user = authData.user
        next();
      }
    })
  } else {
    console.log('Web token not received')
    res.status(403).json({ msg: 'Web token not received'})
    
  }  
}

//Middlewares

app.use(bodyParser.json());



//Routers
app.use('/users', verifyToken, usersRouter);
app.use('/candidate', verifyToken, candidatesRouter);


//login

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const usersColl = client.db("dat").collection("users")
  const user = await usersColl.findOne({ email: username})

  if(!user) return res.status(403).json({ msg: "No user found"})

  bcrypt.compare(password, user.pwd, (err, result)=> {
    if(result) {
      jwt.sign({user}, process.env.JWT_SECRET, (err, token)=>{
        res.status(200).json({token})
      })
    } else {
      console.log(err)
      res.status(300).json({ error: "Bad Credentials"})
    }    
  })
})



main();

app.listen(port, () => {
    console.log(`Express listening on port ${port}`)
  })