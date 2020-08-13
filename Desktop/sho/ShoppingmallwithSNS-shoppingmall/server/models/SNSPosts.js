const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SNSPostsSchema = mongoose.Schema({
	writer: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	text: {
		type: String,
	},
	snapshots: {
		type: Array,
		default: [],
	},
	likes: {
		type: Number,
		default: 0,
	},
	views: {
		type: Number,
		default: 0,
	},
// });


},{ timestamps : true });

SNSPostsSchema.index({
    writer : 'text',
    text : 'text'
},{
    weights : {
        writer : 5,
        text : 1
    }
})

SNSPostsSchema.index({
    text: 'text',
    views : 'text'
},{
    weights: {
        text : 5,
        views : 1
    }
})

const SNSPost = mongoose.model('SNSPost', SNSPostsSchema);

module.exports = { SNSPost };
