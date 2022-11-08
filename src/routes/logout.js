const express = require('express')
const router = express.Router()
const { logout } = require('../controllers/logout/put.js')


router.put('/:id', logout)

module.exports = router;