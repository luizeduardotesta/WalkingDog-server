const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { estaAutenticado, isAdmin } = require('../middleware/auth');

router.post('/schedule/create', estaAutenticado, appointmentController.createAppointment);
router.get('/appointments/show', appointmentController.showAppointment);
router.get('/appointments/:id', appointmentController.showSingleAppointment);
router.delete('/delete/appointments/:id', estaAutenticado, appointmentController.deleteAppointment);
router.put('/update/appointments/:id', estaAutenticado, appointmentController.updateAppointment);

module.exports = router;
