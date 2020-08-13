const express = require('express');
const app = express();

const port = 5000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./server/config/key');

//www url을 분석해서 가져올 수 있게 해주는 것
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');

mongoose
	.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('MongoDB connected');
	})
	.catch((err) => console.log(err));
require('./server/services/cache');

app.use('/api/sns', require('./server/routes/sns'));
app.use('/api/users', require('./server/routes/user'));
app.use('/api/product', require('./server/routes/product'));


app.use('/api/like', require('./server/routes/like'));



app.use('/uploads', express.static('uploads'));

app.listen(port, () => console.log(`Example app Listening on port ${port}`));
