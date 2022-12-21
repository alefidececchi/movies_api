const { request, response } = require('express')

const Movie = require('../../models/Movie.js');
const { verifyAdminToken } = require('../../middlewares/auth.js')

const deleteMovie = async (req = request, res = response) => {

    const { id } = req.params
    const authorization = req.get('Authorization')

    try {
        if (verifyAdminToken(authorization)) {
            await Movie.findByIdAndDelete(id);
            return res.status(200).json({ message: 'La película fue eliminada de la base de datos' })
        } else {
            return res.status(403).json({ message: 'No tienes autorización para eliminar documentos' })
        }
    } catch (error) {
        return res.status(401).json({ message: 'Parece que no se pudo eliminar', error })
    }
}

module.exports = {
    deleteMovie
}