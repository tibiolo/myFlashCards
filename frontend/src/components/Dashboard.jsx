import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/dashboard.css';
import '../styles/collection.css';

import Header from './Header';
import Collection from './Collection';

function Dashboard() {
  const fetchCollections = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/fetch/collections',
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log(response)
        console.log('Sucessfully fetched collections', response.data.result);
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

  return (
    <div className="dashboard">
      <Header />
      <main className="content-container">
        <div className="collection-container">
          <Collection
            title={'Test Collection'}
            description={
              'Lore dsfbnpsdfb psdfbpsdbf sdf  dfsdfuspd a sfupasfuas  asugbpauifgpas sdadasdsad adsasdaf ggrss   asfasfafsa  asfasfasf '
            }
            onClick={''}
          />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
