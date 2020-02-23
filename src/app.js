const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('book-code:server');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');

const chalk = require('chalk');

require('./models/User');
require('./models/Post');

const app = express();
const port = process.env.PORT;

let isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
	app.use(errorhandler());
	mongoose.set('debug', true);

	global.chalk = chalk;
	global.log = console.log;
}

const mongoUrl = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.PW}@cluster0-9ptgq.mongodb.net/mean-posts-app?retryWrites=true&w=majority`;

mongoose
	.connect(mongoUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('Connected to database');
	})
	.catch(() => {
		console.log('Connection failed');
	});

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use('/images', express.static(path.join('images')));
app.use(morgan('dev'));
app.use(cors());

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

app.use('/api/posts', postsRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
	console.log('Server is running on port:', port);
});
