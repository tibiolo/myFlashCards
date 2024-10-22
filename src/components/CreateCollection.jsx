import React from 'react';
import Header from './Header';

import '../styles/create_collection.css';
import '../styles/form.css';

function CreateCollection() {
  return (
    <>
      <Header />
      <div className="form-container">
        <form action="/create_collection"></form>
      </div>
    </>
  );
}

export default CreateCollection;
