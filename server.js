const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//Event Schema
const Event = require("./models/events");
const app = express();
const router = express.Router();
const port = process.env.API_PORT || 3001;

//db config
const mongoDB =
  "mongodb://testuser:testuser1@ds263988.mlab.com:63988/make-an-impact";
mongoose.connect(mongoDB, { useMongoClient: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//prevent errors from CORS
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//set the route path & initialize the API
router.get("/", function(req, res) {
  res.json({ message: "API Initialized!" });
});

//adding the /events route to our /api router
router
  .route("/events")
  .get(function(req, res) {
    //looks at our Event Schema
    Event.find({ deleted: { $ne: true } }, function(err, events) {
      if (err) res.send(err);
      res.json(events);
    });
  })
  //post
  .post(function(req, res) {
    var event = new Event();
    event.title = req.body.title;
    event.description = req.body.description;
    event.save(function(err) {
      if (err) res.send(err);
      res.json({ message: "Event added" });
    });
  });
router
  .route("/events/:event_id")
  .put(function(req, res) {
    Event.findById(req.params.event_id, function(err, event) {
      if (err) res.send(err);
      req.body.title ? (event.title = req.body.title) : null;
      req.body.description ? (event.description = req.body.description) : null;
      //save updated event in db
      event.save(function(err) {
        if (err) res.send(err);
        res.json({ message: "Event updated" });
      });
    });
  })
  // soft delete events from db
  .delete(function(req, res) {
    Event.findById(req.params.event_id, function(err, event) {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      //only real diff from put handler is the line of code below
      event.deleted = true;

      event.save(function(err, doomedFile) {
        res.json({ message: "File soft deleted" });
      });
    });
  });

//Use our router configuration when we call /api
app.use("/api", router);

//starts the server and listen for req
app.listen(port, function() {
  console.log(`api running - ${port}`);
});
