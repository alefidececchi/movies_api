const express = require('express')
const router = express.Router()

const { getCategories } = require('../controllers/category/get.js')

router.get('/', getCategories)

module.exports = router;