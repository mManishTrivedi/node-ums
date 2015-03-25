/**
 * DataBase Class to connect db
 */


// @TODO :: fetch from config
var config_db = 'mongo';

	
function DataBase()
{
	// Return according to config db
	return require('./driver/'+config_db);
}


//export database
module.exports = new DataBase();