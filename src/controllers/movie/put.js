const { request, response } = require('express')

const Movie = require('../../models/Movie.js');
const { verifyAdminToken } = require('../../middlewares/auth.js')

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
    const authorization = req.get('Authorization')

    try {
        if (verifyAdminToken(authorization)) {
            await Movie.findByIdAndUpdate(id, {
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
            return res.status(200).json({ message: 'La peli ya está actualizada' })
        } else {
            return res.status(403).json({ message: 'No tienes autorizacion actualizar documentos' })
        }
    } catch (error) {
        return res.status(401).json({ error })
    }
}

module.exports = {
    updateMovie
}