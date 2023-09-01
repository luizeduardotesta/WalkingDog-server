const Appointment = require('../models/appointmentModel');
const ErrorResponse = require('../utils/errorResponse');
const moment = require('moment');

exports.createAppointment = async (req, res, next) => {
    const { nome, date } = req.body;
    if (!nome || !date) {
        return res.status(400).json({ error: 'Nome and date are required.' });
    }

    const formattedDate = moment(date).toDate();

    try {
        const newAppointment = new Appointment({
            nome,
            date: formattedDate,
        });

        await newAppointment.save();
        return res.status(201).json({
            success: true,
            appointment: newAppointment
        });
    } catch (error) {
        console.log(error);
        next()
    };
}

exports.showAppointment = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        return res.json(appointments);
    } catch (error) {
        console.log(error);
        next()
    };
}

exports.showSingleAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }
        return res.json(appointment);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.deleteAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }

        await appointment.deleteOne();

        return res.json({ success: true, message: 'Appointment deleted successfully.' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.updateAppointment = async (req, res, next) => {
    try {
        const { nome, date } = req.body;
        const appointmentId = req.params.id;

        // Find the current appointment by ID
        const currentAppointment = await Appointment.findById(appointmentId);
        if (!currentAppointment) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }

        // Update the appointment with the new data
        currentAppointment.nome = nome || currentAppointment.nome;
        currentAppointment.date = date || currentAppointment.date;

        // Save the updated appointment
        const updatedAppointment = await currentAppointment.save();

        return res.json({ success: true, appointment: updatedAppointment, message: 'Appointment updated successfully.' });
    } catch (error) {
        console.log(error);
        next(error);
    }
}; exports.updateAppointment = async (req, res, next) => {
    try {
        const { nome, date } = req.body;

        // Find the current appointment by ID
        const currentAppointment = await Appointment.findById(req.params.id);
        if (!currentAppointment) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }

        currentAppointment.nome = nome || currentAppointment.nome;
        currentAppointment.date = date || currentAppointment.date;

        const updatedAppointment = await currentAppointment.save();

        return res.json({
            success: true,
            appointment: updatedAppointment,
            message: 'Appointment updated successfully.'
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

