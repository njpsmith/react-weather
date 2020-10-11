import { bake_cookie } from 'sfcookies';

// export const FETCH_WEATHER = 'FETCH_WEATHER';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';
export const UNRECOGNISED_LOCATION = 'UNRECOGNISED_LOCATION';

const api = {
  key: 'c465a83c6aca8c14fd0393456a386e7f',
  baseApiURL: 'https://api.openweathermap.org/data/2.5/',
};

export const fetchWeather = (locationQuery) => {
  return (dispatch) => {
    const apiString = `${api.baseApiURL}weather?q=${locationQuery}&units=metric&APPID=${api.key}`;

    return fetch(apiString)
      .then((res) => res.json())
      .then((json) => {
        if (json.cod === '404') {
          dispatch(unrecognisedLocation());
        } else {
          // No error
          dispatch(fetchWeatherSuccess(json));
          bake_cookie('lastSearchedLocationCookie', json);
        }
        return json;
      })
      .catch((error) => dispatch(fetchWeatherFailure(error)));
  };
};

export const fetchWeatherSuccess = (weather) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: weather,
});

export const fetchWeatherFailure = (error) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error,
});

export const unrecognisedLocation = () => ({
  type: UNRECOGNISED_LOCATION,
});

export const setWeatherFromCookie = (weather) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: weather,
});
