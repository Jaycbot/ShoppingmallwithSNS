const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { Dislike } = require('../models/DisLike');
const { log } = require('console');

//=================================
//             Product
//=================================

router.post('/getLikes', (req, res) => {
	let variable = {};
	
	if (req.body.commentId) {
		variable = { commentId: req.body.commentId , userId: req.body.userId
		,postId: req.body.postId, userFrom: req.body.userFrom };
	} else if(req.body.postId)
	{	
		
		variable = {postId: req.body.postId}
	}
	Like.find(variable).exec((err, likes) => {
		if (err) return res.status(400).send(err);
		res.status(200).json({ success: true, likes });
	});
});


router.post('/upLike', (req, res) => {
	let variable = {};
	// console.log(req.body)
	if (req.body.commentId) {
		variable = { commentId: req.body.commentId, userId: req.body.userId,
			userFrom: req.body.userFrom };
	} else if(req.body.postId){

		console.log(req.body)
		variable = {postId: req.body.postId, userFrom: req.body.userFrom}
	}
	
	// Like collection에 정보를 넣어 준다.
	const like = new Like(variable);

	like.save((err, likeResult) => {
		if (err) return res.status(400).json({ success: false, err });
			res.status(200).json({ success: true });
	});
});

router.post('/unLike', (req, res) => {
	let variable = {};
	
	if (req.body.commentId) {
		variable = { commentId: req.body.commentId, userId: req.body.user, userFrom: req.body.userFrom };
	} else if(req.body.postId)
		variable = {postId: req.body.postId, userFrom: req.body.userFrom};

	Like.findOneAndDelete(variable)
	.exec((err, result) => {
		if (err) return res.status(400).json({ success: false, err });
		res.status(200).json({ success: true });
	});
});

module.exports = router;
