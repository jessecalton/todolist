import React from 'react';

const TodoItem = (props) => {
  const { action, timeline, date, deleteItem } = props;
  const formattedDate = new Date(date).toLocaleString();

  return (
    <div className='todoList'>
      <h3>
        <span className='task'>Task: </span>
        <span className='desc'>{action}</span>
      </h3>
      <h3>
        <span className='task'>Due: </span>
        {timeline}
      </h3>
      <h3>
        <span className='task'>Added: </span>
        {formattedDate}
      </h3>
      <button onClick={deleteItem}>Complete</button>
    </div>
  );
};

export default TodoItem;
