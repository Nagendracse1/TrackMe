const amazonScrapper = require('../Scrapper/amazon');
const flipkartScrapper = require('../Scrapper/flipkart');
const customer = require('../models/customer');
const notificationMail = require('../API/notificationMail');
const subscribedMail = require('../API/subscriptionMail');

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
    var check = await customer.find({email:req.body.email}
        // if(err) throw err;
        // check =cus[0]
        // console.log(check,'-----c----',cus)    
    );
    if(check[0]) console.log('-----email already exist---');

    if(!check[0]){
        var temp
        console.log('---storing new email---');
        var c= await customer.create({email:req.body.email});
        console.log(c,'-----new email stored----');

    }

    
    // console.log(product);

      customer.findOneAndUpdate({email:req.body.email}, {$push:{product:product}},async(err, cus)=>{
         if(err) throw err
         if(cus){
              console.log("---Details stored in db---");

              console.log('---sending notification---');

              console.log(await subscribedMail({name:product.name, email:cus.email, price:product.initialPrice, url:product.url})); 

              console.log('----notification sent----');              

         }
     });




    // customer.create(await amazonScrapper)
    
    res.redirect('/');
    }

