const { request, response } = require("express");

const Service = require("../models/Service");
const Ticket= require('../models/Ticket');

const ticketPost= async(req= request, res= response)=>{
    const {name}= req.body;
    try {       
        const ticketDB= await Ticket.findOne({name});

        if(ticketDB){
            return res.status(400).json({
                error: `El ticket: ${name} ya fue registrado`
            });
        }

        //Crear la tarea
        const ticket= new Ticket(req.body);
        //Guardar el usuario que creo el servicio con el JWT
        ticket.creator= req.user.id
        await ticket.save();

        res.json({
            ticket
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Algo salio mal'});
    }
}

const ticketGet= async(req= request, res= response)=>{

    try {
        const tickets= await Ticket.find( {service: req.query.service} )
            .populate('creator', 'name')  
        res.json({tickets});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Algo salio mal'});
    }
}

const ticketPut= async(req= request, res= response)=>{
    const {name, state}= req.body;
    try {
        const service= await Service.findById(req.body.service);

        //Verificamos que el usuario sea el creador del proyecto
        if(service.creator.toString() !== req.user.id){
            return res.status(401).json({
                msg: 'Solamente el creador del servicio puede ver las informacion de este'
            })
        }
        //Crear la tarea con la nueva informacion 
        const newTicket={};
        newTicket.name= name;
        newTicket.state= state;

        //Guardar la tarea
        const ticket= await Ticket.findByIdAndUpdate( {_id: req.params.id}, newTicket, {new: true} );
        res.json({ticket});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Algo salio mal'});
    }
}

const ticketDelete= async(req= request, res= response)=>{

    try {
        const service= await Service.findById(req.query.service);

        //Verificamos que el usuario sea el creador del proyecto
        if(service.creator.toString() !== req.user.id){
            return res.status(401).json({
                msg: 'Solamente el creador del proyecto puede ver las informacion de este'
            })
        }

        //Eliminar el ticket
        await Ticket.findOneAndRemove({_id: req.params.id});

        res.json({
            msg: 'Ticket eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Algo salio mal'});
    }
}

module.exports={
    ticketPost,
    ticketGet,
    ticketPut,
    ticketDelete
}