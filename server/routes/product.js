const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product'); 

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/shop');
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}_${file.originalname}`);
	},
});

var upload = multer({ storage: storage }).single('file');

router.post('/image', (req, res) => {
	// 가져온 이미지를 저장을 해주면 된다.

	upload(req, res, (err) => { 
		if (err) {
			return req.json({ success: false, err });
		}
		return res.json({
			success: true,
			filePath: res.req.file.path,
			fileName: res.req.file.filename,
		});
	});
});

var desstorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/shop');
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}_${file.originalname}`);
	},
});

var desupload = multer({ storage: desstorage }).single('file');

router.post('/desimage', (req, res) => {
	// 가져온 이미지를 저장을 해주면 된다.

	desupload(req, res, (err) => { 
		if (err) {
			return req.json({ success: false, err });
		}
		return res.json({
			success: true,
			filePath: res.req.file.path,
			fileName: res.req.file.filename,
		});
	});
});

router.post('/', (req, res) => {
	//받아온 정보들을 DB에 넣어준다.
	const product = new Product(req.body);

	product.save((err) => {
		if (err) return res.status(400).json({ success: false, err });
		return res.status(200).json({ success: true });
	});
});

router.post('/products', (req, res) => {
	//product collection에 들어 있는 모든 상품 정보를 가져오기

	let limit = req.body.limit ? parseInt(req.body.limit) : 1000;
	let skip = req.body.skip ? parseInt(req.body.skip) : 0;
	let term = req.body.searchTerm;

	let findArgs = {};

	if (term) {
		Product.find(findArgs)
			.find({ $text: { $search: term } })
			.populate('wirter')
			.skip(skip)
			.limit(limit)
			.exec((err, productInfo) => {
				if (err) return res.status(400).json({ success: false, err });
				return res
					.status(200)
					.json({ success: true, productInfo, postSize: productInfo.length });
			});
	} else {
		Product.find(findArgs)
			.populate('wirter')
			.skip(skip)
			.limit(limit)
			.exec((err, productInfo) => {
				if (err) return res.status(400).json({ success: false, err });
				return res
					.status(200)
					.json({ success: true, productInfo, postSize: productInfo.length });
			});
	}
});

router.post('/newproducts', (req, res) => {
	//product collection에 들어 있는 모든 상품 정보를 가져오기

	let limit = req.body.limit ? parseInt(req.body.limit) : 1000;
	let skip = req.body.skip ? parseInt(req.body.skip) : 0;
	
		Product.find({})
			.populate('wirter')
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 })
			.exec((err, productInfo) => {
				if (err) return res.status(400).json({ success: false, err });
				return res
					.status(200)
					.json({ success: true, productInfo, postSize: productInfo.length });
			});
	
});

router.post('/sellerProducts', (req, res) => {
	//product collection에 들어 있는 모든 상품 정보를 가져오기

	let term = req.body.searchTerm;
	let writer = req.body.writer;

	if (term) {
		Product.find({ writer: writer })
			.find({ $text: { $search: term } })
			.populate('wirter')
			.exec((err, productInfo) => {
				if (err) return res.status(400).json({ success: false, err });
				return res
					.status(200)
					.json({ success: true, productInfo, postSize: productInfo.length });
			});
	} else {
		Product.find({ writer: writer })
			.populate('wirter')
			.exec((err, productInfo) => {
				if (err) return res.status(400).json({ success: false, err });
				return res.status(200).json({ success: true, productInfo });
			});
	}
});

router.get('/products_by_id', (req, res) => {
	let type = req.query.type;
	let productIds = req.query.id;

	if (type === 'array') {
		// id =1231231231, 1231244231,2131231231 이거를
		// productId = ['1231231231', '1231244231', '2131231231'] 이런식으로 바꿔주기
		let ids = req.query.id.split(',');
		productIds = [];
		productIds = ids.map((item) => {
			return item;
		});
	}

	//productId를 이용해서 DB에서 productId와 같은 상품의 정보를 가져온다.
	Product.find({ _id: { $in: productIds } })
		.populate('writer')
		.exec((err, product) => {
			if (err) return res.status(400).send(err);
			return res.status(200).send(product);
		});
});

router.post('/removeProduct', (req, res) => {
	Product.findOneAndDelete({ _id: req.body.id }, (err) => {
		if (err) res.json({ success: false, err });
		res.status(200).json({ success: true });
	});
});

module.exports = router;
