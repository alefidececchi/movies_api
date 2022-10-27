const express = require('express');
const router = express.Router()

const { deleteSerie} = require('../controllers/serie/delete.js')
const { updateSerie } = require('../controllers/serie/put.js')
const { createSerie }  = require('../controllers/serie/post.js')
const { getSerieId, getSeries } = require('../controllers/serie/get.js')



router.delete('/delete/:id', deleteSerie) //ELIMINA LA SERIE DE LA BASE DE DATOS
router.put('/update/:id', updateSerie) //ACTUALIZA LA SERIE
router.post('/create', createSerie); //CREA UNA SERIE
router.get('/:id', getSerieId) //OBTIENE EL DETALLE DE UNA SERIE
router.get('/', getSeries);

module.exports = router;