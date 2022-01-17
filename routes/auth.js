//Rutas para autenticacion de usuarios
const {Router}= require('express');

const { validate }= require('../midlewares/validate');
const { validateJWT }= require('../midlewares/validateJWT');

const {userAuth, userGet}= require('../controllers/auth');

const router= Router();

//api/auth
router.post('/', userAuth);

router.get('/',[
    validateJWT,
    validate
], userGet);


module.exports= router;