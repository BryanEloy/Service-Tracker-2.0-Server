const JWT= require('jsonwebtoken');

//Genera un JWT en base al id del usuario
const generarJWT= (uid='')=>{

    return new Promise( (resolve, reject)=>{

        const payload={uid};
        JWT.sign(payload, process.env.SECRETKEY,{
            expiresIn: '4h'
        }, (err, token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })
    })

}

module.exports={generarJWT}