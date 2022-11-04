const express = require('express')
const router = express.Router()
const { verifyLogin } = require('../controllers/logIn/get.js')


router.get('/', verifyLogin)

module.exports = router;