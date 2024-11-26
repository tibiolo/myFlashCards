import React, { useState } from 'react';
import Header from './Header';
import Input from './Input';
import Button from './Button';
import AddIcon from '@mui/icons-material/Add';

import axios from 'axios';

import '../styles/create_collection.css';
import '../styles/form.css';

function CreateCollection() {
  const [collectionName, SetCollectionName] = useState('');

  const handleChange = (e) => {
    SetCollectionName({
      ...SetCollectionName,
      [e.target.name]: e.target.value,
    });
  };

  const response = axios.post("/create_collection", )

  return (
    <>
      <Header />
      <div className="form-container">
        <form action="/create_collection">
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
