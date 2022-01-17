//Rutas para informacion de usuarios
const { check } = require('express-validator');
const {Router}= require('express');

const { userPost } = require('../controllers/users');
const { emailValidator } = require('../midlewares/dataValidator');
const { validate }= require('../midlewares/validate');

const router= Router();

//Crear usuario
router.post('/',[
    check('email', 'El correo es invalido').isEmail(),
    check('email').custom(emailValidator),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener mas de 6 caracteres').isLength({min:6  }),
    validate
], userPost )


module.exports= router;