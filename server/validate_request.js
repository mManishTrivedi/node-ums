var jwt = require('jwt-simple');


//global variable to maintain current login user

global.loggedin_user = false;
/**
 * instantly invoke to Authorize token
 */
module.exports = function(req, res, next) {

  // get token from request {POST, GET, body, Query }
  var token =    req.param('token') ;

  if (token) {
    try {
    		var decoded = jwt.decode(token, require('./config/secret_key.js')());
    		
    		if (decoded.exp <= Date.now()) {
    			res.status(400);
		        res.json({
		          "status": 400,
		          "message": "Token Expired"
		        });
		        return;
		      } 
		      
		    //TODO :: user must be exist. May be user deleted but token exist :P 
		      
    		global.loggedin_user = { username : decoded.username };
		    next();
		     
    } catch (err) {
     // res.status(500);
      res.json({
        "status": 500,
        "message": "Oops something went wrong",
        "error": err
      });
      return;
    }
  } else {
   // res.status(401);
    res.json({
      "status": 400,
      "message": "Invalid Token "
    });
    return;
  }
};
