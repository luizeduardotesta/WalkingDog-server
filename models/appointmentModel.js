const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Import the Schema class

const appointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;



