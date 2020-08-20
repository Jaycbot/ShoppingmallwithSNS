const express = require('express');
const app = express();

const port = 5000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config/key');

app.use(cors());
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
require('./services/cache');

app.use('/sns', require('./routes/sns'));
app.use('/users', require('./routes/user'));
app.use('/product', require('./routes/product'));

app.use('/like', require('./routes/like'));

app.use('/uploads', express.static('uploads'));

app.listen(port, () => console.log(`Example app Listening on port ${port}`));
