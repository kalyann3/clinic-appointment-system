const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;
