"use strict";

var express = require('express');

var router = express.Router();

var multer = require('multer');

var _require = require('../models/Product'),
    Product = _require.Product; //=================================
//             Product
//=================================


var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/shop');
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "_").concat(file.originalname));
  }
});
var upload = multer({
  storage: storage
}).single('file');
router.post('/image', function (req, res) {
  // 가져온 이미지를 저장을 해주면 된다.
  upload(req, res, function (err) {
    if (err) {
      return req.json({
        success: false,
        err: err
      });
    }

    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename
    });
  });
});
var desstorage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/shop');
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "_").concat(file.originalname));
  }
});
var desupload = multer({
  storage: desstorage
}).single('file');
router.post('/desimage', function (req, res) {
  // 가져온 이미지를 저장을 해주면 된다.
  desupload(req, res, function (err) {
    if (err) {
      return req.json({
        success: false,
        err: err
      });
    }

    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename
    });
  });
});
router.post('/', function (req, res) {
  //받아온 정보들을 DB에 넣어준다.
  var product = new Product(req.body);
  product.save(function (err) {
    if (err) return res.status(400).json({
      success: false,
      err: err
    });
    return res.status(200).json({
      success: true
    });
  });
});
router.post('/products', function (req, res) {
  //product collection에 들어 있는 모든 상품 정보를 가져오기
  var limit = req.body.limit ? parseInt(req.body.limit) : 1000;
  var skip = req.body.skip ? parseInt(req.body.skip) : 0;
  var term = req.body.searchTerm;
  var findArgs = {};

  if (term) {
    Product.find(findArgs).find({
      $text: {
        $search: term
      }
    }).populate('wirter').skip(skip).limit(limit).exec(function (err, productInfo) {
      if (err) return res.status(400).json({
        success: false,
        err: err
      });
      return res.status(200).json({
        success: true,
        productInfo: productInfo,
        postSize: productInfo.length
      });
    });
  } else {
    Product.find(findArgs).populate('wirter').skip(skip).limit(limit).exec(function (err, productInfo) {
      if (err) return res.status(400).json({
        success: false,
        err: err
      });
      return res.status(200).json({
        success: true,
        productInfo: productInfo,
        postSize: productInfo.length
      });
    });
  }
});
router.post('/newproducts', function (req, res) {
  //product collection에 들어 있는 모든 상품 정보를 가져오기
  var limit = req.body.limit ? parseInt(req.body.limit) : 1000;
  var skip = req.body.skip ? parseInt(req.body.skip) : 0;
  Product.find({}).populate('wirter').skip(skip).limit(limit).sort({
    createdAt: -1
  }).exec(function (err, productInfo) {
    if (err) return res.status(400).json({
      success: false,
      err: err
    });
    return res.status(200).json({
      success: true,
      productInfo: productInfo,
      postSize: productInfo.length
    });
  });
});
router.post('/sellerProducts', function (req, res) {
  //product collection에 들어 있는 모든 상품 정보를 가져오기
  var term = req.body.searchTerm;
  var writer = req.body.writer;

  if (term) {
    Product.find({
      writer: writer
    }).find({
      $text: {
        $search: term
      }
    }).populate('wirter').exec(function (err, productInfo) {
      if (err) return res.status(400).json({
        success: false,
        err: err
      });
      return res.status(200).json({
        success: true,
        productInfo: productInfo,
        postSize: productInfo.length
      });
    });
  } else {
    Product.find({
      writer: writer
    }).populate('wirter').exec(function (err, productInfo) {
      if (err) return res.status(400).json({
        success: false,
        err: err
      });
      return res.status(200).json({
        success: true,
        productInfo: productInfo
      });
    });
  }
});
router.get('/products_by_id', function (req, res) {
  var type = req.query.type;
  var productIds = req.query.id;

  if (type === 'array') {
    // id =1231231231, 1231244231,2131231231 이거를
    // productId = ['1231231231', '1231244231', '2131231231'] 이런식으로 바꿔주기
    var ids = req.query.id.split(',');
    productIds = [];
    productIds = ids.map(function (item) {
      return item;
    });
  } //productId를 이용해서 DB에서 productId와 같은 상품의 정보를 가져온다.


  Product.find({
    _id: {
      $in: productIds
    }
  }).populate('writer').exec(function (err, product) {
    if (err) return res.status(400).send(err);
    return res.status(200).send(product);
  });
});
router.post('/removeProduct', function (req, res) {
  Product.findOneAndDelete({
    _id: req.body.id
  }, function (err) {
    if (err) res.json({
      success: false,
      err: err
    });
    res.status(200).json({
      success: true
    });
  });
});
module.exports = router;