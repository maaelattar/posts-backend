const app = require('./app');

let isProduction = process.env.NODE_ENV === 'production';

const port = process.env.PORT;

app.listen(port, () => {
	console.log('Server is running on port:', port);
});
