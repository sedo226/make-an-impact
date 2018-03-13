import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import ScheduleEvents from "./components/ScheduleEvents";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

ReactDOM.render(<ScheduleEvents />, document.getElementById("root"));

registerServiceWorker();
