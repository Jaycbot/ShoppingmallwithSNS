const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middleware/auth');
const { User } = require('../models/User');
const { Product } = require('../models/Product');

const { Payment } = require('../models/Payment');

const async = require('async');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/user');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname + '-' + Date.now());
	},
});

const upload = multer({ storage: storage });

router.post('/register', (req, res) => {
	//회원가입 할 때 필요한 정보들을 client에서 가져오면
	// 그것들을 데이터베이스에 넣어준다.
	const user = new User(req.body);
	user.save((err, userInfo) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({ success: true });
	});
});

router.post('/login', (req, res) => {
	if (req.body.profile) {
		User.findOne({ email: req.body.profile.id }, (err, user) => {
			if (err) return res.json({ success: false, err });
			if (user) {
				user.generateToken((err, user) => {
					if (err) return res.status(400).send(err);

					res
						.cookie('x_auth', user.token)
						.status(200)
						.json({ loginSuccess: true, userId: user._id });
				});
			} else {
				const user = new User({ email: req.body.profile.id });
				user.save((err, userInfo) => {
					if (err) return res.json({ success: false, err });
					user.generateToken((err, user) => {
						if (err) return res.status(400).send(err);

						res
							.cookie('x_auth', user.token)
							.status(200)
							.json({ loginSuccess: true, userId: user._id });
					});
				});
			}
		});
	} else {
		User.findOne({ email: req.body.email }, (err, user) => {
			if (!user) {
				return res.json({
					loginSuccess: false,
					message: '제공된 이메일에 해당되는 유저가 없습니다.',
				});
			}

			user.comparePassword(req.body.password, (err, isMatch) => {
				if (!isMatch)
					return res.json({
						loginSuccess: false,
						message: '비밀번호가 틀렸습니다.',
					});

				user.generateToken((err, user) => {
					if (err) return res.status(400).send(err);

					res
						.cookie('x_auth', user.token)
						.status(200)
						.json({ loginSuccess: true, userId: user._id });
				});
			});
		});
	}
}); 

router.get('/auth', auth, (req, res) => {
	res.status(200).json({
		_id: req.user._id,
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		image: req.user.image,
		cart: req.user.cart,
		history: req.user.history,
		//uploadProduct: req.user.uploadProduct,
	});
});

router.get('/logout', auth, (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).send({ success: true });
	});
});

router.post('/addToCart', auth, (req, res) => {
	// 먼저 User Collection에 해당 유저의 정보를 가져오기
	User.findOne({ _id: req.user._id }, (err, userInfo) => {
		// 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어있는지 확인
		let duplicate = false;
		userInfo.cart.forEach((item) => {
			if (item.id === req.body.productId) {
				duplicate = true;
			}
		});

		// 상품이 이미 있을때
		if (duplicate) {
			User.findOneAndUpdate(
				{ '_id': req.user._id, 'cart.id': req.body.productId },
				{ $inc: { 'cart.$.quantity': 1 } },
				{ new: true },
				(err, userInfo) => {
					if (err) return res.status(400).json({ success: false, err });
					res.status(200).send(userInfo.cart);
				}
			);
		}
		// 상품이 이미 있지 않을때
		else {
			User.findOneAndUpdate(
				{ _id: req.user._id },
				{
					$push: {
						cart: {
							id: req.body.productId,
							quantity: 1,
							date: Date.now(),
						},
					},
				},
				{ new: true },
				(err, userInfo) => {
					if (err) return res.status(400).json({ success: false, err });
					userInfo.cart.forEach((item) => {
						if (item.id == req.query.productId) {
							duplicate = true;
						}
					});
					res.status(200).send(userInfo.cart);
				}
			);
		}
	});
});

router.get('/removeFromCart', auth, (req, res) => {
	//먼저 cart안에 내가 지우려고 한 상품을 지워주기
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{
			$pull: { cart: { id: req.query._id } },
		},
		{ new: true },
		(err, userInfo) => {
			let cart = userInfo.cart;
			let array = cart.map((item) => {
				return item.id;
			});

			//product collection에서 현재 남아있는 상품들의 정보를 가져오기

			Product.find({ _id: { $in: array } })
				.populate('writer')
				.exec((err, productInfo) => {
					return res.status(200).json({
						productInfo,
						cart,
					});
				});
		}
	);
});

router.post('/successBuy', auth, (req, res) => {
	//1. User Collection 안에 History필드안에 간단한 결제 정보 넣어주기
	let history = [];
	let transactionData = {};

	req.body.cartDetail.forEach((item) => {
		history.push({
			dateOfPurchase: Date.now(),
			name: item.title,
			id: item._id,
			price: item.price,
			quantity: item.quantity,
			paymentId: req.body.paymentData.paymentID,
		});
	});

	//2. Payment Collection 안에 자세한 결제 정보들 넣어주기
	transactionData.user = {
		id: req.user._id,
		name: req.user.name,
		email: req.user.email,
	};
	transactionData.data = req.body.paymentData;
	transactionData.product = history;

	// history 정보 저장
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $push: { history: history }, $set: { cart: [] } },
		{ new: true },
		(err, user) => {
			if (err) return res.json({ success: false, err });

			// payment에다가 transactionData정보 저장
			const payment = new Payment(transactionData);
			payment.save((err, doc) => {
				if (err) return res.json({ success: false, err });

				//3. Product Collection 안에 있는 sold 필드 정보 업데이트 시켜주기

				//상품당 몇개의 quantity를 샀는지
				let products = [];
				doc.product.forEach((item) => {
					products.push({ id: item.id, quantity: item.quantity });
				});

				async.eachSeries(
					products,
					(item, callback) => {
						Product.update(
							{ _id: item.id },
							{
								$inc: {
									sold: item.quantity,
								},
							},
							{ new: false },
							callback
						);
					},
					(err) => {
						if (err) return res.json({ success: false, err });
						res.status(200).json({
							success: true,
							cart: user.cart,
							cartDetail: [],
						});
					}
				);

				//first We need to know how many product were sold in this transaction for
				// each of products
			});
		}
	);
}); 

router.post('/admin', (req, res) => {
	let uterm = req.body.userSearchTerm;
	
	if (uterm) {
		User.find({})
			.find({ $text: { $search: uterm }}) 
			.exec((err, users) => {
				if (err) return res.status(400).send("User 전체 조회 실패.");
				res.status(200).json({ success : true, users});
			})
	} else {
		User.find({}) 
		.exec((err, users) => {
			if (err) return res.status(400).send("User 전체 조회 실패.");
			res.status(200).json({ success : true, users});
		})
	}
});  


router.post('/payment', (req, res) => {

		Payment.find({})
			.sort({ createdAt : -1 })
			.exec((err, pays) => {
				if (err) return res.status(400).send("Payment 전체 조회 실패.");
				res.status(200).json({ success : true, pays});
			})

});  

router.post('/uploadImages', upload.single('files'), (req, res) => {
	res.status(200).json({ success: true, filePath: req.file.path });
});

router.post('/update', (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.body.id },
		{ email: req.body.email, name: req.body.name, image: req.body.image },
		(err, user) => {
			if (err) return res.json({ success: false, err });
			return res.status(200).json({ success: true, user });
		}
	);
});

router.post('/updatePassword', (req, res) => {
	User.findOne({ _id: req.body.id }, (err, user) => {
		if (err) return res.json({ success: false, err });
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) {
				return res.json({
					loginSuccess: false,
					message: '비밀번호를 잘못 입력했습니다.',
				});
			}

			User.updateOne(
				{ _id: user._id },
				{
					$set: {
						password: req.body.newPassword,
					},
				}, 
				(err, user) => {
					if (err) return res.json({ success: false, err });
					res.status(200).json({ success: true, user });
				}
			); 
		});
	});
});

router.post('/withdraw', (req, res) => {
	User.findOneAndDelete({ _id: req.body.id }, (err) => {
		if (err) res.json({ success: false, err });
		res.status(200).json({ success: true });
	});
});

router.post("/roleAdmin",(req, res) => {
	User.findOneAndUpdate(
		{$or : [
			{ role: 0, _id: req.body._id },
			{ role: 1, _id: req.body._id },
		]},  
	  { $set: { role: 1 } },
	  { new: true }
	).exec((err, doc) => {
	  if (err) return res.status(400).json({ success: false, err });
	  return res.status(200).json({ success: true, doc });
	});
  });


  
  router.post("/roleUser",(req, res) => {
	User.findOneAndUpdate(
	  {$or : [
		  { role: 2, _id: req.body._id },
		  { role: 1, _id: req.body._id },
	  ]},
	  { $set: { role: 0 } },
	  { new: true }
	).exec((err, doc) => {
	  if (err) return res.status(400).json({ success: false, err });
	  return res.status(200).json({ success: true, doc });
	});
  });

  router.post("/roleSeller",(req, res) => {
	User.findOneAndUpdate(
		{$or : [
			{ role: 0, _id: req.body._id },
			{ role: 1, _id: req.body._id },
  
		]},
	  { $set: { role: 2 } },
	  { new: true }
	).exec((err, doc) => {
	  if (err) return res.status(400).json({ success: false, err });
	  return res.status(200).json({ success: true, doc });
	});
  });





module.exports = router;
