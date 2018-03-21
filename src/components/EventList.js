import React, { Component } from "react";
import Event from "./Event";
import "../style.css";

class EventList extends Component {
  render() {
    let eventNodes = this.props.data.map(event => {
      return (
        <Event
          title={event.title}
          uniqueID={event["_id"]}
          onEventDelete={this.props.onEventDelete}
          onEventUpdate={this.props.onEventUpdate}
          key={event["_id"]}
          description={event.description}
          eventDate={event.eventDate}
        />
      );
    });
    return <div className="schedule">{eventNodes}</div>;
  }
}

export default EventList;
