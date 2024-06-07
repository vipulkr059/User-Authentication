const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/db");

dotenv.config();
dbConnect();

const app = express();
const port = 8000;

app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
