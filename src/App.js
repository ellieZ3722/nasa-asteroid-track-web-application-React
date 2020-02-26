import React, { Component } from "react";
import "./App.css";
import Item from "./components/Item";
import Header from "./components/Header";
import Labels from "./components/Labels";
import APODSection from "./components/APODSection";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      APOD: null,
      objects: [],
      max_max_diameter: 0,
      min_max_diameter: Number.MAX_VALUE,
      max_miss_distance: 0,
      min_miss_distance: Number.MAX_VALUE
    };
  }

  componentDidMount() {
    //fetch image
    const imageurl =
      "https://api.nasa.gov/planetary/apod?api_key=Y7ao0PhVsbAgJGP9TYqlIVAUbkKj6UpXKa4cCSj7";

    fetch(imageurl)
      .then(r => r.json())
      .then(data => {
        this.setState({ APOD: data });
      });

    //fetch asteroids
    var today = new Date();
    var todayFormatted =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    today.setDate(today.getDate() + 7);
    var sevenAfterFormatted =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    const url =
      "https://api.nasa.gov/neo/rest/v1/feed?start_date=" +
      todayFormatted +
      "&end_date=" +
      sevenAfterFormatted +
      "&api_key=Y7ao0PhVsbAgJGP9TYqlIVAUbkKj6UpXKa4cCSj7";

    fetch(url)
      .then(r => r.json())
      .then(data => {
        let asteroids = [];

        let near_earth_objects = data.near_earth_objects;
        for (const [key, value] of Object.entries(near_earth_objects)) {
          let object_of_the_day = value;
          for (var i = 0; i < object_of_the_day.length; i++) {
            asteroids.push(object_of_the_day[i]);
          }
        }

        asteroids.sort(function(a, b) {
          if (
            a.is_potentially_hazardous_asteroid === true &&
            b.is_potentially_hazardous_asteroid === false
          ) {
            return -1;
          } else if (
            b.is_potentially_hazardous_asteroid === true &&
            a.is_potentially_hazardous_asteroid === false
          ) {
            return 1;
          } else if (
            a.estimated_diameter.kilometers.estimated_diameter_max >
            b.estimated_diameter.kilometers.estimated_diameter_max
          ) {
            return -1;
          } else {
            return 1;
          }
        });

        this.setState({ objects: asteroids });

        var i;
        var max_dia = 0;
        var min_dia = Number.MAX_VALUE;
        var max_miss = 0;
        var min_miss = Number.MAX_VALUE;
        for (i = 0; i < asteroids.length; i++) {
          let asteroid = asteroids[i];
          max_dia = Math.max(
            max_dia,
            asteroid.estimated_diameter.kilometers.estimated_diameter_max
          );
          min_dia = Math.min(
            min_dia,
            asteroid.estimated_diameter.kilometers.estimated_diameter_max
          );
          max_miss = Math.max(
            max_miss,
            asteroid.close_approach_data[0].miss_distance.kilometers
          );
          min_miss = Math.min(
            min_miss,
            asteroid.close_approach_data[0].miss_distance.kilometers
          );
        }

        this.setState({
          max_max_diameter: max_dia,
          min_max_diameter: min_dia,
          max_miss_distance: max_miss,
          min_miss_distance: min_miss
        });
      });
  }

  reorder_by_diameter() {
    let new_asteroid = this.state.objects.slice();

    new_asteroid.sort(function(a, b) {
      if (
        a.estimated_diameter.kilometers.estimated_diameter_max >
        b.estimated_diameter.kilometers.estimated_diameter_max
      ) {
        return -1;
      } else {
        return 1;
      }
    });

    this.setState({ objects: new_asteroid });
  }

  reorder_by_miss_distance() {
    let new_asteroid = this.state.objects.slice();

    new_asteroid.sort(function(a, b) {
      let a_rounded =
        Math.round(
          parseFloat(a.close_approach_data[0].miss_distance.kilometers) * 100
        ) / 100;
      let b_rounded =
        Math.round(
          parseFloat(b.close_approach_data[0].miss_distance.kilometers) * 100
        ) / 100;
      if (a_rounded < b_rounded) {
        return -1;
      } else {
        return 1;
      }
    });

    this.setState({ objects: new_asteroid });
  }

  reorder_by_hazard() {
    let new_asteroid = this.state.objects.slice();

    new_asteroid.sort(function(a, b) {
      if (
        a.is_potentially_hazardous_asteroid === true &&
        b.is_potentially_hazardous_asteroid === false
      ) {
        return -1;
      } else if (
        b.is_potentially_hazardous_asteroid === true &&
        a.is_potentially_hazardous_asteroid === false
      ) {
        return 1;
      } else if (
        a.estimated_diameter.kilometers.estimated_diameter_max >
        b.estimated_diameter.kilometers.estimated_diameter_max
      ) {
        return -1;
      } else {
        return 1;
      }
    });

    this.setState({ objects: new_asteroid });
  }

  reorder_by_dates() {
    let new_asteroid = this.state.objects.slice();

    new_asteroid.sort(function(a, b) {
      if (
        a.close_approach_data[0].close_approach_date <
        b.close_approach_data[0].close_approach_date
      ) {
        return -1;
      } else {
        return 1;
      }
    });

    this.setState({ objects: new_asteroid });
  }

  reorder_by_name() {
    let new_asteroid = this.state.objects.slice();

    new_asteroid.sort(function(a, b) {
      if (a.name < b.name) {
        return -1;
      } else {
        return 1;
      }
    });

    this.setState({ objects: new_asteroid });
  }

  render() {
    const items = this.state.objects.map(object => {
      return (
        <Item
          object={object}
          min_max_diameter={this.state.min_max_diameter}
          max_max_diameter={this.state.max_max_diameter}
          min_miss_distance={this.state.min_miss_distance}
          max_miss_distance={this.state.max_miss_distance}
        />
      );
    });

    const header_title =
      this.state.objects.length + " Asteroids Are Comming in Next 7 Days!";

    return (
      <div id="contentBody">
        <Header title={header_title} />
        <APODSection APOD={this.state.APOD} />

        <div className="body">
          <div className="items">
            <Labels
              date_onClick={() => this.reorder_by_dates()}
              dia_onClick={() => this.reorder_by_diameter()}
              miss_onClick={() => this.reorder_by_miss_distance()}
              haz_onClick={() => this.reorder_by_hazard()}
              name_onClick={() => this.reorder_by_name()}
            />
            {items}
          </div>
          <div className="bottom">
            <p className="claim">
              Claim: website owned by Qieer Zhang not Nasa.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
