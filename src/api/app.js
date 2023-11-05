const express = require('express')
const app = express()
const port = 5000

app.get('/hello', (req, res) => {
    res.send(`Hello Argelio, I'm your Express server listening on port: ${port}`)
  })
  
  app.listen(port, () => {
    console.log(`Express listening on port ${port}`)
  })