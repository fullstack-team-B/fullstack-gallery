const router = require('express').Router()
const {Photo} = require('../db/models')
module.exports = router

router.get('/photos', async(req, res, next)=>{
  try {
    const allPhotos = await Photo.findAll()
    res.json(allPhotos)
  } catch (error) {
    next(error)
  }
})

router.get('/photos/:id', async (req, res, next)=>{
  try {
    const photoId = req.params.id
    const photo = await Photo.findByPk(photoId)

    res.json(photo)
  } catch (error) {
    next(error)
  }
})

