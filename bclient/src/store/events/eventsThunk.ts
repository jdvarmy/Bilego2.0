import { ThunkDispatchType, wrapper } from '../index';
import { fetchEventById, fetchEvents } from '../../api/requests';
import { setEvent, setEvents } from './eventsSlice';

export const getEventsServerSide = wrapper.getServerSideProps((store): any => async () => {
  const dispatch = store.dispatch as ThunkDispatchType;

  try {
    const { data } = await fetchEvents();
    dispatch(setEvents(data.posts));
  } catch (e) {
    console.log('ERROR', e);
  }
});

export const getEventByIdServerSide = wrapper.getServerSideProps((store): any => async ({ params }) => {
  const dispatch = store.dispatch as ThunkDispatchType;

  try {
    const { data } = await fetchEventById(params.id);
    dispatch(setEvent(data.post));
  } catch (e) {
    console.log('ERROR', e);
  }
});
