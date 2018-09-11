var express=require('express');
var Request = require("request");
var fs = require("fs");
var dateFormat = require('dateformat');

var router=express.Router();

var trip=[
    {id:1, dur:'3 night',tript:'Experience True and Authentic Greece', auth:'By Ryan Shirley', tripp:'1256', tripc:'AED',origin:"SFO",Destination:"LAX"}
];

router.get('/', function(req,res){
    res.render('home',{
        items: trip
    });
 });

 module.exports=router;