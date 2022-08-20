import React from 'react';
import ReactDOM from 'react-dom/client';
import { index } from './store';
import { Provider } from 'react-redux'
import App from './components/App/App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={index}>
      <App />
    </Provider>
  </React.StrictMode>
);
