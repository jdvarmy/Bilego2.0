import { fetchEventById, fetchEvents, fetchEventsBlock } from '../../api/requests';
import { setEvent, setEvents } from './eventsSlice';
import { EventsBlockProps } from '../../components/Blocks/EventsBlock';

// EVENTS
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

export const asyncGetEventsBlock = async (params: EventsBlockProps['parameters']): Promise<Event[]> => {
  try {
    const { data } = await fetchEventsBlock(params);

    console.log(data);

    return [] as Event[];
  } catch (e) {
    throw new Error(e);
  }
};

// ONE EVENT
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
