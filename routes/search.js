const {Router}= require('express');

const {search}= require('../controllers/search');

const {validateJWT}= require('../midlewares/validateJWT');
const { validate }= require('../midlewares/validate');

const router= Router();

//Route for search terms in a colection
//api/search/
router.get('/:colection/:term',[
    validateJWT,
    validate
], search);


module.exports= router;