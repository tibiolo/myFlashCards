import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Avatar } from '@mui/material';
import '../styles/header.css';

import Button from './Button';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/create_collection');
  };

  return (
    <header className="header">
      <Button
        Icon={AddIcon}
        text="Create Collection"
        className="add-collection-btn"
        onClick={handleNavigate}
      />
      <Avatar className="user-avatar" />
    </header>
  );
}

export default Header;
