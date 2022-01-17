const bcrypt = require("bcryptjs");
const { request, response } = require("express");

const {generarJWT}= require('../helpers/JWT');

const User= require('../models/User');

const userAuth= async( req= request, res= response)=>{
    const {password, email}= req.body;
    try {
        //Validar el email del user
        const user= await User.findOne({email});
        if(!user)
           return res.status(400).json( {msg: 'Email incorrecto'} );
        //Validar la contraseña
        const pass= await bcrypt.compare(password, user.password);
        if(!pass)
            return res.status(400).json( {msg: 'Contraseña invalida'} );

        //Generar JWT
        const token= await generarJWT(user.id);

        res.json({
            token
        })
        
    } catch (err) {
        res.status(400).json( {error: err} )
        console.log(err);
    }
}

const userGet= async( req= request, res= response)=>{

    try {
        const user= await User.findById(req.user.id).select('-password');
        res.json({user})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Algo salio mal'})
    }
}

module.exports= { 
    userAuth,
    userGet
}