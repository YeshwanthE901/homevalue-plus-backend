const express = require('express');
const Idea = require('../models/Idea');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// ─── GET /api/ideas ─────────────────────────────────────────────────
// Public — list all ideas (with optional category filter)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category && req.query.category !== 'All') {
      filter.category = req.query.category;
    }
    const ideas = await Idea.find(filter).sort({ createdAt: -1 });
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── GET /api/ideas/:id ─────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });
    res.json(idea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── POST /api/ideas ────────────────────────────────────────────────
// Admin only — create a new idea
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const idea = await Idea.create(req.body);
    res.status(201).json(idea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ─── PUT /api/ideas/:id ─────────────────────────────────────────────
// Admin only — update an idea
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!idea) return res.status(404).json({ message: 'Idea not found' });
    res.json(idea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ─── DELETE /api/ideas/:id ──────────────────────────────────────────
// Admin only — delete an idea
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });
    res.json({ message: 'Idea deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
