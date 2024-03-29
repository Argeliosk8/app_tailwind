const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
require('dotenv').config()
const usersRouter = require('./routes/users.js');
const candidatesRouter = require('./routes/candidates.js')
const { listDatabases, checkHash } = require('./appUtils.js') 
const { addUser } = require('./routes/usersUtils.js')
var jwt = require('jsonwebtoken');

const app = express()
const port = 5000
//app.set("trust proxy", 1);
// Mongodb connection configuration

const { MongoClient } = require("mongodb");
const uri = process.env.URI;
const client = new MongoClient(uri)
const database = "dat"
client.db(database, { useNewUrlParser: true, useUnifiedTopology: true });
const usersCollection = client.db("dat").collection("users")

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
  const candidate = req.candidate
  const bearerHeader = req.headers['authorization']
  console.log(candidate)
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


// storage and multer configurations
const storage = new Storage({
  keyFilename: 'credentials/credentials.json',
});

const bucket = storage.bucket('dat_resumes');
const storageMulter = multer.memoryStorage();
const upload = multer({ storage: storageMulter });
const expiration = Date.now() + 15 * 60 * 1000;

const uploadImageToStorage = async (file) => {
  const filename = Date.now() + '_' + file.originalname;
  const fileUpload = bucket.file(filename);

  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  stream.end(file.buffer);

  return new Promise( (resolve, reject) => {
    stream.on('finish', async () => {
      const file = storage.bucket('dat_resumes').file(filename);
      //const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: expiration,
      });
      resolve(url);
    });

    stream.on('error', (err) => {
      reject(`Unable to upload image, ${err}`);
    });
  });
};

//test upload route
app.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const imageUrl = await uploadImageToStorage(file);

  console.log(imageUrl)


  res.send('File uploaded successfully.');
});


//Middlewares
app.use(bodyParser.json());

const corsOptions = { origin: 'http://localhost:3000' }
app.use(cors(corsOptions))



//Routers
app.use('/users', verifyToken, usersRouter);
app.use('/candidate', verifyToken, candidatesRouter);


//login

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await usersCollection.findOne({ email: username})

  if(!user) return res.status(403).json({ msg: "No user found"})
  
  const resultHashCheck = bcrypt.compareSync(password, user.pwd)

  if(resultHashCheck) {
    jwt.sign({user}, process.env.JWT_SECRET, (err, token)=>{
      if(!err) {
        console.log(`Successfully logged in and created token for user: ${user.profile.first_name} ${user.profile.last_name}`)
        res.status(200).json({token, user})
      } else {
        console.log(err)
        res.status(403).json({msg: err})
      }        
    })
  } else {
    console.log("Bad Credentials")
    res.status(300).json({ error: "Bad Credentials"})
  } 
})

app.post('/signup', async (req, res) => {
    const newUser = req.body
    try {
      const result = await addUser(newUser)
      console.log(result)
      res.status(200).json({msg: result})
    } catch (error) {
      console.log(`there was an error signing up: ${error}`)
      res.status(403).json({msg: 'there was an error signing up'})
    }
})

app.get('/verifylogin', verifyToken, async (req, res) => {
  res.status(200).send(req.user)
})

main();

app.listen(port, () => {
    console.log(`Express listening on port ${port}`)
  })