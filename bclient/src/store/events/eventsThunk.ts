import { fetchEventById, fetchEvents } from '../../api/requests';
import { setEvent, setEvents } from './eventsSlice';
import { Event, ParametersType } from '../../types/types';

// EVENTS
export const asyncGetEvents = async (dispatch): Promise<void> => {
  try {
    const { data } = await fetchEvents();

    if (data) {
      dispatch(setEvents(data.posts));
    }
  } catch (e) {
    console.log(e);
  }
};

export const asyncGetEventsBlock = async (params: ParametersType): Promise<Event[] | undefined> => {
  function parse(props) {
    const inc = props.include;
    const ex = props.exclude;
    let newObj = { ...props };
    if (inc) {
      newObj = { ...newObj, include: JSON.stringify(inc) };
    }
    if (ex) {
      newObj = { ...newObj, exclude: JSON.stringify(ex) };
    }
    return newObj;
  }

  try {
    const { data } = await fetchEvents(parse(params));

    return data.posts;
  } catch (e) {
    console.log(e);
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
    console.log(e);
  }
};
