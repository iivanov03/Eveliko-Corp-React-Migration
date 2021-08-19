import React from "react";
import PropTypes from "prop-types";
import "./Popup.css";
import Events from '../Events/Events'
export default class Popup extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div class="modal" id="modal">
        <h2>Events for the day</h2>
        <div class="content"><Events /></div>
        <div class="actions">
          <button class="toggle-button" onClick={this.onClose}>
            close
          </button>
        </div>
      </div>
    );
  }
}
Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};