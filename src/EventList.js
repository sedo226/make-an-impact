import React, { Component } from "react";
import Event from "./Event";
import "./style.css";

class EventList extends Component {
  render() {
    let eventNodes = this.props.data.map(event => {
      return (
        <Event title={event.title} key={event.id}>
          {event.description}
        </Event>
      );
    });
    return <div className="commentList">{eventNodes}</div>;
  }
}

export default EventList;
