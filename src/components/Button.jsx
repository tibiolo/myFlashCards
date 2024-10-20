import React from 'react';

function Button({ text, Icon, className, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      {<Icon />}
      {text}
    </button>
  );
}

export default Button;
