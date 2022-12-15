const { request, response } = require('express')

const Carousel = require('../../models/Carousel.js')
const { verifyAdminToken} = require('../../middlewares/auth.js')

const updateImgCarousel = async (req = request, res = response) => {

    const { id } = req.params
    const {
        desktop_img,
        movieOrSerie,
        phone_img,
        tablet_img,
        title
    } = req.body
    const authorization = req.get('Authorization')

    try {
        if(verifyAdminToken(authorization)) {
            await Carousel.findByIdAndUpdate(id, { desktop_img, movieOrSerie, phone_img, tablet_img, title })
            return res.status(200).json({message: 'Las imágenes fueron actualizadas'})
        } else {
            return res.status(403).json({ message: 'No tienes autorizacion para actualizar documentos' })
        }
    } catch (error) {
        res.status(401).json({error: 'Algo malió sal!'})
    }
}

module.exports = {
    updateImgCarousel
}