const express = require('express')
const router = express.Router()
const { verifyLogin } = require('../controllers/login/get.js')


router.post('/', verifyLogin)

module.exports = router;