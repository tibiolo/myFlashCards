import React, { useState } from 'react';
import Input from './Input';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/sign_in_up.css';
import '../styles/form.css';

function Login(props) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      console.log(response)

      const result = await response.json();

      if (result.success) {
        // console.log('Success', result);
        navigate(result.redirect);
      } else {
        console.log(result.message || 'Login failed');
      }
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
