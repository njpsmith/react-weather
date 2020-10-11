import {
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  UNRECOGNISED_LOCATION,
} from '../actions';

const initialState = {
  weather: {},
  error: '',
  unrecognisedLocationMessage: '',
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        error: false,
        unrecognisedLocationMessage: '',
        weather: action.payload,
      };
    case FETCH_WEATHER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        weather: {},
      };
    case UNRECOGNISED_LOCATION:
      return {
        ...state,
        unrecognisedLocationMessage: 'City not found! Please try again',
        weather: {},
      };
    default:
      return state;
  }
};

export default weatherReducer;
