import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { read_cookie } from 'sfcookies';

import { fetchWeather, setWeatherFromCookie } from './actions';

import LocationBox from './components/LocationBox';
import Footer from './components/Footer';
import ErrorMessage from './components/ErrorMessage';

import spyglassIcon from './assets/spyglass.svg';

// Find out where it's raining right now: https://www.rainviewer.com/map.html

const App = (props) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const lastSearchedLocation = read_cookie('lastSearchedLocationCookie');
    props.setWeatherFromCookie(lastSearchedLocation);
  }, []);

  const searchWeather = (e) => {
    e.preventDefault();

    if (query !== '') {
      setQuery('');
      props.fetchWeather(query);
    }
  };

  return (
    <div
      className={
        typeof props.weather.main != 'undefined'
          ? props.weather.main.temp > 16
            ? 'app warm'
            : 'app'
          : 'app'
      }
    >
      <main>
        <div className="search-box">
          <form onSubmit={searchWeather}>
            <input
              type="text"
              className="search-bar"
              placeholder="Search city..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <img alt="Search" src={spyglassIcon} onClick={searchWeather} />
          </form>
        </div>

        <LocationBox />

        <ErrorMessage error={props.unrecognisedLocationMessage} />

        <Footer />
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    weather: state.weatherReducer.weather,
    unrecognisedLocationMessage:
      state.weatherReducer.unrecognisedLocationMessage,
  };
};

const mapDispatchToProps = {
  fetchWeather: fetchWeather,
  setWeatherFromCookie: setWeatherFromCookie,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
