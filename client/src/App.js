import React from 'react';
import './App.css';
import Todos from './components/Todos';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className='App'>
      <Todos />
    </div>
  );
};

export default App;
