
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
    check('service', 'Service ID is required').not().isEmpty(),
    check('service', 'ID invalid').isMongoId(),
    check('service').custom(idServiceValidator),
    check('name', 'Name of the ticket is required').not().isEmpty(),
    validate
], ticketPost);

router.get('/',[
    validateJWT,
    validate
], ticketGet);

router.put('/:id',[
    validateJWT,
    check('id', 'Ticket ID is required').not().isEmpty(),
    check('id', 'ID invalid').isMongoId(),
    check('id').custom(idTicketValidator),
    check('service', 'Service ID is required').not().isEmpty(),
    check('service', 'ID invalid').isMongoId(),
    validate
],ticketPut);

router.delete('/:id',[
    validateJWT,
    check('id', 'Ticket ID is required').not().isEmpty(),
    check('id', 'ID invalid').isMongoId(),
    check('id').custom(idTicketValidator),
    check('service', 'Service ID is required').not().isEmpty(),
    check('service', 'ID invalid').isMongoId(),
], ticketDelete)

module.exports= router;