import React, { Component } from "react";
import "../style.css";
import Moment from "react-moment";
import "moment-timezone";

Moment.globalFormat = "MMM D, YYYY - hh:mm a";
// const dateTransform = dateData => {
//   let dateObject = new Date(Date.parse(dateData));
//   let dateReadable = dateObject.toDateString();
//   return dateReadable;
// };
// const timeTransform = timeData => {
//   if (timeData && timeData.includes("00:00:00.000Z")) {
//     return " No time specified";
//   } else {
//     let timeObject = new Date(Date.parse(timeData));
//     let timeReadable = " " + timeObject.toTimeString();
//     return timeReadable;
//   }
// };

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      title: "",
      description: "",
      eventDate: ""
    };
  }

  updateEvent = e => {
    e.preventDefault();
    //open update form
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  };
  cancleUpdate = () => {
    //close update form
    this.setState({ toBeUpdated: false });
  };
  handleEventUpdate = e => {
    e.preventDefault();
    let id = this.props.uniqueID;
    let title = this.state.title ? this.state.title : null;
    let description = this.state.description ? this.state.description : null;
    let eventDate = this.state.eventDate ? this.state.eventDate : null;
    let event = {
      title: title,
      description: description,
      eventDate: eventDate
    };
    this.props.onEventUpdate(id, event);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      title: "",
      description: "",
      eventDate: ""
    });
  };
  deleteEvent = e => {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onEventDelete(id);
    console.log("soft delete");
  };
  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };
  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };
  handleDateChange = e => {
    this.setState({ eventDate: e.target.value });
  };

  render() {
    //for inline styling purposes:
    const updateIcon = {
      position: "absolute",
      top: "10px",
      right: "40px",
      color: "#4CAF50"
    };
    const deleteIcon = {
      position: "absolute",
      top: "10px",
      right: "10px",
      color: "#F44336"
    };
    const updateEventHeader = {
      fontSize: "1em",
      color: "#4CAF50",
      textAlign: "center",
      fontWeight: "400",
      marginTop: "20px"
    };

    return (
      <div className="scheduleEvent">
        <h5 className="eventDate">
          <Moment>{this.props.eventDate}</Moment>
          {/* {dateTransform(this.props.eventDate)} -
          {timeTransform(this.props.eventDate)} */}
        </h5>
        <h3 className="eventTitle">{this.props.title}</h3>
        <div className="eventDescription">{this.props.description}</div>
        <a href="#" onClick={this.updateEvent} style={updateIcon}>
          <span className="fas fa-edit" />
        </a>
        <a href="#" onClick={this.deleteEvent} style={deleteIcon}>
          <span className="fas fa-trash-alt" />
        </a>
        {this.state.toBeUpdated ? (
          <form onSubmit={this.handleEventUpdate}>
            <hr />
            <h4 style={updateEventHeader}>
              <span className="fas fa-edit" /> Update Event Details
            </h4>
            <div className="form-group">
              <label htmlFor="title" className="displayBlock">
                Title:
              </label>
              <input
                type="text"
                id="title"
                placeholder={this.props.title}
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
              <label htmlFor="Description" className="displayBlock">
                Description:
              </label>
              <textarea
                type="text"
                rows="3"
                id="description"
                placeholder={this.props.description}
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              />
            </div>
            <div className="form-group row">
              <div className="col-12 col-md-4" style={{ paddingLeft: "0px" }}>
                <label htmlFor="date" className="col-2 col-form-label">
                  Date:
                </label>
                <div className="col-10">
                  <input
                    className="form-control"
                    type="datetime-local"
                    value={this.state.eventDate}
                    id="date"
                    onChange={this.handleDateChange}
                  />
                </div>
              </div>
            </div>
            <input type="submit" value="Update" className="btn btn-secondary" />
            <button
              className="btn btn-secondary cancleButton"
              onClick={this.cancleUpdate}
            >
              Cancel
            </button>
            <hr />
          </form>
        ) : null}
      </div>
    );
  }
}

export default Event;
