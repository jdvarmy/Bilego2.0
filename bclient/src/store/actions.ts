import { eventActionsClient } from './events/eventsSlice';
import { userActionsClient } from './user/userSlice';
import { AppActions } from '../types/enums';

const ActionCreators = {
  [AppActions.events]: { ...eventActionsClient },
  [AppActions.user]: { ...userActionsClient },
};

export default ActionCreators;
