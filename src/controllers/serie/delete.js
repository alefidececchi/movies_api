const { request, response } = require('express')
const Serie = require('../../models/Serie.js');

const deleteSerie = async(req = request, res = response) => {
    const { id } = req.params
    try {
        await Serie.findByIdAndDelete(id);
        res.status(200).json({ message: 'La serie fue eliminada de la base de datos' })
    } catch (error) {
        return res.status(404).json({ error: 'Parece que no se pudo eliminar' })
    }
}

module.exports = {
    deleteSerie
}