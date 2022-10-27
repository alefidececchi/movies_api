const { request, response } = require('express')
const Carousel = require('../../models/Carousel.js');

const deleteImgCarousel = async(req = request, res = response) => {

    const {id} = req.params
    try {
        await Carousel.findByIdAndDelete(id);
        res.status(200).json({message: 'Las imagenes fueron eliminadas de la base de datos'})
    } catch (error) {
        return res.status(404).json({error: 'Parece que no se pudo eliminar'})
    }
}

module.exports = {
    deleteImgCarousel
}