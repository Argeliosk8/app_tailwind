const express = require('express')
const bodyParser = require('body-parser')
const { findAllRecruiters, findByName, addRecruiter } = require('./utils')
const app = express()
const port = 5000

app.use(bodyParser.json());

/*
app.param('status', (req, res, next, stat) => {
  const status = String(stat)
  req.status = status
})
*/

app.get('/find/allrecruiters', async (req, res) => {
    const recruiter = await findAllRecruiters()
    res.send(recruiter)
  })
  
app.get('/find/recruiter', async (req, res) => {
  const body = req.body
  const name = body.name
  const recruiter = await findByName(name)
  res.send(recruiter)
})


app.post('/add/recruiter', async (req, res) => {
  const body = req.body
  const recruiter = body.recruiter
  const result = await addRecruiter(recruiter)
  res.send(result)
})

app.listen(port, () => {
    console.log(`Express listening on port ${port}`)
  })