const Appointment = require('../models/appointmentModel');
const ErrorResponse = require('../utils/errorResponse');
const moment = require('moment');

exports.createAppointment = async (req, res, next) => {
    const { date } = req.body;
    if (!date) {
        return res.status(400).json({ error: 'Date is required.' });
    }

    const formattedDate = moment(date).toDate();

    try {
        const newAppointment = new Appointment({
            date: formattedDate,
            userId: req.user.id
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
        const { date } = req.body;
        const appointmentId = req.params.id;

        const currentAppointment = await Appointment.findById(appointmentId);
        if (!currentAppointment) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }

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

