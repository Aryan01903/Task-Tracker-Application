require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const app = express()

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Database Connected'))
  .catch((err) => console.error('Database Connection Error:', err));



app.listen(process.env.PORT, ()=>{
    console.log("Server Started at PORT: ", process.env.PORT)
})