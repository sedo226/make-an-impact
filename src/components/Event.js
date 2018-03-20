import React, { Component } from "react";
import "../style.css";

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
    return (
      <div className="scheduleEvent">
        <h3 className="eventTitle">{this.props.title}</h3>
        <span>{this.props.description}</span>
        <a href="#" onClick={this.updateEvent} style={updateIcon}>
          <span className="fas fa-edit" />
        </a>
        <a href="#" onClick={this.deleteEvent} style={deleteIcon}>
          <span className="fas fa-trash-alt" />
        </a>
        {this.state.toBeUpdated ? (
          <form onSubmit={this.handleEventUpdate}>
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
            <input type="submit" value="Update" />
          </form>
        ) : null}
      </div>
    );
  }
}

export default Event;
