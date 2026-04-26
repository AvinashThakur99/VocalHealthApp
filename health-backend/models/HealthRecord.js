const mongoose = require('mongoose');

const HealthRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  condition: {
    type: String,
    enum: ['Asthma', 'BP', 'Diabetes', 'Cardiac', 'Normal', 'Other'],
    required: true
  },

  symptoms: [{ type: String }],

  voiceData: {
    pitch:           { type: Number },
    breathingRate:   { type: Number },
    heartRate:       { type: Number },
    oxygenLevel:     { type: Number },
    confidenceScore: { type: Number }
  },

  bpReading: {
    systolic:  { type: Number },
    diastolic: { type: Number }
  },

  sugarLevel: { type: Number },
  peakFlow:   { type: Number },

  severity: {
    type: String,
    enum: ['Low', 'Moderate', 'High', 'Critical'],
    default: 'Low'
  },

  notes:      { type: String },
  recordedAt: { type: Date, default: Date.now }

}, { timestamps: true });

module.exports = mongoose.model('HealthRecord', HealthRecordSchema);