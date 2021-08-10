const { Int32 } = require('bson');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({

    email:{
        type:String,
        require:true,
        unique:true
    },
    product:[{
        name:{
            type:String,
            require:true
        },
        available:{
            type:Boolean,
            require:true
        },
        initialPrice:Number,
        currentPrice:{
            type:Number,
            default:2
        },
        Time: {
            type:Date,
            default:new Date()
        },
        url:String,
        
    }]
})

module.exports = mongoose.model('customer',customerSchema);