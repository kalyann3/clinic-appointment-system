// backend/config/emailConfig.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use the email service you prefer
  auth: {
    user: process.env.skalyann, // Your email username
    pass: process.env.Kalyan2002, // Your email password
  },
});

const sendSignupEmail = (email, password) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Clinic Appointment System',
    text: `Thank you for signing up! Your username is ${email} and your default password is ${password}. Please change your password after your first login.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendSignupEmail;
