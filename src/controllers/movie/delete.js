const { request, response } = require('express')
const Movie = require('../../models/Movie.js');

const deleteMovie = async(req = request, res = response) => {

    const {id} = req.params
    try {
        await Movie.findByIdAndDelete(id);
        res.status(200).json({message: 'La peli fue eliminada de la base de datos'})
    } catch (error) {
        return res.status(404).json({error: 'Parece que no se pudo eliminar'})
    }
}

module.exports = {
    deleteMovie
}