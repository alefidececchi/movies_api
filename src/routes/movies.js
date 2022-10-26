const express = require('express')

const { createMovie } = require('../controllers/movie/post.js')
const { getMovies, getMovieId } = require('../controllers/movie/get.js')
const { deleteMovie } = require('../controllers/movie/delete.js')
const { updateMovie } = require('../controllers/movie/put.js')

const router = express.Router()

router.delete('/delete/:id', deleteMovie) //ELIMINA UNA PELICULA
router.put('/update/:id', updateMovie) //ACTUALIZA UNA PELICULA
router.post('/create', createMovie) //CREA UNA PELICULA
router.get('/:id', getMovieId) //DETALLE DE LA PELICULA
router.get('/', getMovies) //DEVUELVE TODAS LAS PELICULAS Y O FILTRADAS

module.exports = router