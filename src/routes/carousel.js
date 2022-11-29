const express = require('express')
const { getCarousel } = require('../controllers/carousel/get.js')
const { createImgCarousel } = require('../controllers/carousel/post.js')
const { updateImgCarousel } = require('../controllers/carousel/put.js')
const { deleteImgCarousel } = require('../controllers/carousel/delete.js')

const router = express.Router()

router.delete('/delete/:id', deleteImgCarousel)
router.put('/update/:id', updateImgCarousel)
router.post('/create', createImgCarousel)
router.get('/', getCarousel)

module.exports = router;