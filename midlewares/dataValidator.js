const User= require('../models/User')

const emailValidator= async(email='')=>{
    const exist= await User.findOne({email})
    if(exist){
        throw new Error(`The user: ${email} has already been registered`)
    }
}

module.exports={
    emailValidator
}