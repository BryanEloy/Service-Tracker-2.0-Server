const User= require('../models/User')

const emailValidator= async(email='')=>{
    const exist= await User.findOne({email})
    if(exist){
        throw new Error(`El usuario: ${email} ya fue registrado`)
    }
}

module.exports={
    emailValidator
}