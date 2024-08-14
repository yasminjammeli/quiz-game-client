
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './redux/store';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="65518810222-rjb0clgf1lnfqpc556n89288616dj7ce.apps.googleusercontent.com">
      <Provider store={store}>
          <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
