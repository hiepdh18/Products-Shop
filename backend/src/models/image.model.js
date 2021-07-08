const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
    },
    path: {
        type: String,
    }
});

var Image = mongoose.model('Image', imageSchema, 'images')

module.exports = Image