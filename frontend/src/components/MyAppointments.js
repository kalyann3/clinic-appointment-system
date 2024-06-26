import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('/api/appointments', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>My Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>Appointment Date</th>
            <th>Time</th>
            <th>Doctor Name</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
              <td>{appointment.time}</td>
              <td>{appointment.doctorName}</td>
              <td>{appointment.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyAppointments;
