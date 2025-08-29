import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';

const BestSellingProductsChart = ({ pieChartData }) => {
  const data = pieChartData || [
    { id: 0, value: 25, label: 'Product A', color: '#3f51b5' }, // Blue
    { id: 1, value: 15, label: 'Product B', color: '#ff9800' }, // Orange
    { id: 2, value: 30, label: 'Product C', color: '#f44336' }, // Red
    { id: 3, value: 20, label: 'Product D', color: '#00bcd4' }, // Cyan
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Best Selling Products
      </Typography>

      <PieChart
        series={[
          {
            data: data,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, outerRadius: 100, color: 'gray' },
            arcLabel: null, // ❌ remove overlap labels inside pie
          },
        ]}
        colors={data.map((item) => item.color)} // custom colors
        height={300}
        margin={{ top: 30, bottom: 30, left: 30, right: 30 }}
      />

      {/* Custom Legend */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          mt: 2,
        }}
      >
        {data.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 3,
              mb: 1,
            }}
          >
            <Box
              sx={{
                width: 14,
                height: 14,
                borderRadius: '3px',
                bgcolor: item.color,
                mr: 1,
              }}
            />
            <Typography variant="body2" color="text.primary">
              {item.label} ({item.value})
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BestSellingProductsChart;
