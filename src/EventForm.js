import React, { Component } from "react";
import "./style.css";

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "" };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }
  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(
      `${this.state.title} with description "${this.state.description}"`
    );
    //TODO replace with post method
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="eventTitle">Event:</label>
          <input
            type="description"
            id="eventTitle"
            className="form-control"
            placeholder="Event title, petition name, volunteer opportunity... you name it!"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventDescription">Description:</label>
          <input
            type="description"
            id="eventDescription"
            className="form-control"
            placeholder="Brief description of scheduled event"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
        </div>
        <input type="submit" className="commentFormPost" value="Post" />
      </form>
    );
  }
}

export default EventForm;
