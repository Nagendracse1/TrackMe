const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
var rp = require('request-promise');
const { init } = require('../models/customer');


module.exports = async (url)=>{
    var initialPrice = ''
    var name,available
    
    await rp(url,(err, res, body)=>{

        if(err) throw err;
        console.log('statusCode:', res && res.statusCode);

        const $ = cheerio.load(body);

        var price = $('#priceblock_ourprice').text().trim().slice(1);
        name = $('#productTitle').text().trim();
        available = $('#availability > span').text().trim();
        
        for(let i=0; i<price.length; i++){

            if(price[i] !=',' || price[i]=='.'){
                initialPrice +=price[i]
                // console.log(typeof price[i],price[i],typeof initialPrice, initialPrice);
            }
        }
        initialPrice = Number(initialPrice)
        // console.log(price,typeof price,initialPrice, typeof initialPrice);

        if(available =='In stock.'){
            available = true
        }
        else available = false
        
    })
    return {initialPrice:initialPrice,name:name,available:available, url:url};
}