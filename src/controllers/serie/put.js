const { request, response } = require('express')

const Serie = require('../../models/Serie.js');
const { verifyAdminToken } = require('../../middlewares/auth.js')

const updateSerie = async (req = request, res = response) => {
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
    const authorization = req.get('Authorization')

    try {
        if (verifyAdminToken(authorization)) {
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
        } else {
            return res.status(403).json({ message: 'No tienes autorizacion actualizar documentos' })
        }
    } catch (error) {
        return res.status(401).json({ message: 'Algo salió mal', error })
    }
}

module.exports = {
    updateSerie
}