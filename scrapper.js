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


request({url: encodeURI('https://www.amazon.in/dp/B08LRDM44F/ref=s9_acsd_al_bw_c2_x_0_i?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-4&pf_rd_r=66JQV68N067ZXDD8F4WT&pf_rd_t=101&pf_rd_p=0d9bd1b8-0a59-4839-a3f9-38a902ab3e28&pf_rd_i=21634722031'),headers:{'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:80.0) Gecko/20100101 Firefox/80.0'} }, function (error, response, body) {
  console.log('-----amazon----');
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  fs.writeFileSync('try.txt',body);
  const $ =cheerio.load(body);
    // console.log(response.body);
    console.log('-------');
    fs.writeFileSync('try.txt',response.body);
    const price = $('#priceblock_ourprice').text();
    const productName = $('#productTitle').text().trim();
    const available = $('#availability > span').text().trim();
    console.log(price, "\n",productName, "\n",available, "\n"); 
});


// request('https://www.flipkart.com/harvard-full-sleeve-solid-men-jacket/p/itmed3a778baf007?pid=JCKFHHRNH6PYWRED&lid=LSTJCKFHHRNH6PYWREDDQ6ZVH', function (error, response, body) {
//   console.log('-----flipkart-----')
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   // console.log('body:', body); // Print the HTML for the Google homepage.
//   fs.writeFileSync('try.txt',body);
//   const $ =cheerio.load(body);
//     // console.log(response.body);
//     console.log('-------');
//     // fs.writeFileSync('try.txt',response.body);
//     const price = $('#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(2) > div > div.dyC4hf > div.CEmiEU > div > div._30jeq3._16Jk6d').text();
//     const productName = $('#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(2) > div > div:nth-child(1) > h1 > span').text().trim();
//     const available = $('#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(2) > div > div._2JC05C').text().trim();
//     console.log(price, "\n", productName, "\n", available, "\n"); 
// });

// request('https://www.myntra.com/mobile-stand', function (error, response, body) {
//   console.log('-----myntra----');
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   // console.log('body:', body); // Print the HTML for the Google homepage.
//   fs.writeFileSync('try.txt',body);
//   const $ =cheerio.load(body);
//     // console.log(response.body);
//     console.log('-------');
//     // fs.writeFileSync('try.txt',response.body);
//     //#mountRoot > div > div > div > main > div.pdp-details.common-clearfix > div.pdp-description-container > div.pdp-price-info > p.pdp-discount-container > span > strong
//     const price = $('#mountRoot > div > div > div > main > div.pdp-details.common-clearfix > div.pdp-description-container > div.pdp-price-info > p.pdp-discount-container > span.pdp-price > strong').text();
//     const productName = $('#mountRoot > div > div > div > main > div.pdp-details.common-clearfix > div.pdp-description-container > div.pdp-price-info > h1.pdp-name').text().trim();
//     //const available = $('#mountRoot > div > div > div > main > div.pdp-details.common-clearfix > div.pdp-description-container > div:nth-child(3) > div > div.pdp-add-to-bag.pdp-button.pdp-flex.pdp-center.pdp-out-of-stock').text().trim();
//     //console.log(price, "\n", productName, "\n", available, "\n")
//     console.log(price, "\n", productName, "\n")
// });

// request('https://www.nykaa.com/savlon-disinfectant-liquid/p/262959?pps=2&productId=262959&ptype=product&root=cav_pd&skuId=262957', function (error, response, body) {
//   console.log('-----nykaa----');
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   // console.log('body:', body); // Print the HTML for the Google homepage.
//   fs.writeFileSync('try.txt',body);
//   const $ =cheerio.load(body);
//     // console.log(response.body);
//     console.log('-------');
//     // fs.writeFileSync('try.txt',response.body);
//     //#mountRoot > div > div > div > main > div.pdp-details.common-clearfix > div.pdp-description-container > div.pdp-price-info > p.pdp-discount-container > span > strong
//     const price = $('#app > div > div > div:nth-child(1) > div:nth-child(2) > div.clearfix.wrapper-parent > div > div.container > div.row.product_description > div.col-md-7.col-sm-7.product-description-wrap > div > div.m-content__product-des__details > div.product-des__details-price > div.clearfix.product-des__details > div > div > span:nth-child(2) > span').text();
//     const productName = $('#app > div > div > div:nth-child(1) > div:nth-child(2) > div.clearfix.wrapper-parent > div > div.container > div.row.product_description > div.col-md-7.col-sm-7.product-description-wrap > div > div.m-content__product-des__details > div.product-des__details-title > h1').text().trim();
//     //const available = $('#mountRoot > div > div > div > main > div.pdp-details.common-clearfix > div.pdp-description-container > div:nth-child(3) > div > div.pdp-add-to-bag.pdp-button.pdp-flex.pdp-center.pdp-out-of-stock').text().trim();
//     //console.log(price, "\n", productName, "\n", available, "\n")
//     console.log(price, "\n", productName, "\n")
// });