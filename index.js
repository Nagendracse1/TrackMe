const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { config, engine } = require('express-edge');
config({ cache: process.env.NODE_ENV === 'production' });
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/TrackMe');

const app = new express();


app.use(express.static('public'));
app.use(engine);

app.set('views',`${__dirname}/views`);


const homePageController = require('./controllers/homePage');


app.get('/',homePageController);


app.listen(1007,()=>{

    console.log("App listen on Port 1007");
});