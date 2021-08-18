const optAuth = require('../API/otpAuth');

module.exports = async(req, res)=>{

    // console.log(req.body.email);
    var a = await optAuth(req.body.email)
    console.log(a, req.body.email)
    res.send(a);

}