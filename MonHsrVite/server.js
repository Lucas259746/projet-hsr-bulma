const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Server Startup
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`\n📚 Available endpoints:\n`);
  console.log(`  GET /api/user/:userId`);
  console.log(`    └─ Fetch complete player profile with characters & equipment\n`);
  console.log(`  GET /api/characters`);
  console.log(`    └─ Fetch all available characters in the game\n`);
  console.log(`  GET /api/light-cones`);
  console.log(`    └─ Fetch all available light cones in the game\n`);
  console.log(`  GET /api/relics`);
  console.log(`    └─ Fetch all available relics in the game\n`);
});
