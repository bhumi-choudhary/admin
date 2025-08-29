import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomerStatsCards from '/home/user/admin/src/components/CustomerStatsCards.jsx'; // Assuming the path based on previous interaction
import CustomerListTable from '/home/user/admin/src/components/CustomerListTable.jsx'; // Import the CustomerListTable component

function Customers() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        px: { xs: 2, sm: 3, md: 3 },
        paddingTop: { xs: '70px', sm: '80px', md: '70px' },
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, mb: 3 }}>
        Customers
      </Typography>
      <CustomerStatsCards /> {/* Render the customer stats cards */}

      {/* Render the customer list table */}
      {/* Add spacing below the cards and around the table */}
      <Box sx={{ mt: 4, mb: 4 }}>
        <CustomerListTable />
      </Box>
    </Box>
  );
}

export default Customers;