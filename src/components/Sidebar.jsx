import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import {
  Box,
  Drawer,
  Divider,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  Inventory as InventoryIcon,
  Description as DescriptionIcon,
  Receipt as ReceiptIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Store as StoreIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const ProfileDropdown = forwardRef(({ open, navigate }, ref) => {
  const theme = useTheme();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const profileMenuItems = [
    { text: 'My Profile', path: '/admin/profile' },
    { text: 'Settings', path: '/admin/settings' },
  ];

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  useImperativeHandle(ref, () => ({
    handleMenuOpen,
  }));

  return (
    <>
      <Box
        sx={{
          mt: 'auto',
          p: open ? 2 : 1,
          display: 'flex',
          alignItems: 'center',
          borderTop: `1px solid ${theme.palette.divider}`,
          cursor: 'pointer',
          justifyContent: open ? 'flex-start' : 'center',
        }}
        onClick={handleMenuOpen}
      >
        <Tooltip title="Profile" disableHoverListener={open}>
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 1 : 'auto',
              justifyContent: 'center',
            }}
          >
            <AccountCircleIcon
              sx={{
                color:
                  location.pathname === '/admin/profile'
                    ? theme.palette.primary.main
                    : theme.palette.action.active,
              }}
            />
          </ListItemIcon>
        </Tooltip>
        {open && (
          <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
            Admin Name
          </Typography>
        )}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        {profileMenuItems.map((item) => (
          <MenuItem
            key={item.text}
            onClick={() => {
              navigate(item.path);
              handleMenuClose();
            }}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
});

const Sidebar = ({ open }) => {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const theme = useTheme();
  const location = useLocation();
  const profileDropdownRef = useRef();
  const navigate = useNavigate();

  const sidebarItems = {
    Main: [{ text: 'Dashboard', path: '/admin', icon: <DashboardIcon /> }],
    Products: [
      { text: 'Products', path: '/admin/products', icon: <InventoryIcon /> },
      { text: 'Add Product', path: '/admin/add-product', icon: <InventoryIcon /> },
      { text: 'Reviews', path: '/admin/reviews', icon: <DescriptionIcon /> },
    ],
    'Orders & Sales': [
      { text: 'Orders', path: '/admin/orders', icon: <ShoppingCartIcon /> },
      { text: 'Invoices', path: '/admin/invoices', icon: <ReceiptIcon /> },
    ],
    Users: [
      { text: 'Customers', path: '/admin/customers', icon: <PeopleIcon /> },
      { text: 'Staff', path: '/admin/staff', icon: <PeopleIcon /> },
    ],
    Vendors: [{ text: 'Vendors', path: '/admin/vendors', icon: <StoreIcon /> }],
    Marketing: [
      { text: 'Coupons', path: '/admin/coupons', icon: <DescriptionIcon /> },
      { text: 'Add Coupon', path: '/admin/add-coupon', icon: <DescriptionIcon /> },
    ],
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        '& .MuiDrawer-paper': {
          ...(open ? openedMixin(theme) : closedMixin(theme)),
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.grey[100],
          color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          boxShadow: theme.shadows[3],
          borderRight: `1px solid ${theme.palette.divider}`,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
        },
      }}
      open={open}
    >
      {/* Logo */}
      <DrawerHeader>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
          }}
          component={RouterLink}
          to="/"
        >
          {open && (
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Larkon
            </Typography>
          )}
          <ShoppingCartIcon sx={{ color: theme.palette.primary.main }} />
        </Box>
      </DrawerHeader>

      <Divider />

      {/* Sidebar Sections */}
      {Object.entries(sidebarItems).map(([sectionKey, sectionItems], index) => (
        <Box key={index}>
          {open && (
            <Typography
              variant="caption"
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                ml: 2,
                mt: 2,
                display: 'block',
                color: theme.palette.text.secondary,
              }}
            >
              {sectionKey}
            </Typography>
          )}
          <List>
            {sectionItems.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: 'block' }}
                component={RouterLink}
                to={item.path}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    backgroundColor:
                      location.pathname === item.path
                        ? alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
                        : 'transparent',
                    '&:hover': {
                      backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.hoverOpacity
                      ),
                    },
                  }}
                >
                  <Tooltip title={item.text} disableHoverListener={open}>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color:
                          location.pathname === item.path
                            ? theme.palette.primary.main
                            : theme.palette.action.active,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      ))}

      {/* Profile Dropdown */}
      <Box
        sx={{
          mt: 'auto',
          px: open ? 2 : 1,
          py: 1,
          display: 'flex',
          flexDirection: 'column',
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* Admin label */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 1,
            justifyContent: open ? 'flex-start' : 'center',
          }}
        >
       
          {open && (
            <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
              Admin
            </Typography>
          )}
        </Box>

        {/* Profile & Settings links */}
        <List sx={{ p: 0 }}>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={RouterLink}
              to="/admin/profile"
              sx={{
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                minHeight: 40,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: location.pathname === '/admin/profile' ? theme.palette.primary.main : theme.palette.action.active,
                }}
              >
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText
                primary="My Profile"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={RouterLink}
              to="/admin/settings"
              sx={{
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                minHeight: 40,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: location.pathname === '/admin/settings' ? theme.palette.primary.main : theme.palette.action.active,
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

    </Drawer>
  );
};

export default Sidebar;
