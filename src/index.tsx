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
import "./styles/shopify.css";

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { store } from './store';

import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import { provider } from 'web3-core';



// import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'

// const apolloClient = new ApolloClient({
//     cache: new InMemoryCache(),
//     link: new HttpLink({
//       uri: `https://sapieneleven.myshopify.com/api/2022-07/graphql.json`,
//       headers: {
//         'X-Shopify-Storefront-Access-Token':
//           '9547fd62fddd7362c2b140dead2e0e68',
//         //   'Content-Type' : 'application/graphql',
           
//       },
//       fetch,
//     }),
//   })
function getLibrary(provider: provider) {
    return new Web3(provider)
}

const container = document.getElementById('root');
if (!container) throw new Error('Root Element was not found in the DOM');

// const store = configureStore({ reducer: Reducer() });

const root = ReactDOMClient.createRoot(container);

root.render(
    // <ApolloProvider client={apolloClient}>

    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={createTheme(sapienLight)}>
            <Provider store={store}>
                <Web3ReactProvider getLibrary={getLibrary}>
                    <BrowserRouter>
                        <CssBaseline />
                        <App />
                    </BrowserRouter>
                </Web3ReactProvider>
            </Provider>
        </ThemeProvider>
    </StyledEngineProvider>
    // </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
