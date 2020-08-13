const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SNSCommentSchema = mongoose.Schema({
	writer: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	post: {
		type: Schema.Types.ObjectId,
		ref: 'SNSPost',
	},
	comment: {
		type: String,
	},
});

const SNSComment = mongoose.model('SNSComment', SNSCommentSchema);

module.exports = { SNSComment };
