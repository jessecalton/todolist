import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const TodoForm = (props) => {
  const [todoItem, setTodoItem] = useState({
    action: '',
    timeline: '',
  });

  const { action, timeline } = todoItem;
  const { addTodoItem } = props;

  const onChange = (e) => {
    setTodoItem({ ...todoItem, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setTodoItem({ action: '', timeline: '' });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addTodoItem(todoItem);
    resetForm();
  };

  return (
    <div className='TodoListForm'>
      <Form onSubmit={onSubmit}>
        <h2>Enter your next Todo:</h2>
        <Row>
          <Col>
            <Form.Control
              type='text'
              placeholder='Task'
              name='action'
              value={action}
              onChange={onChange}
            />
          </Col>
          <Col>
            <Form.Control
              type='text'
              placeholder='Due Date'
              name='timeline'
              value={timeline}
              onChange={onChange}
            />
          </Col>
        </Row>
        <Button variant='primary' type='submit' className='SubmitButton'>
          Submit
        </Button>
      </Form>
      {/* <form onSubmit={onSubmit}>
        <h2>Enter your next Todo:</h2>
        <input
          type='text'
          placeholder='Task'
          name='action'
          value={action}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Due Date'
          name='timeline'
          value={timeline}
          onChange={onChange}
        />
        <div>
          <input type='submit' />
        </div>
      </form> */}
    </div>
  );
};

export default TodoForm;
