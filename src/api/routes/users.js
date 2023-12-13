const express = require('express');
const { findAllUsers, findUserByName, addUser, login } = require('./utils')


usersRouter = express.Router()

usersRouter.get('/findall', async (req, res) => {
    const users = await findAllUsers()
    res.send(users)
})

usersRouter.get('/findone', async (req, res, next) => {
    const body = req.body
    const name = body.name
    const user = await findUserByName(name)
    res.send(user)
    next()
  })


  usersRouter.post('/addone', async (req, res) => {
    const body = req.body
    const user = body.user
    const result = await addUser(user)
    res.send(result)
  })
  

  usersRouter.get('/login', async (req, res, next) => {
    const body = req.body
    const result = await login(body.name, body.pwd)
    console.log(result)
    res.send(result)
  })

module.exports = usersRouter;