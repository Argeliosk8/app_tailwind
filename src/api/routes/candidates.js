const express = require('express');
const { submitCandidate, findCandidatesByUser } = require('./candidatesUtils')

candidatesRouter = express.Router()

candidatesRouter.post('/submit', async (req, res) => {
    const newCandidate = req.body
    const userEmail = req.user.email
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
        //console.log(candidates)
        res.status(200).send(candidates)
    } catch (error) {
        console.log(error)
        res.status(400).json({msg: "there was an error with your request"})
    }
})

module.exports = candidatesRouter;