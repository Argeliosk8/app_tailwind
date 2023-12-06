const express = require('express')
const bodyParser = require('body-parser')
const { run } = require('./utils')
const app = express()
const port = 5000

app.use(bodyParser.json());

app.param('status', (req, res, next, stat) => {
  const status = String(stat)
  req.status = status
})

app.get('/hello', async (req, res) => {
    const query = {}
    const recruiter = await run(query)
    res.send(recruiter)
  })
  
  app.get('/hello/:status', (req, res) => {
    run()

  })

  app.listen(port, () => {
    console.log(`Express listening on port ${port}`)
  })