import React from 'react';
import Input from './Input';
import '../styles/login.css';

function Login(props) {
  return (
    <div className="login-form-container">
      <form action="Submit" method="post">
        <h2>Sign In</h2>
        <Input
          type={'email'}
          name={'email'}
          placeholder={'Email'}
          autocomplete={'email'}
        />
        <Input
          type={'password'}
          name={'password'}
          placeholder={'Password'}
          autocomplete={'current-password'}
        />
        <label class="custom-checkbox">
          <Input type="checkbox" />
          <span class="checkmark"></span> Remember me
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
