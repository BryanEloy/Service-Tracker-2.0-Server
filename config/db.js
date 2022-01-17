const mongoose= require( 'mongoose' );

const DBConection= async()=>{
    try {
        await mongoose.connect( process.env.MONGO_DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        } );
        console.log('Conectado a DB')

    } catch (err) {
        console.log(err);
        process.exit(1); //Detener la aplicacion en caso de error
    }
}

module.exports= DBConection;