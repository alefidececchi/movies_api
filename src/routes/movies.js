const express = require('express')

const { createMovie } = require('../controllers/movie/post.js')
const { getMovies, getMovieId, getMoviesDashboard } = require('../controllers/movie/get.js')
const { deleteMovie } = require('../controllers/movie/delete.js')
const { updateMovie } = require('../controllers/movie/put.js')

const router = express.Router()

router.get('/dashboard', getMoviesDashboard) //DEVUELVE TODAS LAS PELICULAS CON _ID, TITLE Y IMG
router.delete('/:id', deleteMovie) //ELIMINA UNA PELICULA
router.put('/:id', updateMovie) //ACTUALIZA UNA PELICULA
router.post('/', createMovie) //CREA UNA PELICULA
router.get('/:id', getMovieId) //DETALLE DE LA PELICULA
router.get('/', getMovies) //DEVUELVE TODAS LAS PELICULAS Y O FILTRADAS

module.exports = router