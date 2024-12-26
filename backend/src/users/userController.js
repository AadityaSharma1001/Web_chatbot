import User from './userModel.js';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const googleLogin = async (req, res) => {
  const client = new OAuth2Client(CLIENT_ID);

  try {
      const token = req.headers.authorization?.split(' ')[1];

      // Add debug logging for token
      console.log('Received token:', token);
      
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,
      });

      const payload = ticket.getPayload();
      console.log('User verified:', payload);

      const email = payload.email;
      const name = payload.name;
      
      // Add validation for email and name
      if (!email || !name) {
          throw new Error('Email and name are required from Google payload');
      }

      let user = await User.findOne({ email });

      if (!user) {
          try {
              user = await User.create({
                  email: email,
                  displayName: name,
                  created_at: new Date(),
                  updated_at: new Date()
              });
          } catch (createError) {
              console.error("Error creating user:", createError);
              throw createError;
          }
          console.log("User created successfully:", user);
      }

      const jwtToken = jwt.sign(
          { id: user._id }, 
          process.env.JWT_SECRET, 
          { algorithm: 'HS256', expiresIn: '1d' }
      );

      return res.status(200).json({
          success: true,
          jwtToken,
          user
      });
  } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
          success: false,
          message: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
  }
}


export { getUsers, createUser, googleLogin };