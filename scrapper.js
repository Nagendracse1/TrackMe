// const fs = require('fs');
// const cheerio = require('cheerio');
// const got = require('got');

// const url = "https://www.amazon.in/Apple-MHXH3ZM-A-MagSafe-Charger/dp/B08L5R6ZHP/?_encoding=UTF8&pd_rd_w=2rZRO&pf_rd_p=ab4aa62e-ee61-4bc4-928a-fc54f74f1993&pf_rd_r=18ZPVVPM4RJDYCBSMYX2&pd_rd_r=105caf65-f547-499c-8274-13c30d51b59c&pd_rd_wg=hByBG&ref_=pd_gw_ci_mcx_mr_hp_d";

// got(url).then(response => {
//     const $ =cheerio.load(response.body);
//     console.log(response.body);
//     console.log('-------');
//     fs.writeFileSync('try.txt',response.body);
//     const temp = $('#priceblock_ourprice').text();
//     console.log(temp); 
// }).catch(err=>{
    
//     console.log(err);
//     console.log("--------676767--------");
// })

// const axios = require("axios")
// const cheerio = require("cheerio")
// const { response } = require("express")

// axios.get('https://www.amazon.in/Apple-MHXH3ZM-A-MagSafe-Charger/dp/B08L5R6ZHP/?_encoding=UTF8&pd_rd_w=2rZRO&pf_rd_p=ab4aa62e-ee61-4bc4-928a-fc54f74f1993&pf_rd_r=18ZPVVPM4RJDYCBSMYX2&pd_rd_r=105caf65-f547-499c-8274-13c30d51b59c&pd_rd_wg=hByBG&ref_=pd_gw_ci_mcx_mr_hp_d').then((res)=>{
//     // console.loge(response);
//     fs.writeFileSync('try.txt',response);
    

// }).catch((error) => {
//     console.error(error)
//     console.log('-----');
// });

const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');


request('https://www.amazon.in/gp/product/B07P96MZXC/ref=ox_sc_saved_image_7?smid=&psc=1', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  fs.writeFileSync('try.txt',body);
  const $ =cheerio.load(body);
    // console.log(response.body);
    console.log('-------');
    // fs.writeFileSync('try.txt',response.body);
    const price = $('#priceblock_ourprice').text();
    const productName = $('#productTitle').text().trim();
    const available = $('#availability > span').text().trim();
    console.log(price,productName,available); 
});