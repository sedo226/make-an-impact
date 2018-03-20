import React, { Component } from "react";
import "../style.css";

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "" };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    //this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }
  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }
  // handleDateChange(e) {
  //   this.setState({ date: e.target.value });
  // }
  handleSubmit(e) {
    e.preventDefault();
    let title = this.state.title.trim();
    let description = this.state.description.trim();
    if (!description || !title) {
      return;
    }
    this.props.onEventSubmit({ title: title, description: description });
    this.setState({ title: "", description: "" });
  }
  render() {
    const addEventHeader = {
      fontSize: "1.3em",
      color: "#3F51B5",
      textAlign: "center",
      fontWeight: "400",
      marginTop: "20px"
    };
    return (
      <form onSubmit={this.handleSubmit}>
        <h4 style={addEventHeader}>
          <span className="fas fa-plus-square" /> Add An Event To My Schedule
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
          <input
            type="text"
            id="eventDescription"
            className="form-control"
            placeholder="Brief description of scheduled event"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
        </div>
        {/* <div className="form-group row">
          <div className="col-12 col-md-6" style={{ paddingLeft: "0px" }}>
            <label htmlFor="date-input" className="col-2 col-form-label">
              Date
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="date"
                value={this.state.date}
                id="date-input"
                onChange={this.handleDateChange}
              />
            </div>
          </div>
        </div> */}
        <input type="submit" className="btn btn-primary" value="Add Event" />
      </form>
    );
  }
}

export default EventForm;
