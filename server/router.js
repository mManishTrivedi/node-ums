/**
 * 
 * Our Custom Modules
 * 
 */


var  user = require('./modules/user')
	 
	 
module.exports = function(app) {		
		
		/*
		 * Define User Module request
		 */		
		
		app.post('/user/signup', user.register);		// create new user
		app.post('/user/login',  user.login);		// login request
		
		/*
		 * Authenticate Area
		 */

		// Validate request
		//app.all('/api/v1/*', require('./validate_request.js'));
		//app.post('/api/v1/me', user.me);
		
		/*
		 *   Unknown request
		 */
		app.get('*', function(req, res) 
								{ 
									res.json( {
												success : false , response_code :  '404', 
											    error : { code: 404, message : 'Page Not Found'} 
											  }); 
								});

};