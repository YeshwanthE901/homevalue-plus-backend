const express = require('express');
const Submission = require('../models/Submission');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// ─── GET /api/submissions ───────────────────────────────────────────
// Admin only — list all submissions (with optional filters)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const filter = {};
    if (req.query.condition && req.query.condition !== 'All') {
      filter.condition = req.query.condition;
    }
    if (req.query.propertyType && req.query.propertyType !== 'All') {
      filter.propertyType = req.query.propertyType;
    }
    if (req.query.search) {
      const search = req.query.search;
      filter.$or = [
        { ownerName: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    const submissions = await Submission.find(filter).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── POST /api/submissions ──────────────────────────────────────────
// Public — submit a new property
router.post('/', async (req, res) => {
  try {
    const { ownerName, city, propertyType, squareFeet, condition, budget, yearsOld } = req.body;

    if (!ownerName || !city || !propertyType || !squareFeet || !condition || !budget || yearsOld === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const submission = await Submission.create({
      ownerName,
      city,
      propertyType,
      squareFeet: parseFloat(squareFeet),
      condition,
      budget: parseFloat(budget),
      yearsOld: parseInt(yearsOld),
    });

    res.status(201).json(submission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ─── GET /api/submissions/:id ───────────────────────────────────────
router.get('/:id', protect, async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── DELETE /api/submissions/:id ────────────────────────────────────
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json({ message: 'Submission deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
