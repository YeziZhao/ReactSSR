/*eslint-disable no-console */
/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render, hydrate } from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import routes from 'common/routes';
import { Provider } from 'react-redux';
import configureStore from 'common/store/configureStore';

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
// let renderMethod = module.hot ? render: hydrate;
render(
    <Provider store={store}>
        <BrowserRouter children={routes} />
    </Provider>,
    document.getElementById('app')
);