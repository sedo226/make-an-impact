"use strict";
// dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//Event Schema
const Event = require("./models/events");

// create our instances
const app = express();
const router = express.Router();
//set our port to either a predetermined port number if you have set it up, or 3001
const port = process.env.API_PORT || 3001;

//db config
const mongoDB =
  "mongodb://testuser:testuser1@ds263988.mlab.com:63988/make-an-impact";
mongoose.connect(mongoDB, { useMongoClient: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// /* ======================= DATABASE ===================== */
// /*
//     mongoDb connection - the connect method takes 1 argument, the Mongo Database - port 27017 is the default port for MongoDB, the last part is the name of the mongo data store - the name of the database for this app. The database doesn't exisit initially, but when the app starts, mongoose will create it
// */
// mongoose.connect("mongodb://localhost:27017/mai");
// // this variable will hold the database connection object
// const db = mongoose.connection;
// // error handling
// db.on("error", console.error.bind(console, "connection error:"));

// //configure the API to use bodyParser and look for JSON data in the request body
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );

//   //and remove cacheing so we get the most recent comments
//   res.setHeader("Cache-Control", "no-cache");
//   next();
// });

//set the route path & initialize the API
router.get("/", function(req, res) {
  res.json({ message: "API Initialized!" });
});

//Use our router configuration when we call /api
app.use("/api", router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
