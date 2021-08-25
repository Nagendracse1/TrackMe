[Amazon & Flipkart Price Tracker](https://yourtrackme.herokuapp.com/) 
==============

This web app is used to fetch the real time price of products from e-commerce websites according to users preferences and send notification to the customer whenever the price of that product decreases.

#### Install Node.js
```
https://nodejs.org/
```

#### Install the project dependencies: 
```
npm install
```
#### Add file
```
create folder with name config in root directory and create two file in config folder with name 
1.apikey.js 
2.db.js
```
#### Insert code in apiKey.js
```
module.exports = ()=>{
    return "Enter your API key" ;
}
```
#### Insert code in db.js
```
module.exports = {

    getDbConnectionString: function(){
        return 'Enter your connection string';
    }
}
```

#### Run the script
```
node server.js
```

### How to use-

* Enter url & email Id.
* Enter OTP for first time user.
* New pop up appear when product successfully register & you will also get a subscribtion with product detail on your registered email.
* Whenever the price decreases, you will get a notification mail automatically.

