const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { config, engine } = require('express-edge');
config({ cache: process.env.NODE_ENV === 'production' });
const mongoose = require('mongoose');
const notificationMail = require('./API/notificationMail');


mongoose.connect('mongodb://localhost/TrackMe');

const app = new express();


app.use(express.static('public'));
app.use(engine);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.set('views',`${__dirname}/views`);


const homePageController = require('./controllers/homePage');
const storeController = require('./controllers/storeProductDetails');

app.get('/',homePageController);
app.post('/form/store',storeController);


function intervalFxn(){
    console.log('-----Checking for price drop-----',new Date().toLocaleTimeString());
    notificationMail();

}
// notificationMail();
setInterval(intervalFxn, 60*60*1000);

app.use((req, res)=> res.render('notFound'));

app.listen(1007,()=>{
    console.log("App listen on Port 1007");
});