const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: Schema.Types.ObjectId,
    code: { type: String, unique: true },
    name: { type: String },
    category: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Category'
    },
    price: {
        type: Number,
        require: true,
        default: 0
    },
    description: { type: String, default: '' },
    thumbnail: { type: String, require : true },
    slide: {
        type: [{ type: String, require: true }]
    },
    createdBy: {
        type: mongoose.ObjectId,
        ref: 'User',
        default: null
    },
    updatedBy: {
        type: mongoose.ObjectId,
        ref: 'User',
        default: null
    },
    slug: { type: String }
});

var Product = mongoose.model('Product', productSchema, 'products')

module.exports = Product
