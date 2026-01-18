const express = require('express')
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")


const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("../Routes/auth"))
app.use("/api/todo", require("../Routes/tasks"))

// mongoose.connect(process.env.MONGO_URI)
// .then(console.log("MongoDB connected"))
// .catch(err => console.log(err));
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

app.get("/", async (req, res) => {
  try {
    await connectDB();
    res.send("Backend running successfully!");
  } catch {
    res.status(500).send("MongoDB connection failed");
  }
});

app.get("/", (req,res) => {
  res.send("Hello World!!")
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// Export for Vercel
module.exports = app;