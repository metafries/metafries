import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Menu from './components/Menu.jsx';

let alerter = require('./alerter');
alerter('viva nuts!');

ReactDOM.render(
    <App />,
    document.getElementById('events')
);
ReactDOM.render(
    <Menu />,
    document.getElementById('navbar')
);