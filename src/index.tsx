import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { sapienLight } from './themes';
// import { sapienDark } from './themes';
import './themes/open-sans';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { Provider } from 'react-redux';
import { Reducer } from './redux/reducers';
import { configureStore } from '@reduxjs/toolkit';

const container = document.getElementById('root');
if (!container) throw new Error('Root Element was not found in the DOM');

const store = configureStore({ reducer: Reducer() });

const root = ReactDOMClient.createRoot(container);

root.render(
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={createTheme(sapienLight)}>
            <Provider store={store}>
                <BrowserRouter>
                    <CssBaseline />
                    <App />
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    </StyledEngineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
