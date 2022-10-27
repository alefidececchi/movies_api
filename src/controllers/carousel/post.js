const { request, response } = require('express')
const Carousel = require('../../models/Carousel.js')

const createImgCarousel = async (req = request, res = response) => {

    const {
        desktop_img,
        movieOrSerie,
        phone_img,
        tablet_img,
        title
    } = req.body

    try {
        await Carousel.create({ desktop_img, movieOrSerie, phone_img, tablet_img, title })
        res.status(201).json({ message: 'Joya! las imagenes ya están en el carousel!' })
    } catch (error) {
        res.status(404).json({ error })
    }
}


module.exports = {
    createImgCarousel
}