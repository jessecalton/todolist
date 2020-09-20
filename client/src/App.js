import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Todos from './components/todo/Todos';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NavBar from './layout/NavBar';
import PrivateRoute from './components/routing/PrivateRoute';
import AuthState from './context/auth/authState';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <AuthState>
      <Router>
        <div className='App'>
          <NavBar />
          <Switch>
            <PrivateRoute exact path='/' component={Todos} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </div>
      </Router>
    </AuthState>
  );
};

export default App;
