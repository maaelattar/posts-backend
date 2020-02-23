const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: 'posts-app',
	allowedFormats: ['jpg', 'png'],
	filename: function(req, file, cb) {
		cb(undefined, file.originalname);
	}
});

var parser = multer({ storage: storage }).single('image');

module.exports = parser;
