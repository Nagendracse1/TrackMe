const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;
const key = require('../config/apiKey');

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = key();

module.exports = async(email)=>{

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    let otp = generateOTP();
    console.log('---authenticating otp---->',otp);
    sendSmtpEmail.subject = "OTP!! TrackME";
    sendSmtpEmail.htmlContent = "<html><body><h1>Verify!!</h1><p>This is your OTP: "+otp+"</p></body></html>";
    sendSmtpEmail.sender = {"name":"TrackMe","email":"nagendra@trackme.com"};
    sendSmtpEmail.to = [{"email":email,"name":"Mate!"}];
    // sendSmtpEmail.cc = [{"email":"example2@example2.com","name":"Janice Doe"}];
    // sendSmtpEmail.bcc = [{"email":"John Doe","name":"example@example.com"}];
    sendSmtpEmail.replyTo = {"email":"nagendra.kumar@sendinblue.com","name":"Nagendra Kumar"};
    sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
    sendSmtpEmail.params = {"parameter":"My param value","subject":"New Subject"};
    
    // var flag=false;

    await apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    //   flag=true;
    }, function(error) {
      console.error(error);
      
    });
    console.log(email)
    return otp;
}

function generateOTP() {
          
    let OTP = '';
	for (let i = 0; i < 4; i++ ) {
		OTP += Math.floor(Math.random() * 10);
	}
	return OTP;
}