const express = require("express");
const app = express();
const port = 8089;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//env file configuration
dotenv.config();
app.use(cors());

app.use(express.json());

app.use("/api/v1", require("./routes/authroutes"));
app.use("/api/v2", require("./routes/authroutes"));
app.use("/api/auth", require("./routes/user-routes"));
app.use("/api/crm", require("./routes/notifyroutes"));
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
