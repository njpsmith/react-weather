import React from 'react';

import cloudsIcon from '../assets/clouds.svg';
import rainIcon from '../assets/rain.svg';
import clearIcon from '../assets/sun.svg';
import snowIcon from '../assets/snowflakes.svg';

class WeatherIcons extends React.Component {
  state = {
    animating: false,
    locationName: this.props.weather.name,
  };

  componentDidUpdate() {
    if (this.props.weather.name !== this.state.locationName) {
      this.setState(
        {
          locationName: this.props.weather.name,
          animating: true,
        },
        () => {
          setTimeout(() => {
            this.setState({ animating: false });
          }, 700);
        }
      );
    }
  }

  renderWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case 'Clouds':
        return (
          <div className="weather-icon">
            <img
              src={cloudsIcon}
              alt="weather icon"
              className={this.state.animating ? 'bounce-in' : ''}
            />
          </div>
        );
      case 'Rain':
        return (
          <div className="weather-icon">
            <img
              src={rainIcon}
              alt="weather icon"
              className={this.state.animating ? 'bounce-in' : ''}
            />
          </div>
        );
      case 'Clear':
        return (
          <div className="weather-icon">
            <img
              src={clearIcon}
              alt="weather icon"
              className={this.state.animating ? 'bounce-in' : ''}
            />
          </div>
        );
      case 'Snow':
        return (
          <div className="weather-icon">
            <img
              src={snowIcon}
              alt="weather icon"
              className={this.state.animating ? 'bounce-in' : ''}
            />
          </div>
        );
      default:
        return (
          <div className="weather-icon">
            <img
              src={clearIcon}
              alt="weather icon"
              className={this.state.animating ? 'bounce-in' : ''}
            />
          </div>
        );
    }
  };

  render() {
    return (
      <div className="weather-icons">
        {this.renderWeatherIcon(this.props.weather.weather[0].main)}
      </div>
    );
  }
}

export default WeatherIcons;
