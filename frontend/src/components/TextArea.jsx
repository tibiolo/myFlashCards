import React from 'react';

function TextArea(props) {
  return (
    <textarea
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      required={props.required}
    />
  );
}

export default TextArea;
