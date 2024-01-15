const express = require('express');
const { submitCandidate, findCandidatesByUser } = require('./candidatesUtils')
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');

const storage = new Storage({
  keyFilename: 'credentials/credentials.json',
});

// bucket and multer settings
const bucket = storage.bucket('dat_resumes');
const storageMulter = multer.memoryStorage();
const upload = multer({ storage: storageMulter });
const expiration = Date.now() + 15 * 60 * 1000;
const fileInfo = {}





candidatesRouter = express.Router()

candidatesRouter.post('/submit', async (req, res) => {
    const newCandidate = req.body
    const userEmail = req.user.email
    const file = req.file;
    console.log(newCandidate)

    try {
        const newCandidateId = await submitCandidate(newCandidate, userEmail)
        res.status(200).send(`New candidates with ID: ${newCandidateId} submitted successfully`)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
    
})

candidatesRouter.get('/all', async (req, res) => {
    const userEmail = req.user.email
    try {
        const candidates = await findCandidatesByUser(userEmail)
        console.log(candidates)
        res.status(200).send(candidates)
    } catch (error) {
        console.log(error)
        res.status(400).json({msg: "there was an error with your request"})
    }
})


candidatesRouter.post('/upload', upload.single('image'), async (req, res) => {
    const file = req.file;
  
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
  
    const imageUrl = await uploadImageToStorage(file);
  
    console.log(imageUrl)
  
  
    res.send('File uploaded successfully.');
  });

module.exports = candidatesRouter;