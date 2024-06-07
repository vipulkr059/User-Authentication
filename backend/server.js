const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const port = 8000;

//Configs
dotenv.config();
dbConnect();

const app = express();

//MiddleWares
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`server started at ${port}`);
});