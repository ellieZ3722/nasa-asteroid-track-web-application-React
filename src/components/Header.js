import React, { Component } from "react";
import nasaLogo from "./nasa-logo.png";

class Header extends Component {
  render() {
    return (
      <div>
        <div className="top-white-bar"></div>
        <header
          id="header"
          className="navbar navbar-expand-sm navbar-dark bg-primary bg-light"
        >
          <img id="logo-image" src={nasaLogo} alt="" />
          <p id="header-text" className="font-weight-bold">
            {this.props.title}
          </p>
          <button className="header-button">Log in</button>
          <button className="header-button">Contact</button>
        </header>
      </div>
    );
  }
}

export default Header;
