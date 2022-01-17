
//Rutas para informacion de tickets
const { check } = require('express-validator');
const {Router}= require('express');

const { validate }= require('../midlewares/validate');
const { idServiceValidator, idTicketValidator } = require('../helpers/validateID');
const {validateJWT}= require('../midlewares/validateJWT');

const { ticketPost, ticketGet, ticketPut, ticketDelete } = require('../controllers/tickets');

const router= Router();
//api/tasks

router.post('/',[
    validateJWT,
    check('service', 'El ID del proyecto es obligatorio').not().isEmpty(),
    check('service', 'ID invalido').isMongoId(),
    check('service').custom(idServiceValidator),
    check('name', 'El nombre de la tarea es obligatorio').not().isEmpty(),
    validate
], ticketPost);

router.get('/',[
    validateJWT,
    validate
], ticketGet);

router.put('/:id',[
    validateJWT,
    check('id', 'El ID del servicio es obligatorio').not().isEmpty(),
    check('id', 'ID invalido').isMongoId(),
    check('id').custom(idTicketValidator),
    check('service', 'El ID del servicio es obligatorio').not().isEmpty(),
    check('service', 'ID invalido').isMongoId(),
    validate
],ticketPut);

router.delete('/:id',[
    validateJWT,
    check('id', 'El ID del proyecto es obligatorio').not().isEmpty(),
    check('id', 'ID invalido').isMongoId(),
    check('id').custom(idTicketValidator),
    check('service', 'El ID del servicio es obligatorio').not().isEmpty(),
    check('service', 'ID invalido').isMongoId(),
], ticketDelete)

module.exports= router;