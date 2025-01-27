const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  service_ID: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  estimated_time: { 
    type: Number, 
    required: true 
  }
});

module.exports = mongoose.model('Service', ServiceSchema);
