var express=require('express');
var path=require('path');
var session = require('express-session');
var app=express();
var bodyParser=require('body-parser');

//configure app
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// middleware
app.use(session({secret:'triftsession'}));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

//define routes
app.use(require('./routes/landing'))
app.use(require('./routes/inforoute'))
app.use(require('./routes/flight'))

// server
app.listen(1337, function(){
    console.log('ready on port 1337');
});