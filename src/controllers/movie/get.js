const { request, response } = require('express')
const Movie = require('../../models/Movie.js');

const getMovies = async (req = request, res = response) => {

    let { categories, limit, page, title } = req.query
    let movies;
    let count;

    //AGREGAR PAGINADO PARA PAGINA PRINCIPAL
    try {
        console.log('hello from backend')
        if (categories) {
            let obj = await getMoviesCategories(categories, page, limit)
            count = obj.count
            movies = obj.movies
        } else if (title) {
            let obj = await getMovieTitle(title, page, limit)
            count = obj.count
            movies = obj.movies
        } else {
            count = await Movie.find().count()
            movies = await Movie.find().sort({ _id: -1 }).skip((page - 1) * limit).limit(limit)
        }
        return res.status(200).json({ movies, page, count })
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

const getMoviesCategories = async (categories, page, limit) => {
    try {
        const arr = categories.split(',')
        const query = { $all: arr }
        // console.log('PAGE: ', page, 'LIMIT: ', limit)
        const count = await Movie.find({ category: query }).count()
        const movies = await Movie.find({ category: query }).sort({ _id: -1 }).skip((page - 1) * limit).limit(limit)
        return ({ movies, count })
    } catch (error) {
        return res.status(404).json({ message: 'Algo salío mal con las categorías seleccionadas', error })
    }
}

const getMoviesDashboard = async (req = request, res = response) => {

    const { title } = req.query
    let movies;
    try {
        if (title) {
            movies = await Movie.find({ title: new RegExp(title, 'i') }, { title: 1, link_img: 1 }).sort({ _id: -1 })
        } else {
            movies = await Movie.find({}, { title: 1, link_img: 1 }).sort({ _id: -1 })
        }
        return res.status(200).json({ movies })
    } catch (error) {
        return res.status(404).json({ message: 'Hubo algún error', error })
    }
}

const getMovieTitle = async (title, page, limit) => {
    try {
        const count = await Movie.find({ title: new RegExp(title, 'i') }).count()
        const movies = await Movie.find({ title: new RegExp(title, 'i') }).sort({ _id: -1 }).skip((page - 1) * limit).limit(limit)
        return ({ count, movies });
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
    getMoviesDashboard,
    getMovieYearRelease
}