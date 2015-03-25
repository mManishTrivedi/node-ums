/**
 *  Mongo DB Driver
 * 
 */


var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;



// @TODO:: Must be move to driver file
var dbPort 		= 27017;
var dbHost 		= 'localhost';
var dbName 		= 'ums_db';



/**
 *  Establish the database connection
 */

var mongo_db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
	mongo_db.open(function(e, d){
	if (e) {
		console.log(e);
	}	else{
		console.log('Connected to database :: ' + dbName);
	}
});
	

	/**
	 * 
	 * Select All available Collections
	 *  
	 * @returns none
	 */
function mongo_db_class(){
	/**
	 *  Select Collection
	 *  users => {username, password, device_id, created_on}
	 */
 
	this.collection_user = mongo_db.collection('users');
}


/* record insertion, update & deletion methods */

mongo_db_class.prototype.user = 
{
		// create user
		create 	:	
			function(data, callback) 
			{
				// if everything is ok then create user 
				this.collection_user.insert(data, {safe: true}, callback);	
			
			},
			
		// get single record
		getOne	:	
			function(data, callback) 
			{
				this.collection_user.findOne(conditions, callback);	
			}
};


module.exports = new mongo_db_class();
