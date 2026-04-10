require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const authRoutes = require('./routes/auth');
const membersRoutes = require('./routes/members');
const profileRoutes = require('./routes/profile');
const messagesRoutes = require('./routes/messages');
const prayerRoutes = require('./routes/prayer');
const connectionsRoutes = require('./routes/connections');
const jobsRoutes = require('./routes/jobs');
const galleryRoutes = require('./routes/gallery');
const suggestionsRoutes = require('./routes/suggestions');
const notificationsRoutes = require('./routes/notifications');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'BRBR Community API running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', membersRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/prayer', prayerRoutes);
app.use('/api/connections', connectionsRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/suggestions', suggestionsRoutes);
app.use('/api/notifications', notificationsRoutes);

// Initialize database and start server
const PORT = process.env.PORT || 3001;

async function initializeApp() {
  try {
    // Test database connection
    const result = await db.query('SELECT NOW()');
    console.log('Database connected at:', result.rows[0].now);

    app.listen(PORT, () => {
      console.log(`BRBR Community API server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to initialize app:', err);
    process.exit(1);
  }
}

initializeApp();

module.exports = app;
