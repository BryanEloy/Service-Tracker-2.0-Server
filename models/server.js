const express= require('express');
const cors= require('cors');

const DBConection= require('../config/db');

class Server{
    constructor(){

        //crear el servidor
        this.app= express();
        //Puerto de la app
        this.port= process.env.PORT || 4000;

        //Endpoints al server
        this.paths={
            users: "/api/users",
            auth: "/api/auth",
            services: "/api/services",
            tickets: "/api/tickets"
        }
        
        //Conexion a las DB
        this.conection()
        //Middlewares
        this.middlewares();
        //Rutas de la pp
        this.routes();
    }

    async conection(){
        await DBConection();
    }

    routes(){
        this.app.use( this.paths.users, require('../routes/users') );
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.services, require('../routes/services') );
        this.app.use( this.paths.tickets, require('../routes/tickets') );
    }

    middlewares(){
        //Lectura y parseo del body
        this.app.use( express.json() );
        //Habilitar CORS
        this.app.use(cors());
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor funcionando en el puerto ${this.port}`)
        });
    }
}

module.exports= Server;