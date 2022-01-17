const {Schema, model}= require('mongoose');

const ServiceSchema= Schema({
    name:{
        type: String,
        required: true,
        trim: true, 
        unique: true
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    registration:{
        type: Date,
        default: Date.now()
    },
    state:{
        type: Boolean,
        default: true
    },
    plan:{ type: String },
    approvals:{ type: String },
    comments:{ type: String },
    testing:{ type: String },
    files:{ type: String },
    history:{ type: String }
});

module.exports= model('Service', ServiceSchema);