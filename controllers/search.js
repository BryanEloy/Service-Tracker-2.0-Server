const { response } = require("express");
const {ObjectId}= require('mongoose').Types;

const User= require('../models/User');
const Service= require('../models/Service');

const coleccionesActuales=[
    'services',
    'users',
]

const searchUsers= async(term='', res=response)=>{
    
    const esMongoID= ObjectId.isValid( term); //true or false if it is an mongoID

    if( esMongoID){
        const user= await User.findById(term);
            return res.json({
            results: (user) ?[user] :[]
        })
    }

    const regex= new RegExp(term, 'i');
    const busqueda= await User.find({
        $or: [{name: regex}, {email:regex}]
    });

    res.json({
        results: busqueda
    });
}

const searchServices= async(term='', res=response)=>{

    const esMongoID= ObjectId.isValid( term); //true or false if it is an mongoID

    if( esMongoID){
        const service= await Service.findById(term);
            return res.json({
            results: (service) ?[service] :[]
        })
    }

    const regex= new RegExp(term, 'i');
    const busqueda= await Service.find({name: regex});

    res.json({
        results: busqueda
    });
}


const search= async(req, res=response)=>{

    const {colection, term}= req.params;

    if( !coleccionesActuales.includes(colection) ){
        res.status(400).json({
            msg: `La coleccion: ${colection} no existe en DB`
        })
    }

    switch (colection) {
        case 'users':
            searchUsers(term, res);
            break;

        case 'services':
            searchServices(term, res);
            break;

        default:
            res.status(500).json({
                msg: 'Busqueda no definida para esta coleccion'
            });
    }

}

module.exports={
    search
}