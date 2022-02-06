import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import TicketLayout from './TicketLayout';

function App() {
  return (
    <Provider store={store}>
      <TicketLayout />
    </Provider>
  );
}

export default App;
