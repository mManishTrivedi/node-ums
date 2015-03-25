var jwt = require('jwt-simple');


module.exports = function(req, res, next) {

  var token =    req.body.token ;
 // var token1 = (req.body && req.body.token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
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
		      
		      // authenticate user
		      console.log('Good Job, Bhidu!!!!!!!!!');
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
      "status": 40111111,
      "token" : token,
      "message": "Invalid Token "
    });
    return;
  }
};
