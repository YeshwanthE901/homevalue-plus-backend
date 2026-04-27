const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
      required: [true, 'Owner name is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    propertyType: {
      type: String,
      enum: ['Apartment', 'Independent House'],
      required: [true, 'Property type is required'],
    },
    squareFeet: {
      type: Number,
      required: [true, 'Square feet is required'],
      min: 1,
    },
    condition: {
      type: String,
      enum: ['Poor', 'Average', 'Good'],
      required: [true, 'Condition is required'],
    },
    budget: {
      type: Number,
      required: [true, 'Budget is required'],
      min: 0,
    },
    yearsOld: {
      type: Number,
      required: [true, 'Property age is required'],
      min: 0,
    },
    submittedAt: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', submissionSchema);
