import React from 'react';
import { 
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Components
import TopCards from '../components/TopCards';
import StatsSection from '../components/StatsSection';
import RecentOrdersTable from '../components/RecentOrdersTable';
import WeeklySalesChart from '../components/WeeklySalesChart';
import BestSellingProductsChart from '../components/BestSellingProductsChart.jsx';

// Styled Card
const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  borderRadius: theme.shape.borderRadius, 
  height: '100%',
  boxShadow: theme.shadows[1], 
}));


const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        px: { xs: 2, sm: 3, md: 3 },
        // Background color handled by theme (likely palette.background.default)
        paddingTop: { xs: '70px', sm: '80px', md: '60px' }, // Add padding to accommodate the header
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          mb: 3,
        }}
      >
        Dashboard Overview
      </Typography>

      {/* Top Summary Cards */}
      <Box sx={{ mb: 4 }}><TopCards /></Box>

      {/* Stats Section */}
      <Box sx={{ mb: 4 }}> {/* Add bottom margin */}
        <StatsSection />
      </Box>

      {/* Charts Section */}
      <Box sx={{ mb: 5 }}>
  {/* Title */}
  <Typography
    variant="h5"
    gutterBottom
    sx={{ fontWeight: 600, mb: 1 }}
  >
    Analytics
  </Typography>
  <Typography
    variant="body2"
    color="text.secondary"
    sx={{ mb: 3 }}
  >
    Track weekly sales trends and top-performing products.
  </Typography>

  {/* Responsive Flex/Grid Layout */}
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 3,
      "@media (max-width: 900px)": {
        gridTemplateColumns: "1fr", // mobile/tablet पर stack होगा
      },
    }}
  >
    <StyledCard>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <WeeklySalesChart />
      </CardContent>
    </StyledCard>

    <StyledCard>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <BestSellingProductsChart />
      </CardContent>
    </StyledCard>
  </Box>
</Box>


      {/* Recent Orders */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 600, mb: 1 }}
        >
          Recent Orders
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Here’s a quick overview of your latest transactions.
        </Typography>

        <StyledCard>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <RecentOrdersTable />
          </CardContent>
        </StyledCard>
      </Box>
    </Box>
  );
};

export default Dashboard;
