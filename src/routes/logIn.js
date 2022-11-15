const express = require('express')
const router = express.Router()
const { verifyLogin } = require('../controllers/login/get.js')


router.get('/', verifyLogin)

module.exports = router;