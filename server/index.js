const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const resumeRoutes = require("./routes/resumeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// MongoDB Connection
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("AI Resume Builder Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});