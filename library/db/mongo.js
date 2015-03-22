
var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;



// @TODO:: Must be move to driver file
var dbPort 		= 27017;
var dbHost 		= 'localhost';
var dbName 		= 'user_db';



/**
 *  Establish the database connection
 */

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
	db.open(function(e, d){
	if (e) {
		console.log(e);
	}	else{
		console.log('Connected to database :: ' + dbName);
	}
});
	

/**
 *  Select Collection
 *  users => {username, password, device_id, created_on}
 */
var accounts = db.collection('users');

/* record insertion, update & deletion methods */

/**
 *  Add New User
 */
exports.create = function(data, callback)
{
	// TODO :: check username/mobile-number already exist or not
	// TODO :: check device-id already exxist or not
	
	// if everything is ok then create user 
	accounts.insert(data, {safe: true}, callback);		
};

 exports.getSingle = function(conditions, callback)
 {
	 accounts.findOne(conditions, callback);
 }

