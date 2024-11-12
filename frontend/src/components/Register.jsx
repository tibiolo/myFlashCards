import React from 'react';
import Input from './Input';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/sign_in_up.css';
import '../styles/form.css';

function Register(props) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/register', {
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
          <h2>Sign Up</h2>
          <p>Please sign up to continue</p>
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
        <Input
          type={'password'}
          name={'confirmPassword'}
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder={'Confirm password'}
          required
        />
        <label className="custom-checkbox">
          {/* Need to add state and passing to backend */}
          <Input type="checkbox" name={"checkbox"} />
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
