import React, { useState } from 'react';
import Header from './Header';
import Input from './Input';
import Button from './Button';
import AddIcon from '@mui/icons-material/Add';

import axios from 'axios';

import '../styles/create_collection.css';
import '../styles/form.css';
import { useNavigate } from 'react-router-dom';

function CreateCollection() {
  const [collectionName, SetCollectionName] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    SetCollectionName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/create_collection',
        { collectionName },
        { withCredentials: true } // Include cookies
      );

      if (response.data.success) {
        navigate(response.data.redirect);
      } else {
        console.log(response.data.message || 'Action Failed!');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <>
      <Header />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-title">
            <h2>Create Collection</h2>
            <p>Create new flashcard collections</p>
          </div>
          <Input
            type={'text'}
            name={'collectionName'}
            value={collectionName}
            onChange={handleChange}
            placeholder={'New Collection Name'}
          />
          <Button className="" text="Create" type="submit" Icon={AddIcon} />
        </form>
      </div>
    </>
  );
}

export default CreateCollection;
