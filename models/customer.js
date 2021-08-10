const { Int32 } = require('bson');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({

    email:String,
    product:[{
        name:String,
        price:Int32,
        currentPrice:{
            type:Int32,
            defualt:0
        },
        Time: new Date(),
        url:String,
        
    }]
})

module.exports = mongoose.model('customer',customerSchema);