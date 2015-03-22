/**
 * New node file
 */


// @TODO :: fetch from config
var config_db = 'mongo'

// @todo :: make sure require only one time in a request
exports.db = require('./'+config_db);