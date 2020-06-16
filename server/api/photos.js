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

