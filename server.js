const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { config, engine } = require('express-edge');
config({ cache: process.env.NODE_ENV === 'production' });
const mongoose = require('mongoose');
const notificationMail = require('./mail/notificationMail');


mongoose.connect('mongodb://localhost/TrackMe');

const app = new express();


app.use(express.static('public'));
app.use(engine);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));



app.set('views',`${__dirname}/views`);


const homePageController = require('./controllers/homePage');
const storeController = require('./controllers/storeProductDetails');
const emailExistController = require('./controllers/emailExist');
const otpAuthController = require('./controllers/otpAuth');
const unsubscribeController = require('./controllers/unsubscribed');

app.get('/',homePageController);
app.post('/form/store',storeController);
app.post('/emailExist',emailExistController);
app.post('/otpAuth',otpAuthController);
app.get('/unsubscribe/:id', unsubscribeController);



function intervalFxn(){
    console.log('-----Checking for price drop-----',new Date().toLocaleTimeString());
    notificationMail();

}
// notificationMail();
setInterval(intervalFxn, 3*60*60*1000);

app.use((req, res)=> res.render('notFound'));

app.listen(process.env.PORT || 1007,()=>{
    console.log("App listen on Port 1007");
});