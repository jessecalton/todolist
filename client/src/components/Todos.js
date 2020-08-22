import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const Todos = () => {
  const [todos, setTodos] = useState(null);

  const getTodos = async () => {
    try {
      const res = await axios.get('/api/todo');
      setTodos(res.data);
    } catch (error) {
      console.error(error.response.msg);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <Fragment>
      <h3>Current List: </h3>
      {todos !== null ? (
        <div className='flex-column'>
          {todos.map((item) => (
            <TodoItem
              key={item._id}
              action={item.action}
              date={item.date}
              timeline={item.timeline}
            />
          ))}
        </div>
      ) : null}
    </Fragment>
  );
};

export default Todos;
