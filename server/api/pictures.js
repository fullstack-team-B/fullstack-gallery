const router = require('express').Router()
const {PictureList} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allPictures = await PictureList.findAll()
    res.json(allPictures)
  } catch (error) {
    next(error)
  }
})

router.get('/:pictureId', async (req, res, next) => {
  try {
    const pictureId = req.params.pictureId
    const picture = await PictureList.findByPk(pictureId)

    res.json(picture)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const pictureData = req.body
    const newPicture = await PictureList.create(pictureData)

    res.status(201).json(newPicture)
  } catch (error) {
    next(error)
  }
})

router.delete('/:pictureId', async (req, res, next) => {
  try {
    const pictureId = req.params.pictureId
    await PictureList.destroy({where: {id: pictureId}})

    res.status(204).json('deleted item')
  } catch (error) {
    next(error)
  }
})

router.put('/:pictureId', async (req, res, next) => {
  try {
    const newPicturedata = req.body
    const pictureId = req.params.pictureId

    await PictureList.update(newPicturedata, {
      where: {id: pictureId}
    })

    res.json('updated product')
  } catch (error) {
    next(error)
  }
})
