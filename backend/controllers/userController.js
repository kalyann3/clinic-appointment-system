// backend/controllers/userController.js

const asyncHandler = require('express-async-handler');
const User = require('/models/User');
const generateToken = require('../utils/generateToken');
const sendSignupEmail = require('../config/emailConfig');

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, gender, dateOfBirth, age, address, contactNumber, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    firstName,
    lastName,
    gender,
    dateOfBirth,
    age,
    address,
    contactNumber,
    email,
    password,
  });

  if (user) {
    sendSignupEmail(email, password); // Send signup email
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      age: user.age,
      address: user.address,
      contactNumber: user.contactNumber,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

module.exports = { registerUser };
