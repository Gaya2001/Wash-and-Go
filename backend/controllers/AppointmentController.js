const Appointment = require("../models/Appointment");

// Create a new appointment
exports.createAppointment = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log the incoming request body

        const appointment = new Appointment({
            ...req.body,
            status: 'Pending' // Default status set to 'Pending'
        });

        await appointment.save();
        res.status(201).json(appointment); // Respond with the created appointment
    } catch (error) {
        console.error("Error creating appointment:", error.message); // Log the error for debugging
        res.status(400).json({ error: 'Failed to create appointment', details: error.message }); // Send a detailed error message
    }
};


exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments); // Respond with the list of appointments
    } catch (error) {
        console.error("Error retrieving appointments:", error.message); // Log the error
        res.status(500).json({ error: 'Failed to retrieve appointments', details: error.message });
    }
};

exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        console.error("Error retrieving appointment:", error.message);
        res.status(500).json({ error: 'Failed to retrieve appointment', details: error.message });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        console.error("Error updating appointment:", error.message);
        res.status(400).json({ error: 'Failed to update appointment', details: error.message });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully', appointment });
    } catch (error) {
        console.error("Error deleting appointment:", error.message);
        res.status(500).json({ error: 'Failed to delete appointment', details: error.message });
    }
};

exports.acceptAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByIdAndUpdate(id, { status: 'Accepted' }, { new: true });
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        console.error("Error accepting appointment:", error.message);
        res.status(500).json({ error: 'Failed to accept the appointment', details: error.message });
    }
};

exports.cancelAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByIdAndUpdate(id, { status: 'Cancelled' }, { new: true });
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        console.error("Error canceling appointment:", error.message);
        res.status(500).json({ error: 'Failed to cancel the appointment', details: error.message });
    }
};
