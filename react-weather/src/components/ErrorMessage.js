import React from 'react';

const ErrorMessage = (props) => {
  return (
    <div>
      {props.error !== '' ? (
        <div className="error-message">{props.error}</div>
      ) : null}
    </div>
  );
};

export default ErrorMessage;
