import { combineReducers } from 'redux';
import eventsSlice from './events/eventsSlice';
import userSlice from './user/userSlice';
import sliderSlice from './slider/sliderSlice';
import calendarSlice from './calendar/calendarSlice';
import modePreferenceSlice from './modePreference/modePreferenceSlice';
import taxonomySlice from './taxonomy/taxonomySlice';
import globalSlice from './global/globalSlice';

export default {
  global: globalSlice,
  calendar: calendarSlice,
  events: eventsSlice,
  user: userSlice,
  taxonomy: taxonomySlice,
  slider: sliderSlice,
  modes: combineReducers({ preference: modePreferenceSlice }),
};
