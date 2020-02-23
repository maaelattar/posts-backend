const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
	title: {
		required: [true, "can't be blank"],
		type: String
	},
	content: {
		required: [true, "can't be blank"],
		type: String
	},
	imagePath: {
		required: [true, "can't be blank"],
		type: String
	},
	creator: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

PostSchema.method.toJSON = function() {
	return {
		title: this.title,
		content: this.content,
		imagePath: this.imagePath,
		creator: this.creator
	};
};
mongoose.model('Post', PostSchema);
