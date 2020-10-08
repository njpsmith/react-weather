import React, { useState, useEffect } from 'react';
import { read_cookie, bake_cookie } from 'sfcookies';

import LocationBox from './components/LocationBox';
import Footer from './components/Footer';
import ErrorMessage from './components/ErrorMessage';

import spyglassIcon from './assets/spyglass.svg';

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

        <LocationBox weather={weather} />

        <ErrorMessage error={error} />

        <Footer />
      </main>
    </div>
  );
}

export default App;
