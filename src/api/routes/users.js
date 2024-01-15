const express = require('express');
const { findAllUsers, findUserByName, addUser, setLevel } = require('./usersUtils')


usersRouter = express.Router()


usersRouter.get('/findall', async (req, res) => {
    const users = await findAllUsers()
    res.send(users)
})

usersRouter.get('/findone', async (req, res) => {
    const body = req.body
    const name = body.name
    const user = await findUserByName(name)
    res.send(user)
  })


  usersRouter.post('/addone', async (req, res) => {
    const user = req.body
    const result = await addUser(user)
    res.send(result)
  })
  

  usersRouter.post('/setlevel', async (req, res) => {
    const body = req.body
    let names = body.names
    let level = body.level
    try {
      const result = await setLevel(names, level)
      console.log(result)
      res.send(result)
      
    } catch (error) {
      console.log(error)
    }
    
  })


module.exports = usersRouter;