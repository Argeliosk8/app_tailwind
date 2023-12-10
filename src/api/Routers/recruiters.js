const express = require('express');
const { findAllRecruiters, findByName, addRecruiter } = require('./utils')

recruitersRouter = express.Router()

recruitersRouter.get('/findall', async (req, res) => {
    const recruiter = await findAllRecruiters()
    res.send(recruiter)
})

recruitersRouter.get('/findone', async (req, res, next) => {
    const body = req.body
    const name = body.name
    const recruiter = await findByName(name)
    res.send(recruiter)
    next()
  })


  recruitersRouter.post('/addone', async (req, res) => {
    const body = req.body
    const recruiter = body.recruiter
    const result = await addRecruiter(recruiter)
    res.send(result)
  })
  
module.exports = recruitersRouter;