const { request, response } = require('express')
const Carousel = require('../../models/Carousel.js')

const getCarousel = async (req = request, res = response) => {
    let { series, movies } = req.query
    try {
        const carousel = movies === "true" ?
            await Carousel.find({ movieOrSerie: 'movie' }) :
            series === "true" ?
                await Carousel.find({ movieOrSerie: 'serie' }) :
                await Carousel.find();
        return res.status(200).json({ carousel })
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

module.exports = {
    getCarousel
}