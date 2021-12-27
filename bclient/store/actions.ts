import { eventActions } from './events/eventsSlice';
import { AppActions } from '../types/enums';

export default {
  [AppActions.events]: { ...eventActions },
};
