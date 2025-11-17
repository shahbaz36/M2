//Imports
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRoutes");
const vapiRoutes = require("./Routes/vapiRoutes");

//To initialise the admin
const {admin} = require('./firebaseConfig')

// Express app
const app = express();

//Api setup :Listening to incoming request/traffic
app.use(cors());
app.use(express.json());
app.use("/api/v1/vapi", vapiRoutes);
app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, data: "Welcome to intervu.ai server" });
});



//=====================SERVER=====================//
dotenv.config({ path: "./config.env" });
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
//================================================//
