import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { styled, alpha, useTheme } from "@mui/material/styles";

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

const TopCards = () => {
  const theme = useTheme();

  const cardData = [
    {
      title: "Total Invoice",
      value: "2310",
      icon: <ReceiptOutlinedIcon />,
      color: theme.palette.info.main,
    },
    {
      title: "Pending Invoice",
      value: "1000",
      icon: <CalendarMonthIcon />,
      color: theme.palette.warning.main,
    },
    {
      title: "Paid Invoice",
      value: "1310",
      icon: <TodayIcon />,
      color: theme.palette.success.main,
    },
    {
      title: "Inactive Invoice",
      value: "1243",
      icon: <ReceiptOutlinedIcon />,
      color: theme.palette.error.main,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 2,
        mb: 4,
        "@media (max-width: 1200px)": {
          gridTemplateColumns: "repeat(2, 1fr)",
        },
        "@media (max-width: 600px)": {
          gridTemplateColumns: "1fr",
        },
      }}
    >
      {cardData.map((card, index) => (
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
        </CardPaper>
      ))}
    </Box>
  );
};

export default TopCards;
