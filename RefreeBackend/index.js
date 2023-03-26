const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const scoresRoute = require("./routes/scores")
const helmet = require("helmet");

require("dotenv").config();


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

db.on('connected', () => {
  console.log('Connected to MongoDB');
});


app.use(cors({ credentials: true, origin: [process.env.CORS_ORIGIN] }));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/scores", scoresRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  console.log("backend server is running!");
});

module.exports = app;
