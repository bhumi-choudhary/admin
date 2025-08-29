import { useState } from 'react';
import {CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify'; 
import Reviews from './pages/Reviews.jsx';
import Customers from './pages/Customers.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Sellers from '/home/user/admin/src/pages/Sellers.jsx';
import Vendors from '/home/user/admin/src/pages/Vendors.jsx';
import Staff from './pages/Staff.jsx';
import Login from '/home/user/admin/src/pages/Login.jsx';
import Layout from '/home/user/admin/src/components/Layout.jsx';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider as CustomThemeProvider } from '/home/user/admin/src/contexts/ThemeContext.jsx'; // Import your custom ThemeProvider
import Products from '/home/user/admin/src/pages/Products.jsx';
import AddProduct from '/home/user/admin/src/pages/AddProduct.jsx';
import Dashboard from './pages/Dashboard.jsx';
import OrderDetails from '/home/user/admin/src/pages/OrderDetails.jsx'; // Import OrderDetails
import Orders from '/home/user/admin/src/pages/Orders.jsx'; // Import Orders
import EditProduct from '/home/user/admin/src/pages/EditProduct.jsx'; // Import EditProduct
import ProductDetails from '/home/user/admin/src/pages/ProductDetails.jsx'; // Import ProductDetails
import Invoices from '/home/user/admin/src/pages/Invoices.jsx'; // Import Invoices
import ViewInvoice from '/home/user/admin/src/pages/ViewInvoice.jsx'; // Import ViewInvoice
import ViewCustomer from '/home/user/admin/src/pages/ViewCustomer.jsx'; // Import ViewCustomer
import VendorDetails from '/home/user/admin/src/pages/VendorDetails.jsx'; // Import VendorDetails
import ViewStaff from '/home/user/admin/src/pages/ViewStaff.jsx'; // Import ViewStaff
import AddStaff from '/home/user/admin/src/pages/AddStaff.jsx'; // Import AddStaff
import EditStaffRolesPage from '/home/user/admin/src/pages/EditStaffRolesPage.jsx'; // Import EditStaffRolesPage
import Coupons from '/home/user/admin/src/pages/Coupons.jsx'; // Import Coupons
import AddCoupon from '/home/user/admin/src/pages/AddCoupon.jsx'; // Import AddCoupon
import { ProductProvider } from '/home/user/admin/src/contexts/ProductContext.jsx';
const drawerWidth = 240;

function App() {
  const [open, setOpen] = useState(true); // Sidebar open/close state
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Create theme
  let theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1d1d1d' : '#ffffff',
      },
      pastel: {
        blue: '#a7c7e7',
        green: '#c8e6c9',
        peach: '#ffccbc',
        lavender: '#e1bee7',
        color: {
          main: '#FF9800', // A standard orange color
          contrastText: '#FFFFFF', // White text for contrast
          dark: '#F57C00', // A darker shade of orange
        },
        red: '#ffcdd2',
        orange: '#ffe0b2',
      },
    },
    typography: {
      fontFamily: '"Poppins", sans-serif',
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            boxShadow: darkMode
              ? '0px 2px 4px rgba(0,0,0,0.2)'
              : '0px 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            boxShadow: darkMode
              ? '0px 2px 4px rgba(0,0,0,0.2)'
              : '0px 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            overflowX: 'auto',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:nth-of-type(odd)': {
              backgroundColor: darkMode ? '#2d2d2d' : '#f5f5f5',
            },
            '&:hover': {
              backgroundColor: darkMode ? '#3a3a3a' : '#e0e0e0',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.label === 'Delivered' && {
              backgroundColor: darkMode ? '#4caf50' : '#d4edda',
              color: darkMode ? '#ffffff' : '#155724',
            }),
            ...(ownerState.label === 'Pending' && {
              backgroundColor: darkMode ? '#ff9800' : '#fff3cd',
              color: '#856404',
            }),
            ...(ownerState.label === 'Processing' && {
              backgroundColor: darkMode ? '#ffb74d' : '#fff3cd',
              color: darkMode ? '#ffffff' : '#856404',
            }),
            ...(ownerState.label === 'Cancel' && {
              backgroundColor: darkMode ? '#f44336' : '#f8d7da',
              color: darkMode ? '#ffffff' : '#721c24',
            }),
          }),
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);

  return (
    <CustomThemeProvider> {/* Wrap with your custom ThemeProvider */}
      <ProductProvider> {/* Wrap the main application content with ProductProvider */}
        <ThemeProvider theme={theme}> {/* Wrap with Material UI ThemeProvider */}
          <CssBaseline />
          <Routes>
            {/* Public Routes */}
            <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} /> {/* Redirect from /dashboard */}
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Admin Panel Routes */}
            <Route
              path="/admin/*"
              element={
                <Layout
                  open={open}
                  handleDrawerClose={handleDrawerClose}
                  handleDrawerOpen={handleDrawerOpen}
                  toggleDarkMode={toggleDarkMode}
                  darkMode={darkMode}
                />
              }>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="products-detail/:productId" element={<ProductDetails />} /> {/* Add Product Details Route */}
              <Route path="edit-product/:productId" element={<EditProduct />} /> {/* Add Edit Product Route */}
              <Route path="orders" element={<Orders />} />
              <Route path="order-details" element={<OrderDetails />} /> {/* Add Order Details Route */}
              <Route path="coupons" element={<Coupons />} /> {/* Add Coupons Route */}
              <Route path="add-coupon" element={<AddCoupon />} /> {/* Add Add Coupon Route */}
              <Route path="reviews" element={<Reviews />} />
              <Route path="customers" element={<Customers />} />
              <Route path="vendors" element={<Vendors />} />
              <Route path="vendors-detail/:id" element={<VendorDetails />} /> {/* Add Vendor Details Route */}
              <Route path="profile" element={<Profile />} />
              <Route path="staff" element={<Staff />} /> {/* Add Staff Route */}
              <Route path="staff/edit/:staffId" element={<EditStaffRolesPage />} /> {/* Add Edit Staff Roles Route */}
              <Route path="add-staff" element={<AddStaff />} /> {/* Add Add Staff Route */}
              <Route path="staff/view/:staffId" element={<ViewStaff />} /> {/* Add View Staff Route */}
              <Route path="settings" element={<Settings />} />
              <Route path="sellers" element={<Sellers />} />
              <Route path="customer/view/:customerId" element={<ViewCustomer />} /> {/* Add View Customer Route */}
              <Route path="invoices" element={<Invoices />} /> {/* Add Invoices Route */}
              <Route path="invoices/:invoiceId" element={<ViewInvoice />} /> {/* Add View Invoice Route */}
            </Route>
          </Routes>
        </ThemeProvider>
        <ToastContainer /> {/* Add ToastContainer here */}
      </ProductProvider>
    </CustomThemeProvider >
  );
}

export default App;

