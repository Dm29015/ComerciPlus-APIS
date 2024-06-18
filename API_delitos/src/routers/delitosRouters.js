const {request,response,Router} = require('express');
const { listarDelitos, buscarDelitos } = require('../controllers/delitosController'); 
const router = Router();

router.get('/', listarDelitos);
router.get('/buscarDelitos', buscarDelitos);

module.exports = router;


