const express = require('express');
const AppointmentController = require('../controllers/AppointmentController');
const router = express.Router();

// Appointment Routes
router.post('/appointments', AppointmentController.createAppointment);   // Create
router.get('/appointments', AppointmentController.getAppointments);  // Get all appointments
router.get('/appointments/:id', AppointmentController.getAppointmentById); // Get by ID
router.put('/appointments/:id', AppointmentController.updateAppointment); // Update
router.delete('/appointments/:id', AppointmentController.deleteAppointment); // Delete
router.put('/appointments/:id/accept', AppointmentController.acceptAppointment); // Accept
router.put('/appointments/:id/cancel', AppointmentController.cancelAppointment); // Cancel

module.exports = router;
