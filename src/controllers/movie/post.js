const { request, response } = require('express')
const Movie = require('../../models/Movie.js');


const createMovie = async (req = request, res = response) => {
    const {
        actors,
        category,
        country,
        description,
        director,
        link_img,
        link_img_larger,
        link_trailer,
        release_year,
        title,
        type_storage
    } = req.body

    try {
        const movie = await Movie.create({
            actors,
            category,
            country,
            description,
            director,
            link_img,
            link_img_larger,
            link_trailer,
            release_year,
            title,
            type_storage
        })
        return res.status(200).json({ message: 'La película ya está disponible en la app', movie })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: error.errors["category.0"].message })
    }
}

module.exports = {
    createMovie
}