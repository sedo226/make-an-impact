import React, { Component } from "react";
import "./style.css";
import marked from "marked";

class Event extends Component {
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div className="comment">
        <h3>{this.props.title}</h3>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
}

export default Event;
