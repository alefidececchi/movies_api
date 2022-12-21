const { request, response } = require('express')

const Movie = require('../../models/Movie.js');
const { verifyAdminToken } = require('../../middlewares/auth.js')


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
        const authorization = req.get('Authorization')
        if (verifyAdminToken(authorization)) {
            await Movie.create({
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
            return res.status(200).json({ message: 'La película ya está disponible en la app' })
        } else {
            return res.status(403).json({ message: 'No tienes autorizacion para crear documentos' })
        }
    } catch (error) {
        return res.status(401).json({ message: 'Algo salió mal al crear el documento', error })
    }
}

module.exports = {
    createMovie
}