const { request, response } = require('express')

const Carousel = require('../../models/Carousel.js');
const { verifyAdminToken } = require('../../middlewares/auth.js')

const deleteImgCarousel = async (req = request, res = response) => {

    const { id } = req.params
    const authorization = req.get('Authorization')
    try {
        if (verifyAdminToken(authorization)) {
            await Carousel.findByIdAndDelete(id);
            return res.status(200).json({ message: 'Las imagenes fueron eliminadas de la base de datos' })
        } else {
            return res.status(403).json({ message: 'No tienes autorizacion para eliminar documentos' })
        }
    } catch (error) {
        return res.status(401).json({ message: 'Parece que no se pudo eliminar', error })
    }
}

module.exports = {
    deleteImgCarousel
}