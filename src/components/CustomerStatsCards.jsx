import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import {
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  HeadsetMic as HeadsetMicIcon,
  Receipt as ReceiptIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";

const CardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "12px",
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const CardIconWrapper = styled(Box)(({ theme, color }) => ({
  width: 56,
  height: 56,
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(1.5),
  color: color,
  backgroundColor: alpha(color, 0.1),
}));

const PercentageChange = styled(Typography)(({ theme, isPositive }) => ({
  fontSize: "0.75rem",
  fontWeight: "bold",
  color: isPositive ? theme.palette.success.main : theme.palette.error.main,
  display: "flex",
  alignItems: "center",
  marginTop: theme.spacing(0.5),
}));

const CustomerStatsCards = () => {
  const theme = useTheme();

  const customerCardData = [
    {
      title: "All Customers",
      value: "+22.63k",
      icon: <PeopleIcon />,
      color: theme.palette.info.main,
      percentage: "+34.4%",
      isPositive: true,
    },
    {
      title: "Orders",
      value: "+4.5k",
      icon: <ShoppingCartIcon />,
      color: theme.palette.warning.main,
      percentage: "-8.1%",
      isPositive: false,
    },
    {
      title: "Service Requests",
      value: "+1.03k",
      icon: <HeadsetMicIcon />,
      color: theme.palette.success.main,
      percentage: "+12.8%",
      isPositive: true,
    },
    {
      title: "Invoice & Payment",
      value: "$38,908.00",
      icon: <ReceiptIcon />,
      color: theme.palette.error.main,
      percentage: "+45.9%",
      isPositive: true,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 2,
        mb: 4,
      }}
    >
      {customerCardData.map((card, index) => (
        <CardPaper key={index} elevation={2}>
          <CardIconWrapper color={card.color}>{card.icon}</CardIconWrapper>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            gutterBottom
            sx={{ mt: 1 }}
          >
            {card.title}
          </Typography>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#2d3748" }}>
            {card.value}
          </Typography>
          <PercentageChange isPositive={card.isPositive}>
            {card.isPositive ? <ArrowUpwardIcon sx={{ fontSize: "0.8rem", mr: 0.5 }} /> : <ArrowDownwardIcon sx={{ fontSize: "0.8rem", mr: 0.5 }} />}
            {card.percentage}
          </PercentageChange>
        </CardPaper>
      ))}
    </Box>
  );
};

export default CustomerStatsCards;