const {response, request}=  require('express');
const JWT= require('jsonwebtoken');
const User = require('../models/User');

const validateJWT= async(req=request, resp=response, next)=>{
    const token= req.header('auth-token');

    if(!token){
        return resp.status(401).json({
            msg: 'Invalid token'
        });
    }

    try {
        const {uid}= JWT.verify(token, process.env.SECRETKEY);
        //Extraemos el user id y lo mandamos en la request
        const user= await User.findById(uid);
        if(!user ){
            return resp.status(401).json({
                msg: 'El usuario no existe en bd'
            });
        }

        req.user=user;
        next();

    } catch (error) {
        console.log(error);
        resp.status(401).json({
            msg: 'Invalid token'
        });
    }   
}

module.exports= {validateJWT};