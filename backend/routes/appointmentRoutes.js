const express = require('express');
const { bookAppointment, getAppointments, getAllAppointments } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/book', protect, bookAppointment);
router.get('/', protect, getAppointments);
router.get('/all', getAllAppointments);

module.exports = router;
