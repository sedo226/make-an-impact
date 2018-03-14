//ScheduleEvents.js
import React, { Component } from "react";
import EventList from "./EventList";
import EventForm from "./EventForm";
import axios from "axios";
import "../style.css";

class ScheduleEvents extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  loadEventsFromServer = () => {
    axios.get(this.props.url).then(res => {
      this.setState({ data: res.data });
    });
  };
  handleEventSubmit = event => {
    axios
      .post(this.props.url, event)
      .then(res => {
        this.loadEventsFromServer();
      })
      .catch(err => {
        console.error(err);
      });
  };
  componentDidMount() {
    this.loadEventsFromServer();
    setInterval(this.loadEventsFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div className="scheduleContainer">
        <h2>My Schedule:</h2>
        <EventList data={this.state.data} />
        <EventForm onEventSubmit={this.handleEventSubmit} />
      </div>
    );
  }
}

export default ScheduleEvents;
