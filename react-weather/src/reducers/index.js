import { combineReducers } from 'redux';

import weatherReducer from './weather-reducer';

const allReducers = combineReducers({
  weatherReducer: weatherReducer,
});

export default allReducers;
