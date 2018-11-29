import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App.jsx';
import Menu from './components/Menu.jsx';

let alerter = require('./alerter');
alerter('viva nuts!');

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('events')
);
ReactDOM.render(
    <BrowserRouter>
        <Menu />
    </BrowserRouter>,
    document.getElementById('navbar')
);