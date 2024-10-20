import React from 'react';
import {Button, } from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Avatar } from '@mui/material';
import '../styles/header.css'

function Header() {
  return (
    <header className="header">
      <Button variant="contained"><AddIcon/> New Collection</Button>
      <Avatar className="user-avatar" />
    </header>
  );
}

export default Header;
