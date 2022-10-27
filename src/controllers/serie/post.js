const { request, response } = require('express')
const Serie = require('../../models/Serie.js');


const createSerie = async (req = request, res = response) => {
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
        await Serie.create({
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
        return res.status(200).json({ mesagge: 'La serie fue creada exitosamente, ya está disponible en la app'})
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: error.mesagge })
    }
}

module.exports = {
    createSerie
}