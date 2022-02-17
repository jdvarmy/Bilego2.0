import { useEffect } from 'react';
import { NextMessageEventClient } from '../typings/types';
import { setApplicationStatus } from '../store/optionsSlice/optionsSlice';
import { ApplicationStatuses } from '../typings/enum';
import { fetchTickets } from '../store/ticketsSlice/ticketsThunk';
import { useDispatch } from 'react-redux';

export function usePostMessageListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const messageHandler = (e: MessageEvent) => {
      if (`${e.origin}/` !== process.env.REACT_APP_CLIENT_APP_API_ROOT) {
        return;
      }

      const data: NextMessageEventClient = typeof e.data === 'string' && JSON.parse(e.data);

      if (data.slug) {
        dispatch(setApplicationStatus(ApplicationStatuses.loading));
        dispatch(fetchTickets({ slug: data.slug }));
      }
    };

    window.addEventListener('message', messageHandler);
    if (window.parent.length && process.env.REACT_APP_CLIENT_APP_API_ROOT) {
      window.parent.postMessage('App ready', process.env.REACT_APP_CLIENT_APP_API_ROOT);
    }

    return () => window.removeEventListener('message', messageHandler);
  }, [dispatch]);
}
