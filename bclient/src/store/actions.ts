import { eventActionsClient } from './events/eventsSlice';
import { AppActions } from '../types/enums';

const ActionCreators = {
  [AppActions.events]: { ...eventActionsClient },
};

export default ActionCreators;
