const mongoose = require('mongoose');
const Post = mongoose.model('Post');

const populatePost = (req, res, next, id) => {
	Post.findOne({ _id: id })
		.then(post => {
			if (!post) {
				return res.sendStatus(404);
			}
			req.post = post;
			return next();
		})
		.catch(next);
};
const createPost = (req, res, next) => {
	const post = new Post({
		title: req.body.title,
		content: req.body.content,
		imagePath: req.file.url
	});
	post.creator = req.userData.userId;
	post
		.save()
		.then(createdPost => {
			res.status(201).json({
				post: createdPost.toJSON()
			});
		})
		.catch(next);
};

const updatePost = (req, res, next) => {
	if (req.userData.userId.toString() === req.post.creator._id.toString()) {
		const post = req.post;
		post.title = req.body.title;
		post.content = req.body.content;
		if (req.file) {
			post.imagePath = req.file.url;
		} else {
			post.imagePath = req.body.imagePath;
		}
		Post.updateOne(
			{
				_id: req.params.id,
				creator: req.userData.userId
			},
			post
		)
			.then(result => {
				if (result.n > 0) {
					res.status(200).json({ message: 'Post updated successfully' });
				} else {
					res.status(400).json({ message: 'Not authorized' });
				}
			})
			.catch(next);
	} else {
		return res.sendStatus(403);
	}
};

const getPosts = (req, res, next) => {
	const postsPerPage = +req.query.postsPerPage;
	const currentPage = +req.query.currentPage;

	const postQuery = Post.find();
	let fetchedPosts;

	if (postsPerPage && currentPage) {
		postQuery.skip(postsPerPage * (currentPage - 1)).limit(postsPerPage);
	}
	postQuery
		.then(documents => {
			fetchedPosts = documents.map(post => {
				return post.toJSON();
			});
			return Post.countDocuments();
		})
		.then(count => {
			res.status(200).json({
				posts: fetchedPosts,
				postsCount: count
			});
		})
		.catch(next);
};

const getPost = (req, res, next) => {
	Post.findById(req.params.id)
		.then(post => {
			if (post) {
				res.status(200).json(post.toJSON());
			} else {
				res.status(404).json({
					message: 'Post not found'
				});
			}
		})
		.catch(next);
};

const deletePost = (req, res, next) => {
	if (req.userData.userId.toString() === req.post.creator._id.toString()) {
		Post.deleteOne({
			_id: req.params.id,
			creator: req.userData.userId
		})
			.then(result => {
				return res.sendStatus(204);
			})
			.catch(next);
	} else {
		return res.sendStatus(403);
	}
};

module.exports = {
	populatePost,
	createPost,
	updatePost,
	getPost,
	getPosts,
	deletePost
};
