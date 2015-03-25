/**
 * Define here USER Class
 */

module.exports = new User();


var database = require('../core/driver');
var jwt = require('jwt-simple');

// need for current date
var moment 		= require('moment');
var crypto 		= require('crypto');

/**
 * Class constructor
 */
function User() { }

/**
 * Invoke to register user
 * @param req
 * @param res
 * @param next
 * 
 */
User.prototype.register = 
	function (req, res, next) 
	 {

		//TODO:: Need server validation for mandatory field 

	 	// Check 1# ::User-name already exist or not
		database.user.getOne(
			 { username : req.param('username') },
			   function(error, result) {

				// got any kind of error
				 if (error) {
					 res.json({ 
						 	success : false , response_code : 401 ,
					 		error : { code : 401, message : error }
					     });
					 
					 return;
				 }
				 
				 //user-name already exist
				 if (result) {
					 res.json({ 
						 	success : true , response_code : 200 ,
					 		data : {  message : 'Username already exist' }
					     });
					 
					 return;
				 }
				 
				 // Check 2# :: if user-name is not exist then check device id
				 database.user.getOne(
						 { device_id : req.param('device_id') },
						 function(error, result) {
							 
							 // got any kind of error
							 if (error) {
								 res.json({ success : false , response_code : 400 ,
								 		error : { code : 400, message : error }
								     });
								 
								 return;
							 }
							 
							 // if device already exist
							 if (result) {
								 res.json({ success : true , response_code : 200 ,
								 		data : { message : 'Device already exist' }
								     });
								 
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
							 database.user.insert( data,
								  function (error) { 
								  	// TODO :: create log
									
								 	// got any kind of error
									if (error) {
										res.json({ 
											success : false , response_code : 401 ,
									 		error : { code: 456,  message : error }
									     });
										return;
									} 
									
									// TODO::if user successfully created then trigger onUserCreation
									res.json({ 
										success : true , response_code : 200 ,
									 	data : { message : 'User created successfully' }
									   });
								});
						 });
			 });
	 };
	 
/**
 * 
 * @param req
 * @param res
 * @param next
 */
User.prototype.login = 
	function (req, res, next)
	{
		//TODO :: trigger onUserLogin
		res.json(
				 { success : true , response_code : 200 ,
				   data : { message : 'User Login Successfully' }
				 });
		
	}
	 


/** 
 * private encryption  methods 
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