const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    costRange: {
      type: String,
      required: [true, 'Cost range is required'],
    },
    valueIncrease: {
      type: String,
      required: [true, 'Value increase is required'],
    },
    category: {
      type: String,
      enum: ['Interior', 'Exterior', 'Energy', 'Technology', 'Investment', 'Structural'],
      required: [true, 'Category is required'],
    },
    tags: {
      type: [String],
      enum: ['Apartment', 'Independent House'],
      default: ['Apartment', 'Independent House'],
    },
    budgetTier: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    icon: {
      type: String,
      default: '🏠',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Idea', ideaSchema);
