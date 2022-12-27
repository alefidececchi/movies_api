const { request, response } = require('express')
const Movie = require('../../models/Movie.js');

const getMovies = async (req = request, res = response) => {

    let { categories, title } = req.query
    let movies;

    try {
        if (categories) {
            movies = await getMoviesCategories(categories)
        } else if (title) {
            movies = await getMovieTitle(title)
        } else {
            movies = await Movie.find()
        }
        return res.status(200).json({ movies })
    } catch (error) {
        return res.status(404).json({ message: 'Hubo algún error', error })
    }
}

const getMovieId = async (req = request, res = response) => {
    const { id } = req.params
    try {
        const movie = await Movie.findById(id)
        return res.status(200).json({ movie });
    } catch (error) {
        return res.status(404).json({ message: 'El id salió está sospechoso', error })
    }
}

const getMoviesCategories = async (categories) => {
    try {
        const arr = categories.split(',')
        const query = { $all: arr }
        const movies = await Movie.find({ category: query })
        return movies
    } catch (error) {
        return res.status(404).json({ message: 'Algo salío mal con las categorías seleccionadas', error })
    }
}

const getMovieTitle = async (title) => {
    try {
        const movies = await Movie.find({ title: new RegExp(title, 'i') })
        return movies;
    } catch (error) {
        return new Error('Algo salió mal con el titulo agregado')
    }
}

const getMovieYearRelease = (movies, year) => {
    return movies.filter(m => m.release_year == year)
}

module.exports = {
    getMovies,
    getMovieId,
    getMovieTitle,
    getMoviesCategories,
    getMovieYearRelease
}