

// @TODO :: Should be globally available
// get db from db-driver
var driver = require('../library/db/driver');
var db = driver.db;

// need for current date
var moment 		= require('moment');
var crypto 		= require('crypto');


/**
 * user login or not 
 */
exports.login = function(req, res) {
	
	//@TODO : Server validation
	var username = req.param('username');
	var plain_password = req.param('password');
	
	var error_msg = 'Invalid Username/Pwd ';
	
	db.getSingle(
			 {username : username },
			 function(error, result) {
				 if (error) {
					 res.send(error, 400); //Something is wrong 
					 return;
				 } 
				 
				 if (!result) { // empty result
					  res.send(error_msg,  200);
					  return ;
				 }
				 
				//get hash pwd
				 var hashed_password = result.password;
				 
				//get salt
				 var salt = hashed_password.substr(0, 10);
				 
				 var validHash = salt + md5(plain_password + salt);
				 
				 if( hashed_password === validHash) {
					 //TODO :: callback onLoginSuccess
					 res.send("Yo Yo!! You have logged-in",  200);
				 }else {
					 res.send(error_msg,  200);
				 }
			});
};
	
/*
 * GET users listing.
 */
exports.list = function(req, res){
  res.send("//@TODO::display User list");
};


/**
 * Create new user
 */
exports.create = function(req, res) {
	
	//TODO :: Server validation 
		
	// Chck 1# ::Username already exist or not
	db.getSingle(
			 {username : req.param('username') },
			 function(error, result) {
				 if (error) {
					 res.send(error, 400); //Something is wrong
					 return;
				 }
				 
				 if (result) {
					 res.send('Username already exist', 200);
					 return;
				 }
				 
				 // Check 2# :: if username is not exist then check device id
				 
				 db.getSingle(
						 {device_id : req.param('device_id') },
						 function(error, result) {
							 if (error) {
								 res.send(error, 400); // Something is wrong
								 return;
							 }
							 
							 if (result) {
								 res.send('Device already exist', 200);
								 return;
							 }
							 
							 // if device is not exist then create user
							 var data = 
							 	  {  	
									 username 	: req.param('username'),
									 password 	: saltAndHash( req.param('password')) ,
									 device_id 	: req.param('device_id')
							  	  };
						
						// append date stamp when record was created //
						data.created_on = moment().format('MMMM Do YYYY, h:mm:ss a');
						
						// create new user
						 db.create(
								  data,
								  function (error) { 
								  // @TODO :: create log
									
									if (error){
										res.send(error, 400);
									} else {
										res.send('good user created successfully', 200); 
									}
								}			 
							);
						 } 
						);
				
			 } 
			);
	  
	 //res.send("respondsss with a resource");
  };
  
  
  
  
  /** 
   * private encryption & validation methods 
   */

  var generateSalt = function()
  {
  	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
  	var salt = '';
  	for (var i = 0; i < 10; i++) {
  		var p = Math.floor(Math.random() * set.length);
  		salt += set[p];
  	}
  	return salt;
  }

  var md5 = function(str) {
  	return crypto.createHash('md5').update(str).digest('hex');
  }

  var saltAndHash = function(password)
  {
  	var salt = generateSalt();
  	var salt_and_hash = salt + md5(password + salt);
  	
  	return salt_and_hash;
  }