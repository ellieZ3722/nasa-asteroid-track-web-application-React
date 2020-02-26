import React, { Component } from "react";

class APODSection extends Component {
  render() {
    if (!this.props.APOD) {
      return null;
    }

    if (this.props.APOD.media_type === "video") {
      const videourl = this.props.APOD.url;
      const title = this.props.APOD.title;
      const explanation = this.props.APOD.explanation;

      return (
        <div className="APOD">
          <iframe src={videourl} />
          <div className="APOD-text-video">
            <div className="APOD-title">{title}</div>
            <div className="APOD-description">{explanation}</div>
          </div>
        </div>
      );
    } else {
      const imageurl = this.props.APOD.url;
      const title = this.props.APOD.title;
      const explanation = this.props.APOD.explanation;

      return (
        <div className="APOD">
          <img className="APOD_img" src={imageurl} />
          <div className="APOD-text-img">
            <div className="APOD-title">{title}</div>
            <div className="APOD-description">{explanation}</div>
          </div>
        </div>
      );
    }
  }
}

export default APODSection;
