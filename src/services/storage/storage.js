const multer = require('multer')
const diskStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = file.originalname.split('.')[1]
        cb(null, `${file.originalname}-${uniqueSuffix}.${extension}`)
    },
})
module.exports = multer({ storage: diskStorage })