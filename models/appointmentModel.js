const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
