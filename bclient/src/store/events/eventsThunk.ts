import { ThunkDispatchType } from '../index';
import { fetchEventById, fetchEvents } from '../../api/requests';
import { setEvent, setEvents } from './eventsSlice';

export const asyncGetEvents = async (dispatch): Promise<void> => {
  try {
    const { data } = await fetchEvents();

    if (data) {
      dispatch(setEvents(data.posts));
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const asyncGetEventById = async (dispatch, id: string): Promise<void> => {
  try {
    if (!id) {
      new Error('event id is undefined');
    }

    const { data } = await fetchEventById(id);

    if (data) {
      dispatch(setEvent(data.post));
    }
  } catch (e) {
    throw new Error(e);
  }
};
