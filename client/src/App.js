import React from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import Todos from './components/Todos';

const App = () => {
  return (
    <div className='App'>
      <TodoForm />
      <Todos />
    </div>
  );
};

export default App;
