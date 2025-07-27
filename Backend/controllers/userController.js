// controllers/userController.js
const { User } = require('../models');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password -__v -createdAt -updatedAt');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return minimal profile data
    const profile = {
      id: user._id,
      phone: user.phone,
      name: user.name,
      rating: user.rating
    };

    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    // Only allow certain fields to be updated
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password -__v');

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};