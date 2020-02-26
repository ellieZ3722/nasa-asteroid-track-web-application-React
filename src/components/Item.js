import React, { Component } from "react";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drop_down_state: "none",
      row_background: "",
      row_text_color: "",
      row_font_weight: ""
    };
  }

  item_onClick() {
    if (this.state.drop_down_state === "none") {
      this.setState({
        drop_down_state: "",
        row_background: "white",
        row_text_color: "navy",
        row_font_weight: "bold"
      });
    } else {
      this.setState({
        drop_down_state: "none",
        row_background: "",
        row_text_color: "",
        row_font_weight: ""
      });
    }
  }

  render() {
    const name = this.props.object.name;
    const is_hazardous = this.props.object.is_potentially_hazardous_asteroid;

    var hazardous_string = "-";
    if (is_hazardous === true) {
      hazardous_string = "yes";
    }

    const estimated_diamiter_max = this.props.object.estimated_diameter
      .kilometers.estimated_diameter_max;
    const close_approach_date = this.props.object.close_approach_data[0]
      .close_approach_date;
    const miss_distance = this.props.object.close_approach_data[0].miss_distance
      .kilometers;

    const website_url = this.props.object.nasa_jpl_url;

    var hazard_style = {
      background: "rgba(255, 0, 0, 0.4)"
    };
    if (!is_hazardous) {
      hazard_style = {
        background: "rgba(0, 255, 0, 0.4)"
      };
    }

    var dia_percent =
      (estimated_diamiter_max - this.props.min_max_diameter) /
      (this.props.max_max_diameter - this.props.min_max_diameter);
    var miss_percent =
      (this.props.max_miss_distance - miss_distance) /
      (this.props.max_miss_distance - this.props.min_miss_distance);

    var dia_style = {
      background: "rgba(0, 0, 255, " + dia_percent + ")"
    };

    var miss_style = {
      background: "rgba(255, 140, 0, " + miss_percent + ")"
    };

    //hidden attributes
    const asteroid_id = this.props.object.id;
    const estimated_diameter_min = this.props.object.estimated_diameter
      .kilometers.estimated_diameter_min;
    const absolute_magnitude = this.props.object.absolute_magnitude_h;
    const relative_velocity = this.props.object.close_approach_data[0]
      .relative_velocity.kilometers_per_second;
    const orbiting_body = this.props.object.close_approach_data[0]
      .orbiting_body;

    return (
      <div>
        <div
          style={{
            background: this.state.row_background,
            color: this.state.row_text_color,
            fontWeight: this.state.row_font_weight
          }}
          className="row"
          onClick={() => this.item_onClick()}
        >
          <a
            style={{ fontWeight: "bold", color: "inherit" }}
            className="cell"
            href={website_url}
          >
            {name}
          </a>
          <div className="cell">{close_approach_date}</div>
          <div className="cell" style={dia_style}>
            {estimated_diamiter_max}
          </div>
          <div className="cell" style={miss_style}>
            {miss_distance}
          </div>
          <div className="cell" style={hazard_style}>
            {hazardous_string}
          </div>
        </div>

        <div style={{ display: this.state.drop_down_state }}>
          <div className="hidden_info">
            <div className="group">
              <div className="hidden-text">Asteroid ID: {asteroid_id}</div>
              <div className="hidden-text">
                Estimated Minimum Diameter (km): {estimated_diameter_min}
              </div>
              <div className="hidden-text">
                Absolute Magnitude: {absolute_magnitude}
              </div>
            </div>
            <div className="group">
              <div className="hidden-text">
                Relative Velocity (km): {relative_velocity}
              </div>
              <div className="hidden-text">Orbiting Body: {orbiting_body}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
