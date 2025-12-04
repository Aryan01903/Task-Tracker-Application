require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const authRoute = require('./modules/auth/route');
const taskRoute = require('./modules/task/route');

app.use(cors());
app.use(express.json()); 

app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoute);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Database Connected'))
  .catch((err) => console.error('Database Connection Error:', err));

// Test API Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`);
});
