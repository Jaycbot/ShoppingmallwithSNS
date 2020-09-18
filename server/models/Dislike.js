const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    commentId : {
        type : Schema.Types.ObjectId,
        ref : 'SNSComment'
    }
    
}, {timestamps : true})


const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = { Dislike }