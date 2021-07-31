const rd = require('../db/redis');

exports.logout = function(req, res) {
    rd.REDIS_DEL(req.headers.authorization.split('Bearer ')[1]); 
    res.json({msg: "SUCCESS"});
}