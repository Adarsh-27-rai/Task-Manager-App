const express = require('express')
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")


const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./Routes/auth"))
app.use("/api/todo", require("./Routes/tasks"))

mongoose.connect(process.env.MONGO_URI)
.then(console.log("MongoDB connected"))
.catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
