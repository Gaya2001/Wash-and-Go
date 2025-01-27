const mongoose = require("mongoose");
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

// Package Schema
const PackageSchema = new Schema({
    PackageID: {
        type: String,
        unique: true,
    },
    PackageName: {
        type: String,
        required: true,
    },
    Description1: {
        type: String,
        required: true,
    },
    Description2: {
        type: String,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    EstimatedTime: {
        type: Number,
        required: true,
    },
    Statues: {
        type: String,
        required: true,
    },
    images: [ImageSchema], // Array of image objects
    services: [{
        type: Schema.Types.ObjectId,  // Reference to Service IDs
        ref: 'Service',
        required: true
    }]
});

module.exports = mongoose.model("Package", PackageSchema);
