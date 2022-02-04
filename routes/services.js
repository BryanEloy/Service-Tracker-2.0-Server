//Rutas para informacion de servicios
const { check } = require('express-validator');
const {Router}= require('express');

const { validate }= require('../midlewares/validate');
const { idServiceValidator } = require('../helpers/validateID');
const {validateJWT}= require('../midlewares/validateJWT');

const { servicePost, serviceGet, servicePut, serviceDelete } = require('../controllers/services');


const router= Router();

//api/servicios

router.get('/',[
    validateJWT,
    validate
],serviceGet);

router.post('/',[
    validateJWT,
    check('name', 'The service name is required').not().isEmpty(),
    validate
], servicePost);

router.put('/:id',[
    validateJWT,
    check('id', 'ID invalid').isMongoId(),
    check('id').custom(idServiceValidator),
    check('name', 'The service name is required').not().isEmpty(),
    validate
], servicePut);

router.delete('/:id',[
    validateJWT,
    check('id', 'ID invalid').isMongoId(),
    check('id').custom(idServiceValidator),
    validate
], serviceDelete);



module.exports= router