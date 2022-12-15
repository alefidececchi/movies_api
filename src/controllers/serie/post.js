const { request, response } = require('express')

const Serie = require('../../models/Serie.js');
const { verifyAdminToken} = require('../../middlewares/auth.js')

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
    const authorization = req.get('Authorization')

    try {
        if(verifyAdminToken(authorization)) {
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
        } else {
            return res.status(403).json({ message: 'No tienes autorizacion crear documentos' })
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error })
    }
}

module.exports = {
    createSerie
}