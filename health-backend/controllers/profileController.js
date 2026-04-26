const Profile = require('../models/Profile');

// POST /api/profile 

const saveProfile = async (req, res) => {
  const {
    fullName, age, gender, profession,
    phoneNo, address, city, state,
    bloodGroup, emergencyContact
  } = req.body;

  try {
    const profileData = {
      user: req.user.id,
      fullName, age, gender, profession,
      phoneNo, address, city, state,
      bloodGroup, emergencyContact
    };

    if (req.file) {
      profileData.photograph = req.file.path;
    }

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      profileData,
      { new: true, upsert: true }
    );

    res.json({ message: 'Profile saved!', profile });

  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

// GET /api/profile 
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'NO PROFILE FOUND!!! ...' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

module.exports = { saveProfile, getProfile };