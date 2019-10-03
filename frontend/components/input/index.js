import PropTypes from 'prop-types';
import React from 'react';

const Input = ({ prefix, value, icon }) => {
  let className = `ui labeled input input-margin ${icon && 'right icon'}`;

  return (
    <div className={className}>
      <div className="ui basic label">{prefix}</div>
      <input type='text' value={value} readOnly/>
      {
        icon && <i aria-hidden='true' className={icon}></i>
      }
    </div>
  );
}

Input.propTypes = {
  prefix: PropTypes.string,
  value: PropTypes.any,
  icon: PropTypes.string
}

export default Input;
