import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Avatar } from '@mui/material';
import '../styles/header.css'

import Button from './Button';


function Header() {
  return (
    <header className="header">
      <Button Icon={AddIcon} text="Add Collection" className="add-collection-btn" />
      <Avatar className="user-avatar" />
    </header>
  );
}

export default Header;
