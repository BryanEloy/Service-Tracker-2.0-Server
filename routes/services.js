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
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validate
], servicePost);

router.put('/:id',[
    validateJWT,
    check('id', 'ID invalido').isMongoId(),
    check('id').custom(idServiceValidator),
    check('name', 'El nombre del servicio es obligatorio').not().isEmpty(),
    validate
], servicePut);

router.delete('/:id',[
    validateJWT,
    check('id', 'ID invalido').isMongoId(),
    check('id').custom(idServiceValidator),
    validate
], serviceDelete);



module.exports= router