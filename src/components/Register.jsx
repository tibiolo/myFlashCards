import React from 'react';
import Input from './Input';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/sign_in_up.css';

function Register(props) {
  return (
    <div className="sign-in-up-container">
      <form action="Submit" method="post">
        <div className="form-title">
          <h2>Sign Up</h2>
          <p>Please sign up to continue</p>
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
        <Input
          type={'password'}
          name={'confirmPassword'}
          placeholder={'Confirm password'}
        />
        <label className="custom-checkbox">
          <Input type="checkbox" />
          <span className="checkmark"></span> I agree to the Terms & Conditons
        </label>
        <button className="no-gap" type="submit">
          Sign up
        </button>
        <p>
          Already have an account? <Link to={'/login'}>Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
