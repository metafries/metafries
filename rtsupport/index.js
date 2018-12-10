import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './components/App.jsx';
import Menu from './components/Menu.jsx';
import { configureStore } from './app/store/configureStore.js'

const store = configureStore()

let alerter = require('./alerter');
alerter('viva nuts!');

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('events')
);
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Menu />
        </BrowserRouter>
    </Provider>,
    document.getElementById('navbar')
);