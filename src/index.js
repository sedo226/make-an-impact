import React from "react";
import ReactDOM from "react-dom";
import ScheduleEvents from "./components/ScheduleEvents";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <ScheduleEvents url="http://localhost:3001/api/events" pollInterval={2000} />,
  document.getElementById("root")
);
