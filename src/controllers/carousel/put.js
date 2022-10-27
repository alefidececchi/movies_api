const { request, response } = require('express')
const Carousel = require('../../models/Carousel.js')

const updateImgCarousel = async (req = request, res = response) => {

    const { id } = req.params
    const {
        desktop_img,
        movieOrSerie,
        phone_img,
        tablet_img,
        title
    } = req.body

    try {
        await Carousel.findByIdAndUpdate(id, { desktop_img, movieOrSerie, phone_img, tablet_img, title })
        res.status(201).json({message: 'Las imágenes fueron actualizadas'})
    } catch (error) {
        res.status(404).json({error: 'Algo salió mal!'})
    }
}

module.exports = {
    updateImgCarousel
}