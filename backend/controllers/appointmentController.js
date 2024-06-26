const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
  const { appointmentDate, time, doctorName, purpose } = req.body;
  const userId = req.user.id;

  try {
    const appointment = new Appointment({
      userId,
      appointmentDate,
      time,
      doctorName,
      purpose
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  const userId = req.user.id;

  try {
    const appointments = await Appointment.find({ userId });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('userId', 'firstName lastName age');
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
