const bcrypt = require("bcryptjs");
const { request, response } = require("express");

const User= require('../models/User');
const {generarJWT}= require('../helpers/JWT')

const userPost= async(req= request, res= response)=>{

    const {password}= req.body;

    try {
        //Crear un nuevo usuario
        const user= new User(req.body);
        //Hshear el password
        const salt= await bcrypt.genSalt();
        user.password= await bcrypt.hashSync(password, salt)

        //Guardar el nuevo usuario
        await user.save();

        //Generar JWT
        const token= await generarJWT(user.id);

        res.json({
            msg: "Usuario guardado con exito",
            token
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
}

module.exports={
    userPost
}