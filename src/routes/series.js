const express = require('express');
const router = express.Router()



router.delete('/delete/:id', /**eliminar serie */)
router.put('/update/:id', /**actualizar serie */)
router.post('/create', /**crear series */);
router.get('/:id', /** detalle de la serie */)
router.get('/', /** get series */);

module.exports = router;