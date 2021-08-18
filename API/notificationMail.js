const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;
const key = require('../apiKey');
const customer = require('../models/customer'); 
const amazonScrapper = require('../Scrapper/amazon');
const flipkartScrapper = require('../Scrapper/flipkart');

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = key();

module.exports = async()=>{ 
    
    for(email of await customer.find({})){
        // console.log(typeof a, a);
        for( product of email.product){
            // console.log(product)
            myFunction(email.email, product);
        }
    }; 
};
    
async function myFunction(email,product){
    

        if(product.url.startsWith("https://www.amazon.in/")){

            var CPrice = await amazonScrapper(encodeURI(product.url));
        }
        else if(product.url.startsWith("https://www.flipkart.com/")){
    
            var CPrice = await flipkartScrapper(encodeURI(product.url));
        }
        else if(product.url.startsWith("https://www.myntra.com/")){
    
            // var CPrice = await myntraScrapper(encodeURI(product.url));
        }
        else{
            return false;
        }
        
        if(!CPrice){

            console.log('----Error in scrapping during notification(net. issue)----')
        }

        
        if(product.initialPrice >= CPrice.initialPrice){

            await sendMail({email:email,name:product.name, price:CPrice.initialPrice,url:product.url})
        }
    
};


sendMail = async(product)=>{

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    
    sendSmtpEmail.subject = "Price Drop!!"+product.name;
    sendSmtpEmail.htmlContent = "<html><body><h1>Hurry up!!</h1><h3><a href="+product.url+">"+product.name+"</a></h3><p>"+product.price+"</p></body></html>";
    sendSmtpEmail.sender = {"name":"TrackMe","email":"nagendra@trackme.com"};
    sendSmtpEmail.to = [{"email":product.email,"name":"Mate!"}];
    // sendSmtpEmail.cc = [{"email":"example2@example2.com","name":"Janice Doe"}];
    // sendSmtpEmail.bcc = [{"email":"John Doe","name":"example@example.com"}];
    sendSmtpEmail.replyTo = {"email":"nagendra.kumar@sendinblue.com","name":"Nagendra Kumar"};
    sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
    sendSmtpEmail.params = {"parameter":"My param value","subject":"New Subject"};
    
    var flag=false;

    await apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      flag=true;
    }, function(error) {
      console.error(error);
      
    });
    console.log(product.email, product.name, product.price)
    return flag;
}