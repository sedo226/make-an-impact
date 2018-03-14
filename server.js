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

  //and remove cacheing so we get the most recent comments
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//set the route path & initialize the API
router.get("/", function(req, res) {
  res.json({ message: "API Initialized!" });
});

//adding the /comments route to our /api router
router
  .route("/events")
  //retrieve all events from the database
  .get(function(req, res) {
    //looks at our Event Schema
    Event.find(function(err, events) {
      if (err) res.send(err);
      //responds with a json object of our database comments.
      res.json(events);
    });
  })
  //post new comment to the database
  .post(function(req, res) {
    var event = new Event();
    //body parser lets us use the req.body
    event.title = req.body.title;
    event.description = req.body.description;

    event.save(function(err) {
      if (err) res.send(err);
      res.json({ message: "Event successfully added!" });
    });
  });

//Use our router configuration when we call /api
app.use("/api", router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
