const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middleware/auth');
const clearCache = require('../middleware/clearCache');
const { SNSPost } = require('../models/SNSPosts');
const { SNSComment } = require('../models/SNSComment');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/sns');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname + '-' + Date.now());
	},
});
const upload = multer({ storage: storage });
router.post('/uploadImages', upload.single('files'), (req, res) => {
	res.status(200).json({ success: true, filePath: req.file.path });
});
router.post('/post', clearCache, (req, res) => {
	const snsPost = new SNSPost(req.body);
	snsPost.save((err, post) => {
		if (err) res.status(400).json({ success: false, err });
		res.status(200).json({ success: true, post });
	});
});

router.get('/getposts', auth, async (req, res) => {
	let skip = parseInt(req.query.skip);
	let limit = parseInt(req.query.limit);

	const posts = await SNSPost.find()
		.skip(skip)
		.limit(limit)
		.populate('writer')
		.sort({ createdAt: -1 })
		.cache({
			key: req.user._id,
		});
	
	res.status(200).json({ success: true, posts });
});

router.get('/reviewposts', auth, async (req, res) => {
	
	let skip = parseInt(req.query.skip);
	let limit = parseInt(req.query.limit);

	const posts = await SNSPost.find()
		.sort({ views: -1 })
		.skip(skip)
		.limit(limit)
		.populate('writer')
		.cache({
			key: req.user._id,
		});
	
	res.status(200).json({ success: true, posts });
});

router.post('/upviews', (req, res) => {
	SNSPost.findOneAndUpdate(
		{ _id: req.body.id },
		{
			$inc: {
				views: 1,
			},
		},
		(err) => {
			if (err) res.json({ success: false, err });
			res.json({ success: true });
		}
	);
});

router.get('/getsnsposts', (req, res) => {
	let term = req.query.word;

	if (term) {
		SNSPost.find({ writer: req.query.id })
			.find({ $text: { $search: term } })
			.populate('writer')
			.exec((err, posts) => {
				if (err) res.json({ success: false, err });
				res.status(200).json({ success: true, posts });
			});
	} else {
		SNSPost.find({ writer: req.query.id })
			.populate('writer')
			.exec((err, posts) => {
				if (err) res.json({ success: false, err });
				res.status(200).json({ success: true, posts });
			});
	}
});

router.post('/addcomment', clearCache, (req, res) => {
	const snsComent = new SNSComment(req.body);
	snsComent.save((err, comment) => {
		if (err) res.json({ success: false, err });
		res.status(200).json({ success: true });
	});
});
router.get('/getcomments', auth, async (req, res) => {
	const comments = await SNSComment.find({ post: req.query.id })
		.populate('writer')
		.cache({
			key: req.user._id,
		});
	res.status(200).json({ success: true, comments });
});
router.post('/deletecomment', auth, clearCache, (req, res) => {
	SNSComment.findOneAndDelete({ _id: req.body.id }, (err) => {
		if (err) res.status(400).json({ success: false, err });
		res.status(200).json({ success: true });
	});
});
router.post('/deletecomment', (req, res) => {
	
	SNSComment.findOneAndDelete({ _id: req.body.id }, (err) => {
		if (err) res.status(400).json({ success: false, err });
		res.status(200).json({ success: true });
	});
});

router.post('/adminSNS', (req, res) => {
	let term = req.body.searchTerm;

	if (term) {
		SNSPost.find({})
			.find({ $text: { $search: term } })
			.populate('wirter')
			.exec((err, posts) => {
				if (err) return res.status(400).json({ success: false, err });
				res.status(200).json({ success: true, posts });
			});
	} else {
		SNSPost.find({})
			.populate('wirter')
			.exec((err, posts) => {
				if (err) return res.status(400).json({ success: false, err });
				res.status(200).json({ success: true, posts });
			});
	}
});

router.post('/removeSNS', auth, clearCache, (req, res) => {
	SNSPost.findOneAndDelete({ _id: req.body.id }, (err) => {
		if (err) res.json({ success: false, err });
		res.status(200).json({ success: true });
	});
});

router.post('/getsearch', (req, res) => {
	let term = req.body.searchTerm;

	if (term) {
		SNSPost.find({ post: req.body._id })
			.find({ $text: { $search: term } })
			.populate('writer')
			.exec((err, posts) => {
				if (err) res.status(400).json({ success: false, err });
				else res.status(200).json({ success: true, posts });
			});
	} else {
		SNSPost.find({ post: req.body._id })
			.populate('writer')
			.exec((err, posts) => {
				if (err) res.status(400).json({ success: false, err });
				else res.status(200).json({ success: true, posts });
			});
	}
});

router.post('/edit', (req, res) => {
	SNSPost.find({ _id: req.body.edit })
		.populate('writer')
		.exec((err, posts) => {
			if (err) res.json({ success: false, err });
			res.status(200).json({ success: true, posts });
		});
});

router.post('/editText', clearCache, (req, res) => {
	let prevText = req.body.previous;
	let newText = req.body.newest;

	SNSPost.findOneAndUpdate(
		{ text: prevText },
		{ $set: { text: newText } },
		{ new: true }
	)
		.populate('writer')
		.exec((err, posts) => {
			if (err) return res.status(400).json({ success: false, posts });
			return res.status(200).json({ success: true, posts });
		});
});

module.exports = router;
