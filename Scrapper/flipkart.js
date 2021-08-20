const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
var rp = require('request-promise');
const { init } = require('../models/customer');


module.exports = async (url)=>{
    var initialPrice = ''
    var name,available
    console.log('-----Scrapping started---');

    await rp({url:url, headers:{'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:80.0) Gecko/20100101 Firefox/80.0'} },(err, res, body)=>{

        if(err) return false;
        console.log('statusCode:', res && res.statusCode);

        const $ = cheerio.load(body);

        var price = $('#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(2) > div > div.dyC4hf > div.CEmiEU > div > div._30jeq3._16Jk6d').text().trim().slice(1);
        name = $('#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(2) > div > div:nth-child(1) > h1 > span').text().trim();
        available = $('#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(2) > div > div._2JC05C').text().trim();
        
        for(let i=0; i<price.length; i++){

            if(price[i] !=',' || price[i]=='.'){
                initialPrice +=price[i]
                // console.log(typeof price[i],price[i],typeof initialPrice, initialPrice);
            }
        }
        initialPrice = Number(initialPrice)
        // console.log(price,typeof price,initialPrice, typeof initialPrice);

        if(available =='Hurry, Only a few left!'){
            available = true
        }
        else available = false
        
    })
    return {initialPrice:initialPrice,name:name,available:available, url:url};
}