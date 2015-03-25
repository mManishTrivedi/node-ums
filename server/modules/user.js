/**
 * Define here USER Class
 */

// @TODO :: Should be globally available
// get db from db-driver
//var driver = require('../library/db/driver');
//var db = driver.db;
//var jwt = require('jwt-simple');

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
		//TODO :: trigger onUserCreation
		res.json(
				 { success : true , response_code : 200 ,
				   data : { message : 'User created successfully' }
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
	 

module.exports = new User();