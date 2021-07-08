const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    name: { type: String, unique: true },
    type: { type: Schema.Types.ObjectId, ref: 'Type' },
    slug: { type: String, }
});

var Category = mongoose.model('Catrgory', categorySchema, 'categories')

module.exports = Category