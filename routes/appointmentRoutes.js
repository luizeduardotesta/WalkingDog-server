const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

router.post('/schedule/create', isAuthenticated, appointmentController.createAppointment);
router.post('/admin/schedule/create', isAuthenticated, isAdmin, appointmentController.createAppointment);
router.get('/appointments/show', appointmentController.showAppointment);
router.get('/admin/appointments/show', isAdmin, appointmentController.showAppointment);
router.get('/appointments/:id', appointmentController.showSingleAppointment);
router.get('/admin/appointments/:id', isAdmin, appointmentController.showSingleAppointment);
router.delete('/delete/appointments/:id', isAuthenticated, appointmentController.deleteAppointment);
router.delete('/admin/delete/appointments/:id', isAuthenticated, isAdmin, appointmentController.deleteAppointment);
router.put('/update/appointments/:id', isAuthenticated, appointmentController.updateAppointment);
router.put('/admin/update/appointments/:id', isAuthenticated, isAdmin, appointmentController.updateAppointment);


module.exports = router;
