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
  handleEventUpdate = (id, event) => {
    axios.put(`${this.props.url}/${id}`, event).catch(err => {
      console.log(err);
    });
  };
  handleEventDelete = id => {
    if (confirm("Are you sure?")) {
      console.log("File", id, "is DOOMED!!!!!!");
      axios
        .delete(`${this.props.url}/${id}`)
        .then(res => {
          console.log("Event deleted");
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
  componentDidMount() {
    this.loadEventsFromServer();
    setInterval(this.loadEventsFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div className="scheduleContainer">
        <h2>My Schedule:</h2>
        <EventList
          onEventDelete={this.handleEventDelete}
          onEventUpdate={this.handleEventUpdate}
          data={this.state.data}
        />
        <EventForm onEventSubmit={this.handleEventSubmit} />
      </div>
    );
  }
}

export default ScheduleEvents;
