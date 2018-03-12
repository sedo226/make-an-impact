import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import ScheduleEvents from "./ScheduleEvents";
import "../bootstrap/css/bootstrap.min.css";
import "./style.css";

ReactDOM.render(<ScheduleEvents />, document.getElementById("root"));

registerServiceWorker();
