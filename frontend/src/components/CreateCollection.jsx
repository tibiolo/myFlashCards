import React, { useState } from 'react';
import Header from './Header';
import Input from './Input';
import TextArea from './textArea';
import Button from './Button';
import AddIcon from '@mui/icons-material/Add';

import axios from 'axios';

import '../styles/create_collection.css';
import '../styles/form.css';
import { useNavigate } from 'react-router-dom';

function CreateCollection() {
  const [collectionData, SetCollectionData] = useState({
    collectionName: '',
    collectionDescription: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    SetCollectionData({
      ...collectionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/create_collection',
        { collectionData },
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
            value={collectionData.collectionName}
            onChange={handleChange}
            placeholder={'New Collection Name'}
          />
          <TextArea
            name={'collectionDescription'}
            value={collectionData.collectionDescription}
            onChange={handleChange}
            placeholder={'Collection Description'}
          />
          <Button className="" text="Create" type="submit" Icon={AddIcon} />
        </form>
      </div>
    </>
  );
}

export default CreateCollection;
