const { request, response } = require('express')

const Serie = require('../../models/Serie.js');
const { verifyAdminToken } = require('../../middlewares/auth.js')

const deleteSerie = async (req = request, res = response) => {
    const { id } = req.params
    const authorization = req.get('Authorization')
    try {
        if (verifyAdminToken(authorization)) {
            await Serie.findByIdAndDelete(id);
            return res.status(200).json({ message: 'La serie fue eliminada de la base de datos' })
        } else {
            return res.status(403).json({ message: 'No tienes autorizacion eliminar documentos' })
        }
    } catch (error) {
        return res.status(401).json({ message: 'Parece que no se pudo eliminar', error })
    }
}

module.exports = {
    deleteSerie
}