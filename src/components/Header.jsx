import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar'; 
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';;
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth 

function Header({ adminName, open, handleDrawerOpen, handleDrawerClose }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchExpanded, setSearchExpanded] = useState(false); // Keep local state for search input
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const navigate = useNavigate(); // Get navigate function
  // Profile Menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
    handleMenuClose();
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const { user } = useAuth(); // Get user from AuthContext

  // Profile Menu UI
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
   {/* Navigate to /profile */}
 <MenuItem onClick={() => {
        handleMenuClose();
        navigate('/admin/profile');}}>My Profile</MenuItem>
      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, borderRadius: 0, }}>
        <Toolbar>
          {/* Left: Sidebar Toggle + Welcome Text */}
          <>
            {open ? (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="close drawer"
                onClick={handleDrawerClose}
                sx={{ mr: 2 }}
              >
                <ChevronLeftIcon />
              </IconButton>
            ) : (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

          </>
           <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {user && user.email ? `Welcome, ${user.email.split('@')[0]}` : 'Welcome'}
        </Typography>
          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Center/Right: Search + DarkMode + Notifications + Profile */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Search Box */}
            <InputBase
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                color: 'inherit',
                borderRadius: 2,
                pl: 1,
                transition: 'width 0.3s',
                width: searchExpanded ? 250 : 150,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
              }}
              placeholder="Search..."
              onFocus={() => setSearchExpanded(true)}
              onBlur={() => setSearchExpanded(false)}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(255,255,255,0.6)' }} />
                </InputAdornment>
              }
            />

            {/* Theme Toggle */}
            

            {/* Notifications */}
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>

            {/* Profile */}
            <IconButton color="inherit" onClick={handleProfileMenuOpen}>
              <Avatar alt="Profile Picture" src="/path/to/your/avatar.png" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openLogoutDialog}
        onClose={handleCloseLogoutDialog}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog}>Cancel</Button>
          <Button onClick={() => {
            handleCloseLogoutDialog();
            navigate('/');
          }} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Header;
