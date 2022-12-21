const { request, response } = require('express')

const Carousel = require('../../models/Carousel.js')
const { verifyAdminToken } = require('../../middlewares/auth.js')

const createImgCarousel = async (req = request, res = response) => {

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
            await Carousel.create({ desktop_img, movieOrSerie, phone_img, tablet_img, title })
            return res.status(200).json({ message: 'Las imagenes ya están en el carousel!' })
        } else {
            return res.status(403).json({ message: 'No tienes autorizacion para crear documentos' })
        }
    } catch (error) {
        return res.status(401).json({ message: 'Algo salió mal al crear el documento', error })
    }
}


module.exports = {
    createImgCarousel
}