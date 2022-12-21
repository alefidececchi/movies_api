const { request, response } = require('express')
const Movie = require('../../models/Movie.js');

const getMovies = async (req = request, res = response) => {

    let { category, title, year } = req.query
    let movies;
    
    try {
        if (!title) {
            movies = await Movie.find()
            movies = year ? getMovieYearRelease(movies, year) : movies;
            movies = category ? getMoviesCategory(movies, category) : movies
            return res.status(200).json({ movies: movies })
        } else {
            movies = await getMovieTitle(title)
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

const getMoviesCategory = (movies, category) => {
    return movies.filter(m => m.category.includes(category))
}

const getMovieTitle = async (title) => {
    try {
        const movies = await Movie.find({ title: new RegExp(title, 'i') })
        return movies;
    } catch (error) {
        return new Error('Algo salió mal con el titulo')
    }
}

const getMovieYearRelease = (movies, year) => {
    return movies.filter(m => m.release_year == year)
}

module.exports = {
    getMovies,
    getMovieId,
    getMovieTitle,
    getMoviesCategory,
    getMovieYearRelease
}