var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

var formatMessage = " Try again with /SAN,JOSE or /boston in addressbar";

/* GET home page. */
router.get('/:city', function(req, res, next) {
    
    var message = "Mrugens Zip code finder App, hey I'm running in Docker that's so Cool!";
	var db = req.db;
	var name = (req.query["city"]|| req.params.city).toUpperCase();
	if(!name|| name==="DUMMY"){
		res.render('index', { title:message,"data":formatMessage});
	} else{
		var city = "";
	if(name.indexOf(',')!=-1){
		var parts  = name.split(",");
		city = parts[0]+" "+parts[1];
	}else{
		city = name;
	}
	var zips = db.get("zips");
	zips.findOne({"city":city}, function (err,doc) {
		if(doc){
			res.render('index', { title: message,"data":"Zip Code for "+req.params["city"]+" is:"+doc._id });
		} else{
			res.render('index', { title:message,"data":"Sorry no Zipcode found for your city "+city+" "+formatMessage});
		}
		
	});
	}

	
});

router.get('/', function(req, res, next) {
    res.redirect("/dummy");
});

module.exports = router;
