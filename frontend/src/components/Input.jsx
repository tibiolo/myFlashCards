import React from 'react';
import { useState } from 'react';

function Input(props) {
  return (
    <input
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      autoComplete={props.autocomplete}
    />
  );
}

export default Input;
