import React from 'react';
import Input from './Input';
import { Link } from 'react-router-dom'
import '../styles/login.css';

function Login(props) {
  return (
    <div className="login-form-container">
      <form action="Submit" method="post">
        <div className="form-title">
          <h2>Sign In</h2>
          <p>Please sign in to continue</p>
        </div>
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
        <label className="custom-checkbox">
          <Input type="checkbox" />
          <span className="checkmark"></span> Remember me
        </label>
        <button className="no-gap" type="submit">
          Sign In
        </button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
