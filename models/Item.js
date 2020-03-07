const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Scheme component that takes in the fields that we want
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);