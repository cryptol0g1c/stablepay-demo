import PropTypes from 'prop-types';
import React from 'react';

const Box = ({ children, title }) => {
  return (
    <div className='box'>
      <h3 className='title'>
        {title}
      </h3>
      {children}
    </div>
  );
}

Box.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
};

export default Box;
