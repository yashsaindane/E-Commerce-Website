const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8005;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

// Set views directory
app.set("views", path.join(__dirname, "views"));

// Set view engine
app.set("view engine", "ejs");

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// route
const homeRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
const { connectMDB } = require("./connection");

// Connect to MongoDB
connectMDB("mongodb://localhost:27017/login-tut")
  .then(() => {
    console.log("MongoDB connected");
    // Start the server after connecting to the database
  })
  .catch((err) => {
    console.log("MongoDB error", err);
  });

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Use routes

app.use("/", homeRoutes);
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", require("./routes/adminRoutes"));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

// Use the error handling middleware
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
