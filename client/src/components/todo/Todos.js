import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

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

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`api/todo/${id}`);
      if (res.data) {
        getTodos();
      }
    } catch (error) {
      console.error(error.response.msg);
    }
  };

  const addTodoItem = async (newItem) => {
    try {
      const res = await axios.post('/api/todo', newItem);
      if (res.data) {
        getTodos();
      }
    } catch (error) {
      console.error(error.response.msg);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <Fragment>
      <TodoForm addTodoItem={addTodoItem} />
      <h3>Current List: </h3>
      {todos !== null ? (
        <div className='TodoListItem'>
          {todos.map((item) => (
            <TodoItem
              key={item._id}
              action={item.action}
              date={item.date}
              timeline={item.timeline}
              deleteItem={() => deleteItem(item._id)}
            />
          ))}
        </div>
      ) : null}
    </Fragment>
  );
};

export default Todos;
