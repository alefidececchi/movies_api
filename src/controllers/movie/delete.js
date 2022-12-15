const { request, response } = require('express')

const Movie = require('../../models/Movie.js');
const { verifyAdminToken } = require('../../middlewares/auth.js')

const deleteMovie = async (req = request, res = response) => {

    const { id } = req.params
    const authorization = req.get('Authorization')

    try {
        if (verifyAdminToken(authorization)) {
            await Movie.findByIdAndDelete(id);
            res.status(200).json({ message: 'La peli fue eliminada de la base de datos' })
        } else {
            return res.status(403).json({ message: 'No tienes autorizacion para eliminar documentos' })
        }
    } catch (error) {
        return res.status(401).json({ error: 'Parece que no se pudo eliminar' })
    }
}

module.exports = {
    deleteMovie
}