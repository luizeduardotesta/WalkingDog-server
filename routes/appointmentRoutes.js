const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

router.post('/schedule/create', isAuthenticated, appointmentController.createAppointment);
router.get('/appointments/show', appointmentController.showAppointment);
router.get('/appointments/:id', appointmentController.showSingleAppointment);
router.delete('/delete/appointments/:id', isAuthenticated, appointmentController.deleteAppointment);
router.put('/update/appointments/:id', isAuthenticated, appointmentController.updateAppointment);

module.exports = router;
