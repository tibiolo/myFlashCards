import React from 'react';
import { Avatar } from '@mui/material';
import '../styles/header.css'

function Header() {
  return (
    <header className="header">
      <Avatar className="user-avatar" />
    </header>
  );
}

export default Header;
