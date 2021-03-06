const {Schema, model}= require('mongoose');

const TicketSchema= Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    service:{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date:{
        type: Date,
        default: Date.now()
    },
    description:{ type: String }
});

module.exports= model('Ticket', TicketSchema);