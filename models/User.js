const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema = mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		required: [true, "can't be blank"],
		match: [/\S+@\S+\.\S+/, 'is invalid'],
		unique: true,
		index: true
	},
	password: { type: String, required: [true, "can't be blank"] }
});

UserSchema.plugin(uniqueValidator, { message: 'Is already taken.' });

UserSchema.methods.setPassword = function(password) {
	this.password = bcrypt.hashSync(password, 10);
};

UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function() {
	return jwt.sign(
		{
			userId: this._id,
			email: this.email
		},
		process.env.SECRET,
		{
			expiresIn: 7 * 24 * 60 * 60
		}
	);
};
UserSchema.methods.toJSON = function() {
	return {
		userId: this._id,
		email: this.email,
		token: this.generateJWT()
	};
};

mongoose.model('User', UserSchema);
