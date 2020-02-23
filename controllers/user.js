const mongoose = require('mongoose');
const User = mongoose.model('User');

const createUser = (req, res, next) => {
	if (!req.body.user.email) {
		return res.status(422).json({ errors: { email: "can't be blank" } });
	}
	if (!req.body.user.password) {
		return res.status(422).json({ errors: { password: "can't be blank" } });
	}
	let user = new User();
	user.email = req.body.user.email;
	user.setPassword(req.body.user.password);
	user
		.save()
		.then(user => {
			res.status(201).json({
				user: user.toJSON()
			});
		})
		.catch(next);
};
const getUser = (req, res, next) => {
	User.findById(req.userData.userId)
		.then(user => {
			if (!user) {
				return res.sendStatus(401);
			} else {
				return res.status(200).json({ user: user.toJSON() });
			}
		})
		.catch(next);
};
const userLogin = (req, res, next) => {
	if (!req.body.user.email) {
		return res.status(422).json({ errors: { email: "can't be blank" } });
	}

	if (!req.body.user.password) {
		return res.status(422).json({ errors: { password: "can't be blank" } });
	}
	User.findOne({
		email: req.body.user.email
	})
		.then(user => {
			if (!user || !user.validatePassword(req.body.user.password)) {
				return res.status(401).json({
					errors: { 'email or password': 'is invalid' }
				});
			} else {
				user.token = user.generateJWT();
				return res.status(200).json({ user: user.toJSON() });
			}
		})
		.catch(next);
};

module.exports = {
	getUser,
	createUser,
	userLogin
};
