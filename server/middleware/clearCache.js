const { clearHash } = require('../services/cache');
module.exports = async (req, res, next) => {
	await next();
	if (req.body.writer) {
		clearHash(req.body.writer);
	} else {
		clearHash(req.user._id);
	}
};
