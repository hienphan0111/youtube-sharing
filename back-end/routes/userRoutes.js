import express from 'express';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const userRoutes = express.Router();

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: '10d'
  })
}

// Register a new user

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('We have already an account with that email address');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, user.email)
    })
  }
  else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Login a user

const loginUser = asyncHandler(async(req, res) => {
  const { email, password} = req.body;
  const user = await User.findOne({email});

  if( user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(401)
    throw new Error('Invalid User or Password');
  }
});

// get user profile

const getUserProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id);

  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

userRoutes.route('/register').post(registerUser);
userRoutes.route('/login').post(loginUser);
userRoutes.route('/:id').get(getUserProfile);

export default userRoutes;
