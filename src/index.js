import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './utils/redux/store/store';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                <App />
            </GoogleOAuthProvider>
            <Toaster />
        </Provider>
    </BrowserRouter>
);
