import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  AccessTimeOutlined as AccessTimeOutlinedIcon,
  CachedOutlined as CachedOutlinedIcon,
  CheckCircleOutlineOutlined as CheckCircleOutlineOutlinedIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
 
}));

const StatIconWrapper = styled(Box)(({ theme, color }) => ({
  width: 56,
  height: 56,
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(1.5),
  backgroundColor: alpha(theme.palette[color].main, 0.1),
  color: theme.palette[color].main,
  "& .MuiSvgIcon-root": {
    fontSize: 30,
  },
}));

const Stats = () => {
  const statsData = [
    {
      label: "Orders",
      value: "1,250",
      icon: <ShoppingCartOutlinedIcon />,
      color: "primary",
    },
    {
      label: "Pending",
      value: "120",
      icon: <AccessTimeOutlinedIcon />,
      color: "warning",
    },
    {
      label: "Processing",
      value: "300",
      icon: <CachedOutlinedIcon />,
      color: "info",
    },
    {
      label: "Delivered",
      value: "830",
      icon: <CheckCircleOutlineOutlinedIcon />,
      color: "success",
    },
  ];

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Order Status
      </Typography>

      {/* Responsive Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          "@media (max-width: 1200px)": {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          "@media (max-width: 600px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        {statsData.map((stat) => (
          <StatCard key={stat.label} elevation={2}>
            <StatIconWrapper color={stat.color}>{stat.icon}</StatIconWrapper>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mt: 1,
                color: "#2d3748",
              }}
            >
              {stat.value}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {stat.label}
            </Typography>
          </StatCard>
        ))}
      </Box>
    </Box>
  );
};

export default Stats;
