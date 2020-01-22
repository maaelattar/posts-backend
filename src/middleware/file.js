const multer = require('multer')

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let isValid = MIME_TYPE_MAP[file.mimetype]
        let error = new Error("Invalid mime type")
        if (isValid) {
            error = null
        }
        callback(error, '/images')
    },
    filename: (req, file, callback) => {
        let name = file.originalname.toLowerCase().split(' ').join('-')
        let ext = MIME_TYPE_MAP[file.mimetype]
        callback(null, name + '-' + Date.now() + '.' + ext)
    }
})

module.exports = multer({
    storage: storage
}).single('image')