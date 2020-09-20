import React from 'react';

const Errors = ({ errors }) => {
  return (
    <div className='text-danger'>
      <h3>{errors}</h3>
    </div>
  );
};

export default Errors;
