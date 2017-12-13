import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory} from 'react-router'
import './index.css';
import App from './App';
import Login from './login';
import Profile from './profile';
import Dashboard from './dashboard';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/login" component={Login} />
    <Route path="/profile" component={Profile} />
    <Route path="/dashboard" component={Dashboard} />
  </Router>

), document.getElementById('root'));
registerServiceWorker();