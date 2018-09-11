var express=require('express');
var Request = require("request");
var dateFormat = require('dateformat');
var router=express.Router();
var result;


var obj={ "TripType": "O", "NoOfAdults": 0, "NoOfChilds": 0, "NoOfInfants": 0, "ClassType": "Economy", "OriginDestination": [ { "Origin": "SFO", "Destination": "LAX", "TravelDate": "10/24/2018" } ], "Currency": "USD" };


router.post('/adding', function(req,res){
    req.session.traveld=req.body.ddate;
    var adl=(Number)(req.body.adultplus)+(Number)(req.body.adultminus);
    console.log(adl);
    if(adl>0){
        req.session.adlt=adl;
    }
    else{
        req.session.adlt=0;
    }
    var chl=(Number)(req.body.childplus)+(Number)(req.body.childminus);
    if(chl>0)
          req.session.chid=chl;
    else  
       req.session.chid=0;
console.log(chl);
    req.session.traveljstart=req.body.Destination;
   res.redirect('/flight');
});

router.get('/flight', function(req,res){

    obj.OriginDestination[0].TravelDate=dateFormat(req.session.traveld, "mm/dd/yyyy");
    obj.NoOfAdults=req.session.adlt;
    obj.NoOfChilds=req.session.chid;
    obj.OriginDestination[0].Origin=req.session.traveljstart;

if( obj.NoOfChilds>0 || obj.NoOfAdults>0){
    Request.post({
        "headers": { "mode":"sandbox","content-type": "application/json","apikey":"7e75db03-9b7d-4" },
        "url": "https://dev-sandbox-api.airhob.com/sandboxapi/flights/v1.3/search",
        "body": JSON.stringify(obj)
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        result=JSON.parse(body);
        console.dir(result);
    
    res.render('flight',{
        
        allf: result.OneWayAvailabilityResponse.ItinearyDetails[0].Items
    });
 });
}
});

var otherf={ "TripType": "O", "NoOfAdults": 1, "NoOfChilds": 0, "NoOfInfants": 0, "ClassType": "Economy", "OriginDestination": [ { "Origin": "SFO", "Destination": "LAX", "TravelDate": "10/24/2018" } ], "Currency": "USD" };

router.get('/flightother', function(req,res){
    var tomorrow = new Date(req.session.traveld);
    tomorrow.setDate(tomorrow.getDate() + 6);
    otherf.OriginDestination[0].TravelDate=dateFormat(tomorrow, "mm/dd/yyyy");
    otherf.NoOfAdults=req.session.adlt;
    otherf.NoOfChilds=req.session.chid;

    Request.post({
        "headers": { "mode":"sandbox","content-type": "application/json","apikey":"7e75db03-9b7d-4" },
        "url": "https://dev-sandbox-api.airhob.com/sandboxapi/flights/v1.3/search",
        "body": JSON.stringify(otherf)
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        ores=JSON.parse(body);
        console.dir(ores);
    
    res.render('flight',{
        
        allf: ores.OneWayAvailabilityResponse.ItinearyDetails[0].Items
    });
 });
});
module.exports=router;