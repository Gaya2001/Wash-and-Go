const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Route to get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({}, 'service_ID name price estimated_time');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
});

// Route to get a service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id, 'service_ID name price estimated_time');
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error });
  }
});

module.exports = router;
