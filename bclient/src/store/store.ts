import eventsSlice from './events/eventsSlice';
import userSlice from './user/userSlice';
import calendarSlice from './calendar/calendarSlice';
import modePreference from './modePreference/modePreferenceSlice';
import { combineReducers } from 'redux';

export default {
  calendar: calendarSlice,
  events: eventsSlice,
  user: userSlice,
  modes: combineReducers({ preference: modePreference }),
};
