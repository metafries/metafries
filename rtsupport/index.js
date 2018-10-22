import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

let alerter = require('./alerter');
alerter('viva nuts!');

ReactDOM.render(
    <App />,
    document.getElementById('rtsupport')
);