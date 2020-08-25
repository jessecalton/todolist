import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Todos from './components/todo/Todos';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Todos} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
