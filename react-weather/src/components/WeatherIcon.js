import React from 'react';

import cloudsIcon from '../assets/clouds.svg';
import rainIcon from '../assets/rain.svg';
import clearIcon from '../assets/sun.svg';
import snowIcon from '../assets/snowflakes.svg';

class WeatherIcon extends React.Component {
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

  toggleAnimating = () => {
    this.setState((prevState) => {
      return { animating: !prevState.animating };
    });
  };

  getWeatherIcon = (weatherType) => {
    let weatherIcon = '';

    switch (weatherType) {
      case 'Clouds':
        weatherIcon = cloudsIcon;
        break;
      case 'Rain':
        weatherIcon = rainIcon;
        break;
      case 'Clear':
        weatherIcon = clearIcon;
        break;
      case 'Snow':
        weatherIcon = snowIcon;
        break;
      default:
        weatherIcon = '';
        break;
    }
    return weatherIcon;
  };

  render() {
    return (
      <div className="weather-icon">
        <img
          src={this.getWeatherIcon(this.props.weather.weather[0].main)}
          alt="weather icon"
          className={this.state.animating ? 'bounce-in' : ''}
          onClick={this.toggleAnimating}
        />
      </div>
    );
  }
}

export default WeatherIcon;
