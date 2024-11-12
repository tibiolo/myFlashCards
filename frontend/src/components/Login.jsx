import React, { useState } from 'react';
import Input from './Input';
import { Link } from 'react-router-dom';
import '../styles/sign_in_up.css';
import '../styles/form.css';

function Login(props) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      console.log('Success', result);
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-title">
          <h2>Sign In</h2>
          <p>Please sign in to continue</p>
        </div>
        <Input
          type={'email'}
          name={'email'}
          value={formData.email}
          onChange={handleChange}
          placeholder={'Email'}
          autocomplete={'email'}
          required
        />
        <Input
          type={'password'}
          name={'password'}
          value={formData.password}
          onChange={handleChange}
          placeholder={'Password'}
          autocomplete={'current-password'}
          required
        />
        <label className="custom-checkbox">
          <Input type="checkbox" name={'checkbox'} />
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
