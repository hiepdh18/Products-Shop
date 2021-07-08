const multer = require('multer')
const util = require('util')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './storage')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

exports.uploadOne = util.promisify(upload.single('file'))
exports.uploadMultiple = util.promisify(upload.array('file', 5))
exports.uploadFields = util.promisify(upload.fields([{ name: 'file', maxCount: 1 }, { name: 'files', maxCount: 5 }]))