const customer = require('../models/customer');


module.exports = async(req, res)=>{

    console.log('----emailExits Controller----');
    var check = await customer.find({email:req.body.email});

    if(check[0]){
        res.send('true');
    }
    else res.send('false');
}