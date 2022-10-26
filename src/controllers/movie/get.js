const { request, response } = require('express')
const Movie = require('../../models/Movie.js');

const getMovies = async (req = request, res = response) => {

    let { genre, title, year } = req.query
    // const year = Number(year)
    let movies;
    let moviesY;
    let moviesG;
    try {
        if (!title) {
            movies = await Movie.find()
            moviesY = year ? getMovieYearRelease(movies, year) : movies;
            moviesG = genre ? getMoviesGenre( moviesY, genre ) : moviesY
            return res.status(200).json({ movies: moviesG })
        } else {
            movies = await getMovieTitle(title)
        }
        return res.status(200).json({ movies })
    } catch (error) {
        throw error
    }
}

const getMovieId = (req = request, res = response) => {

    // const { id } = req.params


}

const getMoviesGenre = (movies, genre) => {
    return movies.filter(m => m.genre.includes(genre))

}

const getMovieTitle = async (title) => {
    const movies = await Movie.find({ title: new RegExp(title, 'i') }) //FALTA NORMALIZAR TITLE
    return movies;
}

const getMovieYearRelease = (movies, year) => {
    return movies.filter(m => m.release_year == year)
}

module.exports = {
    getMovies,
    getMovieId,
    getMovieTitle,
    getMoviesGenre,
    getMovieYearRelease
}