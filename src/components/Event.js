import React, { Component } from "react";
import "../style.css";
import marked from "marked";

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
    console.log("oops deleted");
  };
  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };
  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div className="scheduleEvent">
        <h3 className="eventTitle">{this.props.title}</h3>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <a href="#" onClick={this.updateEvent}>
          update
        </a>
        <a href="#" onClick={this.deleteEvent}>
          delete
        </a>
        {this.state.toBeUpdated ? (
          <form onSubmit={this.handleEventUpdate}>
            <input
              type="text"
              placeholder="TOOD"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
            <input
              type="text"
              placeholder="TODO"
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
