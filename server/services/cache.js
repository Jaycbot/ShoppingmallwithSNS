const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
//promise 형태로 쓰기 위해서 promisify 해줌
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
	this.useCache = true;
	this.hashKey = JSON.stringify(options.key || 'default');
	return this;
	// chaining을 위해 이 mongoose 모델 그 자체를 다시 넘겨줌
};
mongoose.Query.prototype.exec = async function () {
	if (!this.useCache) {
		return exec.apply(this, arguments);
	}

	const key = JSON.stringify(
		Object.assign(
			{},
			{
				op: this.op,
				options: this.options,
				_conditions: this._conditions || 'default',
			},
			{
				collection: this.mongooseCollection.name,
			}
		)
	);

	const cacheValue = await client.hget(this.hashKey, key);
	if (cacheValue) {
		
		const doc = JSON.parse(cacheValue);
		return doc;
	}
	const result = await exec.apply(this, arguments);
	
	client.hset(this.hashKey, key, JSON.stringify(result), (error) => {
		if (error) {
			console.log(error);
		}
	});
	client.expire(this.hashKey, 120);
	return result;
};
module.exports = {
	clearHash(hashKey) {
		client.del(JSON.stringify(hashKey));
	},
};
