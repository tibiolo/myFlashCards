import React from 'react';

function Button({ text, type, Icon, className, onClick }) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {Icon && <Icon />}
      {text}
    </button>
  );
}

export default Button;
