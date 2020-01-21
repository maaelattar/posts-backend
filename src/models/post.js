const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    },
    imagePath: {
        required: true,
        type: String
    },
    creator: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Post", postSchema)