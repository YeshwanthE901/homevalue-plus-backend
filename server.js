require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/auth');
const ideasRoutes = require('./routes/ideas');
const submissionsRoutes = require('./routes/submissions');
const contactRoutes = require('./routes/contact');
const recommendationsRoutes = require('./routes/recommendations');

const app = express();

// ─── Middleware ──────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ─────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/ideas', ideasRoutes);
app.use('/api/submissions', submissionsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/recommendations', recommendationsRoutes);

// ─── Health Check ───────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'HomeValue+ API is running 🏡',
    endpoints: {
      auth: '/api/auth',
      ideas: '/api/ideas',
      submissions: '/api/submissions',
      contact: '/api/contact',
      recommendations: '/api/recommendations',
    },
  });
});

// ─── 404 Handler ────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ─── Error Handler ──────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// ─── Start Server ───────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
