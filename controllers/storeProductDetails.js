const amazonScrapper = require('../Scrapper/amazon');
const flipkartScrapper = require('../Scrapper/flipkart');
const customer = require('../models/customer');

module.exports = async (req, res)=>{
    console.log('\n\n\n----',req.body.email);

    var urlType = req.body.url;

    if(urlType.startsWith("https://www.amazon.in/")){

        var product = await amazonScrapper(encodeURI(req.body.url));

    }
    else if(urlType.startsWith("https://www.flipkart.com/")){

        var product = await flipkartScrapper(encodeURI(req.body.url));
    }
    else if(urlType.startsWith("https://www.myntra.com/")){

        // var product = await myntraScrapper(encodeURI(req.body.url));
    }
    else{
        throw error;
    }
    console.log('----scrapping done----')

    var check
    await customer.find({email:req.body.email}, (err, cus)=>{
        if(err) throw err;
        check =cus[0]
        console.log('-----email already exist---');
    });

    if(!check){

        console.log('---storing new email---');
        await customer.create({email:req.body.email}, (err, cus)=>{
            if(err) throw err;
            // console.log(cus);
        });

    }

    // console.log(await amazonScrapper(req.body.url))
    
    //
    console.log(product);

     customer.findOneAndUpdate({email:req.body.email}, {$push:{product:product}},(err, cus)=>{
         if(err) throw err
        console.log("---Details stored in db---");
     });


    // customer.create(await amazonScrapper)
    
    res.redirect('/');
    }

