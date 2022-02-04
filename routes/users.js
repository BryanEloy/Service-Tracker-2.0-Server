//Rutas para informacion de usuarios
const { check } = require('express-validator');
const {Router}= require('express');

const { userPost } = require('../controllers/users');
const { emailValidator } = require('../midlewares/dataValidator');
const { validate }= require('../midlewares/validate');

const router= Router();

//Crear usuario
router.post('/',[
    check('email', 'Mail is invalid').isEmail(),
    check('email').custom(emailValidator),
    check('name', 'The name is mandatory').not().isEmpty(),
    check('password', 'Password must be longer than 6 characters').isLength({min:6  }),
    validate
], userPost )


module.exports= router;