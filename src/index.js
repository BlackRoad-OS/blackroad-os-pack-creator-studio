const express = require('express');
const healthRoutes = require('./routes/health');
const contentRoutes = require('./routes/content');
const promptRoutes = require('./routes/prompts');
const workflowRoutes = require('./routes/workflows');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Routes
app.use('/health', healthRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/prompts', promptRoutes);
app.use('/api/workflows', workflowRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'blackroad-os-pack-creator-studio',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      content: '/api/content',
      prompts: '/api/prompts',
      workflows: '/api/workflows',
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`blackroad-os-pack-creator-studio is running on port ${PORT}`);
});

module.exports = app;
