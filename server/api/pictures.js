const router = require('express').Router()
const { PictureList } = require('../db/models')
module.exports = router

router.get('/pictures', async(req, res, next)=>{
  try {
    const allPictures = await PictureList.findAll()
    res.json(allPictures)
  } catch (error) {
    next(error)
  }
})

router.get('/pictures/:id', async (req, res, next)=>{
  try {
    const pictureId = req.params.id
    const picture = await PictureList.findByPk(pictureId)

    res.json(picture)
  } catch (error) {
    next(error)
  }
})

