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

        var price1 = $('#priceblock_ourprice').text().trim().slice(1);
        var price2 = $('#priceblock_dealprice').text().trim().slice(1);
        name = $('#productTitle').text().trim();
        available = $('#availability > span').text().trim();

        var finalprice;

        if(price1) finalprice = price1;
        else finalprice = price2;
        
        for(let i=0; i<finalprice.length; i++){

            if(finalprice[i] !=',' || finalprice[i]=='.'){
                initialPrice +=finalprice[i]
                // console.log(typeof price[i],price[i],typeof initialPrice, initialPrice);
            }
        }
        initialPrice = Number(initialPrice)
        console.log('----details from scrapper---',finalprice,typeof finalprice,initialPrice, typeof initialPrice);

        if(available =='In stock.'){
            available = true
        }
        else available = false
        
    })
    return {initialPrice:initialPrice,name:name,available:available, url:url};
}

// #priceblock_dealprice
// priceblock_ourprice