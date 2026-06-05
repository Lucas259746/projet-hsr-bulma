const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

// Server Startup
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`\n📚 Available endpoints:\n`);
  console.log(`  GET /api/user/:userId?language=fr`);
  console.log(`    └─ Profil complet (personnages, équipements, stats)\n`);
  console.log(`  GET /api/user/:userId/raw?language=fr`);
  console.log(`    └─ Données brutes Mihomo (debug)\n`);
});
