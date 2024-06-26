import axios from 'axios';

const API_URL = 'http://localhost:5000/api/appointments';

export const bookAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(`${API_URL}/book`, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error during booking appointment:', error);
    throw error;
  }
};

export const getAppointments = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};
