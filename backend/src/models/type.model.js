const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        unique: true
    }, 
    slug: {
        type: String,
    }
});

var Type = mongoose.model('Type', typeSchema, 'types')

module.exports = Type