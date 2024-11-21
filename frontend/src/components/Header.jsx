import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Avatar, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import "../styles/header.css";

import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNavigate = () => {
    navigate("/create_collection");
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("/logout");
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    handleMenuClose();
    navigate("/login");
  };

  return (
    <header className="header">
      <Button
        Icon={AddIcon}
        text="Create Collection"
        className="add-collection-btn"
        onClick={handleNavigate}
      />
      <div className="avatar-container">
        <Avatar className="user-avatar" onClick={handleAvatarClick} />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          className="dropdown-menu"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleLogout} className="dropdown-item">
            Logout
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
}

export default Header;
