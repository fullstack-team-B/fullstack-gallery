const router = require('express').Router()
const {User, PictureList} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'firstName', 'lastName', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params

    const user = await User.findByPk(userId)
    const {admin} = user.dataValues
    if (userId) {
      if (admin) {
        const users = await User.findAll({
          attributes: ['id', 'firstName', 'lastName', 'email', 'admin']
        })
        const pictures = await PictureList.findAll()
        user.users = users
        user.pictures = pictures
      }
      res.status(200).json(user)
    } else sendStatus(404)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const {firstName, lastName, email, password} = req.body
  try {
    const newUser = await User.create({firstName, lastName, email, password})

    if (newUser) {
      res.status(200).json(newUser)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    await User.destroy({
      where: {
        id: userId
      }
    })

    res.status(204).json('deleted user from database')
  } catch (error) {
    next(error)
  }
})
