import React, { Component } from "react";

class Labels extends Component {
  render() {
    return (
      <div>
        <div className="hint">Click labels to order by: </div>
        <div className="row-label">
          <div className="cell-label" onClick={() => this.props.name_onClick()}>
            Asteroid Name
          </div>
          <div className="cell-label" onClick={() => this.props.date_onClick()}>
            Approaching Date
          </div>
          <div className="cell-label" onClick={() => this.props.dia_onClick()}>
            Max Diameter (km)
          </div>
          <div className="cell-label" onClick={() => this.props.miss_onClick()}>
            Miss Distance (km)
          </div>
          <div className="cell-label" onClick={() => this.props.haz_onClick()}>
            Hazardous?
          </div>
        </div>
      </div>
    );
  }
}

export default Labels;
