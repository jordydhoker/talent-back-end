const express = require('express');
const app = express();
const mongoose = require("mongoose");

const password = encodeURIComponent(process.env.MONGO_ATLAS_PW)

mongoose.connect(
  'mongodb+srv://Jordy:jazeker@restexample-1rnt1.mongodb.net/test?retryWrites=true',
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/posts", require("./api/routes/posts"));
app.use("/user", require('./api/routes/users'));

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
