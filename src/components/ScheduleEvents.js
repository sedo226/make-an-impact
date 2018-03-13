//ScheduleEvent.js
import React, { Component } from "react";
import EventList from "./EventList";
import EventForm from "./EventForm";
import DATA from "../../data";
import "../style.css";

class ScheduleEvents extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="schedule-container">
        <h2>My Schedule:</h2>
        <EventList data={DATA} />
        <EventForm />
      </div>
    );
  }
}

export default ScheduleEvents;
