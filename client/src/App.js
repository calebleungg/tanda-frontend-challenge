import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './assets/stylesheets/App.scss';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/DashboardPage';
import AccountPage from './pages/AccountPage';


const App = () => {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={(props) => <Dashboard {...props} />} />
          <Route path="/login" exact component={(props) => <LoginPage {...props} />} />
          <Route path="/signup" exact component={(props) => <SignupPage {...props} />} />
          <Route path="/account" exact component={(props) => <AccountPage {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
