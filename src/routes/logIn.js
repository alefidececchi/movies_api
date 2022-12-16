const express = require('express')
const router = express.Router()
const { verifyLogin } = require('../controllers/login/post.js')


router.post('/', verifyLogin)

module.exports = router;