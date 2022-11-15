const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const express = require('express')

const app = express()
const routes = require('./routes/index.js')

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' }));
app.use((req, res, next) => {
    console.log('hello i am a request')
    console.log('URL', req.url)
    console.log('===========================')
    next()
})
app.use('/', routes);


module.exports = app