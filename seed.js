/**
 * Seed script — populates the database with initial ideas, admin user, and sample submissions.
 * Run: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Idea = require('./models/Idea');
const Submission = require('./models/Submission');

const ideas = [
  {
    title: 'Kitchen Modernization',
    description: 'Upgrade cabinets, countertops, and appliances for a fresh, functional kitchen.',
    costRange: '₹1L – ₹3L',
    valueIncrease: '5–8%',
    category: 'Interior',
    tags: ['Apartment', 'Independent House'],
    budgetTier: 'medium',
    icon: '🍳',
  },
  {
    title: 'Bathroom Upgrade',
    description: 'Replace fixtures, add premium tiles, and improve lighting for a spa-like feel.',
    costRange: '₹50K – ₹1.5L',
    valueIncrease: '3–6%',
    category: 'Interior',
    tags: ['Apartment', 'Independent House'],
    budgetTier: 'low',
    icon: '🚿',
  },
  {
    title: 'Solar Panel Installation',
    description: 'Reduce electricity bills and add green energy credentials to your home.',
    costRange: '₹2L – ₹5L',
    valueIncrease: '4–7%',
    category: 'Energy',
    tags: ['Independent House'],
    budgetTier: 'high',
    icon: '☀️',
  },
  {
    title: 'Smart Home Lighting',
    description: 'Install smart LED systems, automated switches, and motion sensors.',
    costRange: '₹30K – ₹80K',
    valueIncrease: '2–4%',
    category: 'Technology',
    tags: ['Apartment', 'Independent House'],
    budgetTier: 'low',
    icon: '💡',
  },
  {
    title: 'Exterior Painting & Facade',
    description: 'Fresh exterior paint and facade improvements dramatically boost curb appeal.',
    costRange: '₹40K – ₹1.2L',
    valueIncrease: '3–5%',
    category: 'Exterior',
    tags: ['Independent House'],
    budgetTier: 'low',
    icon: '🎨',
  },
  {
    title: 'Modular Storage Solutions',
    description: 'Custom modular wardrobes, loft storage, and under-stair cabinets.',
    costRange: '₹50K – ₹1.5L',
    valueIncrease: '2–4%',
    category: 'Interior',
    tags: ['Apartment', 'Independent House'],
    budgetTier: 'low',
    icon: '📦',
  },
  {
    title: 'Landscaping & Garden',
    description: 'Create a beautiful garden, add plants, pathways, and outdoor lighting.',
    costRange: '₹80K – ₹2L',
    valueIncrease: '4–6%',
    category: 'Exterior',
    tags: ['Independent House'],
    budgetTier: 'medium',
    icon: '🌿',
  },
  {
    title: 'Rental Optimization Renovation',
    description: 'Convert unused spaces into rentable rooms or add a self-contained unit.',
    costRange: '₹3L – ₹8L',
    valueIncrease: '10–15%',
    category: 'Investment',
    tags: ['Independent House'],
    budgetTier: 'high',
    icon: '🏠',
  },
  {
    title: 'Waterproofing & Seepage Fix',
    description: 'Fixing seepage, leaks, and waterproofing terraces to prevent structural damage.',
    costRange: '₹30K – ₹1L',
    valueIncrease: '2–5%',
    category: 'Structural',
    tags: ['Apartment', 'Independent House'],
    budgetTier: 'low',
    icon: '💧',
  },
  {
    title: 'Flooring Upgrade',
    description: 'Replace old tiles with vitrified tiles, marble, or engineered wood flooring.',
    costRange: '₹1L – ₹2.5L',
    valueIncrease: '3–6%',
    category: 'Interior',
    tags: ['Apartment', 'Independent House'],
    budgetTier: 'medium',
    icon: '🪵',
  },
  {
    title: 'Security System Installation',
    description: 'Install CCTV, video doorbell, smart locks, and alarm systems.',
    costRange: '₹25K – ₹70K',
    valueIncrease: '1–3%',
    category: 'Technology',
    tags: ['Apartment', 'Independent House'],
    budgetTier: 'low',
    icon: '🔒',
  },
  {
    title: 'Balcony / Terrace Renovation',
    description: 'Convert unused balcony or terrace into a living/entertainment space.',
    costRange: '₹1L – ₹3L',
    valueIncrease: '3–5%',
    category: 'Exterior',
    tags: ['Apartment', 'Independent House'],
    budgetTier: 'medium',
    icon: '🌇',
  },
];

const submissions = [
  {
    ownerName: 'Ravi Kumar',
    city: 'Bangalore',
    propertyType: 'Independent House',
    squareFeet: 1200,
    condition: 'Average',
    budget: 300000,
    yearsOld: 12,
    submittedAt: '2024-01-15',
  },
  {
    ownerName: 'Priya Sharma',
    city: 'Mumbai',
    propertyType: 'Apartment',
    squareFeet: 850,
    condition: 'Good',
    budget: 150000,
    yearsOld: 5,
    submittedAt: '2024-02-03',
  },
  {
    ownerName: 'Anil Mehta',
    city: 'Pune',
    propertyType: 'Independent House',
    squareFeet: 1800,
    condition: 'Poor',
    budget: 700000,
    yearsOld: 25,
    submittedAt: '2024-02-18',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Idea.deleteMany({});
    await Submission.deleteMany({});
    console.log('🗑  Cleared existing data');

    // Create admin user
    await User.create({
      name: 'Admin User',
      email: 'admin@homevalue.in',
      password: 'admin123',
      role: 'admin',
    });
    console.log('👤 Admin user created (admin@homevalue.in / admin123)');

    // Seed ideas
    await Idea.insertMany(ideas);
    console.log(`💡 ${ideas.length} ideas seeded`);

    // Seed submissions
    await Submission.insertMany(submissions);
    console.log(`📋 ${submissions.length} sample submissions seeded`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
