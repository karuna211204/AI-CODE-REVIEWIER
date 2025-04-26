const express = require("express");
const cors = require("cors"); // <--- Import cors
const aiRoutes = require("./routes/ai.routes");

const app = express();

// Enable CORS
app.use(cors()); // <--- Add this

// Middleware to parse JSON bodies
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello World! This is the backend server.");
});

// Your AI Routes
app.use("/ai", aiRoutes);

module.exports = app;
