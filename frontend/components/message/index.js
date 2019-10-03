import PropTypes from 'prop-types';
import React from 'react';

const Message = ({ title, children }) => {
  return (
    <div className="ui error message custom-message">
      <div className="content">
        <div className="header">{title}</div>
        {children}
      </div>
    </div>
  );
}

Message.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}

export default Message;
