const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user:             { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  fullName:         { type: String, required: true },
  age:              { type: Number },
  gender:           { type: String, enum: ['Male', 'Female', 'Other'] },
  profession:       { type: String },
  phoneNo:          { type: String },
  address:          { type: String },
  city:             { type: String },
  state:            { type: String },
  bloodGroup:       { type: String },
  emergencyContact: { type: String },
  photograph:       { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);