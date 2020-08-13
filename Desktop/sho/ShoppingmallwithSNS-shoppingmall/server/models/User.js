const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//saltRounds 는 salt가 몇글자인지 나타낸다.
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    //관리자 혹은 일반 유저
    type: Number,
    default: 0,
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
      type: Array,
      default: []
  },
  image: String,
  token: {
    //token 나중에 유효성 관리.
    type: String,
  },
  tokenExp: {
    //token의 expiration date
    type: Number,
  }
});

userSchema.index({
    name: 'text',
    email : 'text'
},{
    weights: {
        name : 5,
        email : 1
    }
})

//Schema를 Model로 감싸줌
//user스키마를 저장하기 이전에 함수를 실행하는 것 -비밀번호 암호화를 하는데 사용.- 몽구스 내장함수
userSchema.pre('save', function (next) {
	let user = this; //arrow function 대신 function을 사용한 이유
	//password 변경시에만 실행 -다른 정보 수정할 때는 비밀번호를 암호화 하지 않음.
	if (user.isModified('password')) {
		bcrypt.genSalt(saltRounds, function (err, salt) {
			if (err) return next(err);
			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) return next(err);
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});
userSchema.pre('updateOne', function (next) {
	let user = this; //arrow function 대신 function을 사용한 이유
	//password 변경시에만 실행 -다른 정보 수정할 때는 비밀번호를 암호화 하지 않음.

	if (user._update.$set.password) {
		bcrypt.genSalt(saltRounds, function (err, salt) {
			if (err) return next(err);
			bcrypt.hash(user._update.$set.password, salt, function (err, hash) {
				if (err) return next(err);
				user._update.$set.password = hash;
				next();
			});
		});
	}
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
	bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
		if (err) return callback(err);
		else callback(null, isMatch);
	});
};

userSchema.methods.generateToken = function (callback) {
	var user = this;
	//jsonwebtoken을 이용해서 token을 생성하기
	var token = jwt.sign(user._id.toHexString(), 'secretToken');
	user.token = token;
	user.save(function (err, user) {
		if (err) return callback(err);
		callback(null, user);
	});
};

userSchema.statics.findByToken = function (token, callback) {
	var user = this;
	//토큰을 decode 한다.
	jwt.verify(token, 'secretToken', function (err, decoded) {
		//유저 아이디를 이용해서 유저를 찾은 다음에
		// 클라이언트에서 가져온 token과 DB에 보간된 토큰이 일치하는지 확인
		user.findOne({ _id: decoded, token: token }, function (err, user) {
			if (err) return callback(err);
			callback(null, user);
		});
	});
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
