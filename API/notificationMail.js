const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;
const key = require('../apiKey');

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = key();

module.exports = async(product)=>{

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