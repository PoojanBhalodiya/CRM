const express = require("express");
const app = express();
const port = 8089;
const router = require("./routes/router");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//env file configration
dotenv.config();
app.use(cors());

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", require("./routes/router"));
app.use("/api/v2", require("./routes/router"));

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Port is running on ${port}`);
});
