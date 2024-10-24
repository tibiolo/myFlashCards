import React from 'react';
import { useState } from 'react';

function Input(props) {
  return (
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      autoComplete={props.autocomplete}
      required={props.required}
    />
  );
}

export default Input;
