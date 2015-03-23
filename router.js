/**
 * 
 */


var   routes = require('./routes')
	 , user = require('./routes/user')
	 
	 
module.exports = function(app) {

		
		app.get('/', routes.index);
		
		/**
		 * Define User Module request
		 */
		
		// app.get('/users', user.list);				// list of users 
		// app.get('/user/signup', user.create);		// Sign-up form
		
		app.post('/user/signup', user.create);		// create new user
		app.post('/user/login',  user.login);		// login req 
		
		//  Unknown request
		app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });

};