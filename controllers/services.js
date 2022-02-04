const { request, response, query } = require("express");

const Service= require('../models/Service');
const Ticket= require('../models/Ticket');

const servicePost= async(req= request, res= response)=>{

    try {
        const service= new Service(req.body);
        const serviceDB= await Service.findOne({name: service.name});

        if(serviceDB){
            return res.status(400).json({
                error: `The service: ${service.name} has already been registered`
            });
        }
        //Guardar el usuario que creo el servicio con el JWT
        service.creator= req.user.id
        //Guradr el servicio
        service.save();
        res.json({
            service
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
    
}

const serviceGet= async(req= request, res= response)=>{

    try {
        const services= await Service.find( {name: req.query.name} );
        res.json({services})
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'something went wrong'});
    }
}

const servicePut= async(req= request, res= response)=>{

    try {
        //Buscamos el servicio
        const service= await Service.findById(req.params.id);
        //Verificamos que el usuario sea el creador del servicio
        if(service.creator.toString() !== req.user.id){
            return res.status(401).json({
                msg: 'Solamente el creador del servicio puede modificar el mismo'
            })
        }
        const newName={
            name: req.body.name
        }
        //Actualizar el servicio
        const newService= await Service.findByIdAndUpdate( {_id: req.params.id}, {$set: newName}, {new: true} );
        
        res.json({
            newService
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'something went wrong'});
    }
}

const serviceDelete= async(req= request, res= response)=>{

    try {
        //Buscamos el servicio
        const service= await Service.findById(req.params.id);
        //Verificamos que el usuario sea el creador del servicio
        if(service.creator.toString() !== req.user.id){
            return res.status(401).json({
                msg: 'Solamente el creador del servicio puede eliminar el mismo'
            })
        }

        //Eliminar el servicio
        await Ticket.deleteMany({ project: req.params.id });
        await Service.findOneAndRemove({_id: req.params.id});

        res.json({
            msg: 'Servicio eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'something went wrong'});
    }
}

module.exports={
    servicePost,
    serviceGet,
    servicePut,
    serviceDelete
}