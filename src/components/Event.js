import React, { Component } from "react";
import "../style.css";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      title: "",
      description: ""
    };
  }

  updateEvent = e => {
    e.preventDefault();
    //brings up the update field when we click on the update link.
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  };
  cancleUpdate = () => {
    this.setState({ toBeUpdated: false });
  };
  handleEventUpdate = e => {
    e.preventDefault();
    let id = this.props.uniqueID;
    //if title or description changed, set it. if not, leave null and our PUT request
    //will ignore it.
    let title = this.state.title ? this.state.title : null;
    let description = this.state.description ? this.state.description : null;
    let event = { title: title, description: description };
    this.props.onEventUpdate(id, event);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      title: "",
      description: ""
    });
  };
  deleteEvent = e => {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onEventDelete(id);
    console.log("soft deleted");
  };
  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };
  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };
  render() {
    // For inline styling purposes:
    const updateIcon = {
      position: "absolute",
      top: "10px",
      right: "40px",
      color: "#009688"
    };
    const deleteIcon = {
      position: "absolute",
      top: "10px",
      right: "10px",
      color: "#c9302c"
    };
    const updateEventHeader = {
      fontSize: "1.3em",
      color: "#009688",
      textAlign: "center",
      fontWeight: "400",
      marginTop: "20px"
    };
    return (
      <div className="scheduleEvent">
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
            <input
              type="text"
              id="description"
              placeholder={this.props.description}
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />
            <input type="submit" value="Update" className="btn btn-secondary" />
            <button
              className="btn btn-secondary cancleButton"
              onClick={this.cancleUpdate}
            >
              Cancle
            </button>
            <hr />
          </form>
        ) : null}
      </div>
    );
  }
}

export default Event;
