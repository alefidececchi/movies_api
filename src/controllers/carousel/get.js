const { request, response } = require('express')
const Carousel = require('../../models/Carousel.js')

const getCarousel = async (req = request, res = response) => {
    const { movie } = req.query
    try {
        const carousel = movie
            ? await Carousel.find({ movieOrSerie: 'movie' })
            : await Carousel.find({ movieOrSerie: 'serie' })
        return res.status(200).json({ carousel })
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}


module.exports = {
    getCarousel
}