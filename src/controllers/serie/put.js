const { request, response } = require('express')
const Serie = require('../../models/Serie.js');

const updateSerie = async(req = request, res = response) => {
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
        season,
        title,
        type_storage
    } = req.body
    try {
        await Serie.findByIdAndUpdate(id, {
            actors,
            category,
            country,
            description,
            director,
            link_img,
            link_img_larger,
            link_trailer,
            release_year,
            season,
            title,
            type_storage
        })
        return res.status(201).json({ message: 'La serie ya está actualizada' })
    } catch (error) {
        return res.status(404).json({ error })
    }
}

module.exports = {
    updateSerie
}