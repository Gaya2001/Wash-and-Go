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

const appointmentSchema = new mongoose.Schema({
    // Personal Details
    name: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    
    email: {
        type: String,
        required: false,
        unique: true,
        index: true, // Ensure an index is created
        
    },
    address: {
        type: String,
        required: false,
    },
    
    // Vehicle Details
    vehicleModel: {
        type: String,
        required: false,
    },
    vehicleMake: {
        type: String,
        required: false,
    },
    
    vehicleYear: {
        type: Number,
        required: false,
        max: new Date().getFullYear() + 1 // Prevent future years
    
    },
    licensePlate: {
        type: String,
        required: false,
    },
    
    preferredAppointmentDate: {
        type: Date,
        required: false,
        default: Date.now, // Default to current date
    },
    selectedTimeSlot: {
        type: String,
        required: false
    },
    servicePackage: {
        type: String,
        required: false,
        maxlength: 100
    },
    additionalRequests: {
        type: String,
        required: false,
        maxlength: 500 // Example max length, adjust as necessary
    
    },
    // Payment Details
    selectedOption: {
        type: String,
        enum: ['Payment after service', 'Bank Transfer'],
        required: false
    },
    
    images: [ImageSchema], // Array of image objects
    
    // Status field to track appointment status
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Completed', 'Cancelled'], // Define possible statuses
        default: 'Pending' // Default to 'Pending'
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
