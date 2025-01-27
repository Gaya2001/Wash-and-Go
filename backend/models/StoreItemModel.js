const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Image Schema
const ImageSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    preview: {
        type: String,
        required: false,
    }
});

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    model_number: {
        type: String,
        required: true,
    },
    length: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    images: [ImageSchema],
    
},{timestamps:true});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
