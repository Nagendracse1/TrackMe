const amazonScrapper = require('../Scrapper/amazon');
//const flipkartScrapper = require('../Scrapper/flipkart');
const customer = require('../models/customer');

module.exports = async (req, res)=>{
    console.log(req.body.email);

    var check
    await customer.find({email:req.body.email}, (err, cus)=>{
        if(err) throw err;
        check =cus[0]
        // console.log('-----check---',cus);
    });

    if(!check){

        console.log('---condition passed---');
        customer.create({email:req.body.email}, (err, cus)=>{
            if(err) throw err;
            // console.log(cus);
        });

    }

    // console.log(await amazonScrapper(req.body.url))
    var product = await amazonScrapper(req.body.url);
    //var product = await flipkartScrapper(req.body.url);
    console.log(product);

     customer.findOneAndUpdate({email:req.body.email}, {$push:{product:product}},(err, cus)=>{
         if(err) throw err
        //  console.log(cus)
     });


    // customer.create(await amazonScrapper)
    
    res.redirect('/');
    }

// // console.log(await flipkartScrapper(req.body.url))
// var product = await flipkartScrapper(req.body.url);
// console.log(product);

//  customer.findOneAndUpdate({email:req.body.email}, {$push:{product:product}},(err, cus)=>{
//      if(err) throw err
//      console.log(cus)
//  });


// // customer.create(await flipkartScrapper)

// res.redirect('/');
//}