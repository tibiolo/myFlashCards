import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/dashboard.css';
import '../styles/collection.css';

import Header from './Header';
import Collection from './Collection';


function Dashboard() {
  const [collections, setCollections] = useState([]);

  const navigate = useNavigate();

  const fetchCollections = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/fetch/collections',
        {
          withCredentials: true,
        }
      );

      if (response) {
        console.log('Sucessfully fetched collections', response.data.result);
        setCollections(response.data.result);
      } else {
        console.log('Failed to fetch collections');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleClick = async (target_id) => {
    const collection_id = target_id;

    try {
      const response = await axios.get(
        `http://localhost:3000/fetch/collection/${collection_id}`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {}
  };

  return (
    <div className="dashboard">
      <Header />
      <main className="content-container">
        <div className="collection-container">
          {collections.length > 0 ? (
            collections.map((collection, index) => (
              <Collection
                key={index}
                id={collection.collection_id}
                title={collection.name}
                description={collection.description}
                onClick={() => handleClick(collection.collection_id)}
              />
            ))
          ) : (
            <p>Error no collections found</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
