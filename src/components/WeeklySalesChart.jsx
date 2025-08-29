import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
const WeeklySalesChart = () => {
  const weeklySalesData = [
    { day: 'Mon', sales: 400 },
    { day: 'Tue', sales: 300 },
    { day: 'Wed', sales: 600 },
    { day: 'Thu', sales: 800 },
    { day: 'Fri', sales: 500 },
    { day: 'Sat', sales: 900 },
    { day: 'Sun', sales: 700 },
  ];

  const ChartPaper = styled(Paper)(({ theme }) => ({
    p: 2, 
    mb: 3,
    boxShadow: theme.shadows[2], // Subtle shadow
    borderRadius: theme.shape.borderRadius, // Use theme's border radius
  }));

  const theme = useTheme();

  return (
    // Use ChartPaper for consistent styling with other cards
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>

        Weekly Sales
      </Typography>
      <Box sx={{ width: '100%', height: 300 }}>
        <LineChart
          series={[
            {
              data: weeklySalesData.map(item => item.sales),
              label: 'Sales',
              color: theme.palette.success.light, // Use theme's light success color for pastel green
            },
          ]}
          xAxis={[{
            scaleType: 'point',
            data: weeklySalesData.map(item => item.day),
          }]}
          margin={{ top: 20, bottom: 30, left: 40, right: 20 }}
          slotProps={{
            mark: { r: 4 }, // Circular markers
          }}
        />
      </Box>
    </Paper>
  );
};

export default WeeklySalesChart;