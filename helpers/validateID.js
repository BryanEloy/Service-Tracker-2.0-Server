const Service= require('../models/Service');
const Ticket = require('../models/Ticket');

//Validar que exista el id del servicio buscado
const idServiceValidator= async(id)=>{
    const exist= await Service.findById(id);
    if(!exist){
        throw new Error(`El id: ${id} buscado, no existe`)
    }
}

//Validar que exista el id del ticket buscada
const idTicketValidator= async(id)=>{
    const exist= await Ticket.findById(id);
    if(!exist){
        throw new Error(`El id: ${id} buscado, no existe`)
    }
}

module.exports={
    idServiceValidator,
    idTicketValidator
}