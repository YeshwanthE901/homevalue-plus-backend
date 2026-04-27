const express = require('express');
const Contact = require('../models/Contact');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// ─── POST /api/contact ──────────────────────────────────────────────
// Public — submit a contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: 'Message sent successfully', id: contact._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ─── GET /api/contact ───────────────────────────────────────────────
// Admin only — list all contact messages
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── PUT /api/contact/:id/read ──────────────────────────────────────
// Admin only — mark message as read
router.put('/:id/read', protect, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Message not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
