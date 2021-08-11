const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/TrackMe');

const Post = require('./models/customer');

Post.create({
    email:'nagendra@gmail.com',
    product: [{
        initialPrice:199,
        name:'Moto',
        url:'http//localhost',
        available:true

    },{
        initialPrice:146,
        name:'Apple',
        url:'http//localhost/app',
        available:true
    }]
},(err, post)=>{
    console.log(post)
})
