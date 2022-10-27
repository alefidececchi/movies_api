const { request, response } = require('express')
const Movie = require('../../models/Movie.js');

const updateMovie = async (req = request, res = response) => {
    const { id } = req.params
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
        const movie = await Movie.findByIdAndUpdate(id, {
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
        return res.status(201).json({ message: 'La peli ya está actualizada' })
    } catch (error) {
        return res.status(404).json({ error })
    }
}

module.exports = {
    updateMovie
}