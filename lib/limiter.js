const limit = require('express-rate-limit');

exports.limiter = new limit({ 
	windowMs: 60000,
	max: 100,
	handler(req, res) {
		res.status(this.statusCode).json({
			code: this.statusCode,
			message: 'Max request count'
		});
	}
});