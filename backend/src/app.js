const express = require("express");
const cors = require("cors"); // <--- Import cors
const aiRoutes = require("./routes/ai.routes");

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "*", // allow all origins (can restrict later if needed)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello World! This is the backend server.");
});

// Your AI Routes
app.use("/ai", aiRoutes);

module.exports = app;
