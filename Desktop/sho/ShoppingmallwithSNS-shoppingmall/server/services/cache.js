const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
//promise 형태로 쓰기 위해서 promisify 해줌
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;
/*caching을 할지 결정하는 함수 추가
 이렇게 하지 않으면 몽구스 모델의
 query부분 전체를 캐싱하기 때문에
 오히려 비효율적인 연산이 됨
 -캐싱이 모두 효율적인 것은 아님
*/
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
			{ op: this.op, options: this.options },
			{
				collection: this.mongooseCollection.name,
			}
		)
	);
	const cacheValue = await client.hget(this.hashKey, key);
	if (cacheValue) {
		console.log('캐싱 된 데이터 입니다.');
		const doc = JSON.parse(cacheValue);
		return doc;
	}
	const result = await exec.apply(this, arguments);
	console.log('캐싱 할 데이터 입니다.');
	client.hset(this.hashKey, key, JSON.stringify(result), (error) => {
		if (error) {
			console.log(error);
		}
	});
	client.expire(this.hashKey, 1800);
	return result;
};
module.exports = {
	clearHash(hashKey) {
		client.del(JSON.stringify(hashKey));
	},
};
