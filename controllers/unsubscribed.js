const customer = require('../models/customer');

module.exports = async (req, res)=>{

    var data = req.params.id
    var email='', productId='';
    console.log(req.params.id);
    for(i=0;i<data.length;i++)
    {
        if(data[i] != '-'){
            email +=data[i]
        }
        else {
            productId = data.slice(i+1);
            break
        };

    }
    await customer.findOneAndUpdate({email:email}, {$pull:{product:{_id:productId}}});
    console.log(email,'------unsubscribed---',productId)

    res.render('unsubscribe');
}