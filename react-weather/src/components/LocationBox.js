import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

import Zoom from 'react-reveal/Zoom';
import WeatherIcon from './WeatherIcon';

const LocationBox = ({ weather }) => {
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

  return (
    <div>
      {typeof weather.main != 'undefined' ? (
        <div>
          <ScrollAnimation animateIn="fadeInDown">
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
          </ScrollAnimation>
          <Zoom>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>

              <WeatherIcon weather={weather} />

              <div className="sunrise-sunset">
                Sunrise: {convertUnixToTime(weather.sys.sunrise)}am GMT
              </div>
              <div className="sunrise-sunset">
                Sunrise: {convertUnixToTime(weather.sys.sunset)}pm GMT
              </div>
            </div>
          </Zoom>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default LocationBox;
