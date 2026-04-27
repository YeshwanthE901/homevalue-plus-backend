const express = require('express');
const Idea = require('../models/Idea');

const router = express.Router();

// ─── POST /api/recommendations ──────────────────────────────────────
// Public — compute recommendations based on property data
router.post('/', async (req, res) => {
  try {
    const { budget, condition, propertyType } = req.body;

    if (!budget || !condition || !propertyType) {
      return res.status(400).json({ message: 'budget, condition, and propertyType are required' });
    }

    const budgetNum = parseFloat(budget) || 0;

    // Determine budget tier
    let budgetTier = 'low';
    if (budgetNum >= 200000 && budgetNum < 500000) budgetTier = 'medium';
    if (budgetNum >= 500000) budgetTier = 'high';

    // Fetch ideas matching property type
    const ideas = await Idea.find({ tags: propertyType });

    // Score each idea
    const scored = ideas.map((idea) => {
      let score = 0;

      // Budget tier match
      if (idea.budgetTier === budgetTier) score += 3;
      if (idea.budgetTier === 'low' && budgetTier !== 'low') score += 1;

      // Condition-based scoring
      if (condition === 'Poor') {
        if (['Structural', 'Interior'].includes(idea.category)) score += 2;
      }
      if (condition === 'Average') {
        if (['Interior', 'Technology'].includes(idea.category)) score += 2;
      }
      if (condition === 'Good') {
        if (['Energy', 'Investment', 'Exterior'].includes(idea.category)) score += 2;
      }

      return { ...idea.toObject(), score };
    });

    // Sort by score descending, return top 6
    const recommendations = scored.sort((a, b) => b.score - a.score).slice(0, 6);

    // Value estimate
    let base = 0;
    if (budgetNum < 200000) base = 4;
    else if (budgetNum < 500000) base = 9;
    else base = 15;

    const modifier = condition === 'Poor' ? 1.3 : condition === 'Average' ? 1.1 : 1.0;
    const valueEstimate = {
      low: Math.round(base * 0.8 * modifier),
      high: Math.round(base * modifier),
    };

    res.json({ recommendations, valueEstimate });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
