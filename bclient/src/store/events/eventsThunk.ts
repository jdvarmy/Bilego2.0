import { ThunkDispatchType, wrapper } from '../index';
import { fetchEventById, fetchEvents } from '../../api/requests';
import { setEvent, setEvents } from './eventsSlice';

export const getEventsServerSide = wrapper.getServerSideProps((store): any => async () => {
  const dispatch = store.dispatch as ThunkDispatchType;

  try {
    const { data } = await fetchEvents();

    if (data) {
      dispatch(setEvents(data.posts));
    }
  } catch (e) {
    console.log('getEventsServerSide', e);
  }
});

export const getEventByIdServerSide = wrapper.getServerSideProps((store): any => async ({ params }) => {
  const dispatch = store.dispatch as ThunkDispatchType;

  try {
    const { data } = await fetchEventById(params.id);

    if (data) {
      dispatch(setEvent(data.post));
    }
  } catch (e) {
    console.log('getEventByIdServerSide', e);
  }
});
