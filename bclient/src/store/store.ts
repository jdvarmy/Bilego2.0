import eventsSlice from './events/eventsSlice';
import userSlice from './user/userSlice';
import calendarSlice from './calendar/calendarSlice';

export default {
  calendar: calendarSlice,
  events: eventsSlice,
  user: userSlice,
};
