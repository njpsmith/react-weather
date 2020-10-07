import React, { useState, useEffect } from 'react';
import { read_cookie, bake_cookie } from 'sfcookies';

import spyglassIcon from './assets/spyglass.svg';
import cloudsIcon from './assets/clouds.svg';
import rainIcon from './assets/rain.svg';
import clearIcon from './assets/sun.svg';
import snowIcon from './assets/snowflakes.svg';

const api = {
  key: 'c465a83c6aca8c14fd0393456a386e7f',
  baseApiURL: 'https://api.openweathermap.org/data/2.5/',
};

const lastSearchedLocationCookie = 'lastSearchedLocationCookie';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const lastSearchedLocation = read_cookie(lastSearchedLocationCookie);
    setWeather(lastSearchedLocation);
  }, []);

  const searchWeather = (e) => {
    e.preventDefault();

    if (query !== '') {
      fetch(`${api.baseApiURL}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.cod === '404') {
            setError('City not found! Please try again');
            setWeather({});
          } else {
            // No error
            setError('');
            setQuery('');
            setWeather(result);
            bake_cookie(lastSearchedLocationCookie, result);
            console.log('result', result);
          }
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month}, ${year}`;
  };

  const convertUnixToTime = (unixTimestamp) => {
    let unix_timestamp = unixTimestamp;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = '0' + date.getMinutes();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2);

    return formattedTime;
  };

  const getWeatherIcon = (weatherType) => {
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

  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 16
            ? 'app warm'
            : 'app'
          : 'app'
      }
    >
      <main>
        <div className="search-box">
          <form onSubmit={searchWeather}>
            <input
              type="texr"
              className="search-bar"
              placeholder="Search city..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <img alt="Search" src={spyglassIcon} onClick={searchWeather} />
          </form>
        </div>

        {typeof weather.main != 'undefined' ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="weather-icon">
                <img
                  src={getWeatherIcon(weather.weather[0].main)}
                  alt="weather icon"
                />
              </div>
              <div className="sunrise-sunset">
                Sunrise: {convertUnixToTime(weather.sys.sunrise)}am
              </div>
              <div className="sunrise-sunset">
                Sunrise: {convertUnixToTime(weather.sys.sunset)}pm
              </div>
            </div>
          </div>
        ) : (
          ''
        )}

        {error !== '' ? <div className="error-message">{error}</div> : null}

        <footer>
          <hr />
          <p>Weather app created by Nicholas Smith</p>
          <p>
            You can find the code for this project on Github{' '}
            <a
              href="https://github.com/njpsmith/react-weather"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
          </p>
          <p>
            Find me on LinkedIn{' '}
            <a
              href="https://www.linkedin.com/in/nicholas-smith-97a90829/"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
