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
	 * Class constructor
	 *  
	 * @returns none
	 */
function mongo_db_class() { }

/**
 * ==========================================
 * Static Variables
 *  Define all collection here
 * ==========================================
 */
mongo_db_class.collection_user = mongo_db.collection('users');

/**  
 * ============== 
 * 	Public Method
 * record insertion,fetching methods 
 * 
 */

mongo_db_class.prototype.user = 
{
		// create user
		insert 	:	
			function(data, callback) 
			{ 
				mongo_db_class.collection_user.insert(data, {safe: true}, callback);	
			},
			
		// get single record
		getOne	:	
			function(conditions, callback) 
			{
				mongo_db_class.collection_user.findOne(conditions, callback);	
			}
};


module.exports = new mongo_db_class();
