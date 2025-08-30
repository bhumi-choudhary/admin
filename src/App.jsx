import { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { ToastContainer } from 'react-toastify';

// Pages
import Reviews from './pages/Reviews.jsx';
import Customers from './pages/Customers.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Login from './pages/Login.jsx';
import Vendors from './pages/Vendors.jsx';
import Staff from './pages/Staff.jsx';
import Products from './pages/Products.jsx';
import AddProduct from './pages/AddProduct.jsx';
import Dashboard from './pages/Dashboard.jsx';
import OrderDetails from './pages/OrderDetails.jsx';
import Orders from './pages/Orders.jsx';
import EditProduct from './pages/EditProduct.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Invoices from './pages/Invoices.jsx';
import ViewInvoice from './pages/ViewInvoice.jsx';
import ViewCustomer from './pages/ViewCustomer.jsx';
import VendorDetails from './pages/VendorDetails.jsx';
import ViewStaff from './pages/ViewStaff.jsx';
import AddStaff from './pages/AddStaff.jsx';
import EditStaffRolesPage from './pages/EditStaffRolesPage.jsx';
import Coupons from './pages/Coupons.jsx';
import AddCoupon from './pages/AddCoupon.jsx';


// Contexts
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext.jsx';
import { ProductProvider } from './contexts/ProductContext.jsx';

// MUI + Router
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { Routes, Route, Navigate } from 'react-router-dom';

// ⚠️ Layout component ko import karna mat bhoolna
import Layout from './components/Layout.jsx';

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
          main: '#FF9800',
          contrastText: '#FFFFFF',
          dark: '#F57C00',
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
    <CustomThemeProvider>
      <ProductProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Public Routes */}
            <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
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
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="products-detail/:productId" element={<ProductDetails />} />
              <Route path="edit-product/:productId" element={<EditProduct />} />
              <Route path="orders" element={<Orders />} />
              <Route path="order-details" element={<OrderDetails />} />
              <Route path="coupons" element={<Coupons />} />
              <Route path="add-coupon" element={<AddCoupon />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="customers" element={<Customers />} />
              <Route path="vendors" element={<Vendors />} />
              <Route path="vendors-detail/:id" element={<VendorDetails />} />
              <Route path="profile" element={<Profile />} />
              <Route path="staff" element={<Staff />} />
              <Route path="staff/edit/:staffId" element={<EditStaffRolesPage />} />
              <Route path="add-staff" element={<AddStaff />} />
              <Route path="staff/view/:staffId" element={<ViewStaff />} />
              <Route path="settings" element={<Settings />} />
              <Route path="customer/view/:customerId" element={<ViewCustomer />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="invoices/:invoiceId" element={<ViewInvoice />} />
            </Route>
          </Routes>
          <ToastContainer />
        </ThemeProvider>
      </ProductProvider>
    </CustomThemeProvider>
  );
}

export default App;
