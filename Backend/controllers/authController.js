// controllers/authController.js
const crypto = require('crypto');
const AfricasTalking = require('africastalking');
const { User } = require('../models');
const { generateJWT, verifyJWT } = require('../services/authService');
const { redisClient } = require('../services/cacheService');
const { validatePhone } = require('../utils/kenyanPhoneUtils');

const atClient = AfricasTalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME
}).SMS;

exports.signup = async (req, res, next) => {
  try {
    const { phone, name } = req.body;
    
    // Validate Kenyan phone format (+254...)
    if (!validatePhone(phone)) {
      return res.status(400).json({ error: 'Invalid Kenyan phone number format' });
    }

    // Check for existing user
    const exists = await User.findOne({ phone });
    if (exists) {
      return res.status(409).json({ error: 'Phone number already registered' });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = Date.now() + 600000; // 10 minutes expiry

    // Store OTP in Redis with phone as key
    await redisClient.setEx(`otp:${phone}`, 600, JSON.stringify({
      otp,
      attempts: 0,
      expiry: otpExpiry
    }));

    // Send SMS via Africa's Talking
    await atClient.send({
      to: phone,
      message: `Your RideApp verification code is ${otp}. Valid for 10 minutes.`
    });

    res.status(200).json({ 
      message: 'OTP sent successfully',
      verificationRequired: true
    });
  } catch (err) {
    next(err);
  }
};

exports.verifyOTP = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    
    const storedOTP = await redisClient.get(`otp:${phone}`);
    if (!storedOTP) {
      return res.status(400).json({ error: 'OTP expired or invalid' });
    }

    const { otp: correctOTP, attempts } = JSON.parse(storedOTP);
    
    if (attempts >= 3) {
      await redisClient.del(`otp:${phone}`);
      return res.status(429).json({ error: 'Too many attempts. Request new OTP.' });
    }

    if (otp !== correctOTP) {
      await redisClient.setEx(`otp:${phone}`, 600, JSON.stringify({
        ...JSON.parse(storedOTP),
        attempts: attempts + 1
      }));
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // OTP verified - create user
    const user = await User.create({ 
      phone,
      name: req.body.name,
      verified: true 
    });

    // Generate JWT
    const token = generateJWT(user);

    // Cleanup OTP
    await redisClient.del(`otp:${phone}`);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name
      }
    });
  } catch (err) {
    next(err);
  }
};

// ... (login, logout, refreshToken implementations)