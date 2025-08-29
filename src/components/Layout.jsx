import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { Box, Menu, MenuItem, Typography, IconButton } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
const drawerWidth = 240;

const Layout = () => {
  const [open, setOpen] = useState(true); // Sidebar state
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: theme.palette.background.default,
          transition: 'margin 0.3s ease',
        }}
      >
        {/* Header */}
        <Header
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        {/* Page Content */}
        <Outlet />
      </Box>
    </Box>
    </>
  );
};
export default Layout;