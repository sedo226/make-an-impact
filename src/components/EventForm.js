import React, { Component } from "react";
import "../style.css";
// import DateTime from "./DateTime";
// import EventTags from "./EventTags";

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "", eventDate: "" };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }
  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }
  handleDateChange(e) {
    this.setState({ eventDate: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let title = this.state.title.trim();
    let description = this.state.description.trim();
    let eventDate = this.state.eventDate.trim();
    if (!description || !title) {
      return;
    }
    this.props.onEventSubmit({
      title: title,
      description: description,
      eventDate: eventDate
    });
    this.setState({ title: "", description: "", eventDate: "" });
  }
  render() {
    //for inline style:
    const addEventHeader = {
      fontSize: "1.2em",
      color: "#03A9F4",
      textAlign: "center",
      fontWeight: "400",
      marginTop: "20px"
    };

    return (
      <form onSubmit={this.handleSubmit}>
        <h4 style={addEventHeader}>
          <span className="fas fa-plus-square" /> Add An Event
        </h4>
        <div className="form-group">
          <label htmlFor="eventTitle">Event:</label>
          <input
            type="text"
            id="eventTitle"
            className="form-control"
            placeholder="Event title, petition name, volunteer opportunity... you name it!"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <label htmlFor="eventDescription">Description:</label>
          <textarea
            type="text"
            rows="3"
            id="eventDescription"
            className="form-control"
            placeholder="Brief description of scheduled event"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
        </div>
        <div className="form-group row">
          <div className="col-12 col-md-4" style={{ paddingLeft: "0px" }}>
            <label htmlFor="date-input" className="col-2 col-form-label">
              Date/Time:
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="datetime-local"
                value={this.state.eventDate}
                id="date-input"
                onChange={this.handleDateChange}
              />
            </div>
          </div>
        </div>
        <input type="submit" className="btn btn-primary" value="Add Event" />
      </form>
    );
  }
}

export default EventForm;
