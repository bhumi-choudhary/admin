import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Chip,
  Avatar,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import BadgeIcon from "@mui/icons-material/Badge";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ReplayIcon from "@mui/icons-material/Replay";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const ViewCustomer = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const [customerDetails, setCustomerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        // Mock data (API से भी fetch कर सकते हो)
        const data = {
          id: customerId,
          name: `Customer ${customerId}`,
          email: `customer${customerId}@example.com`,
          phone: "9876543210",
          address: "123 Main St, Jaipur, Rajasthan",
          status: customerId % 2 === 0 ? "Active" : "Inactive",
          joinedDate: "2023-08-15",
          profileImg: "https://i.pravatar.cc/300?img=5",
          orders: 12,
          totalSpent: "₹45,000",
          pendingPayment: "₹5,000",
          refunds: "₹2,000",
          lastOrder: "2024-02-10",
          orderList: [
            { id: 101, date: "2024-01-12", amount: "₹2,000", status: "Paid" },
            { id: 102, date: "2024-01-20", amount: "₹3,500", status: "Pending" },
            { id: 103, date: "2024-02-01", amount: "₹5,000", status: "Paid" },
          ],
          refundList: [
            { id: "R201", date: "2024-01-25", amount: "₹1,000", status: "Processed" },
            { id: "R202", date: "2024-02-05", amount: "₹1,000", status: "Pending" },
          ],
          transactions: [
            { id: "T301", date: "2024-01-10", method: "UPI", amount: "₹2,000", status: "Success" },
            { id: "T302", date: "2024-01-20", method: "Credit Card", amount: "₹3,500", status: "Failed" },
            { id: "T303", date: "2024-02-01", method: "Net Banking", amount: "₹5,000", status: "Success" },
          ],
        };

        setCustomerDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [customerId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" align="center">
        ❌ Error: {error}
      </Typography>
    );
  }

  if (!customerDetails) {
    return (
      <Typography variant="h6" align="center">
        Customer not found.
      </Typography>
    );
  }

  // Summary cards
  const summaryData = [
    { title: "Total Orders", value: customerDetails.orders, icon: <ShoppingCartIcon />, color: "#1976d2" },
    { title: "Total Spent", value: customerDetails.totalSpent, icon: <PaymentsIcon />, color: "#2e7d32" },
    { title: "Pending Payment", value: customerDetails.pendingPayment, icon: <HourglassBottomIcon />, color: "#d32f2f" },
    { title: "Refunds", value: customerDetails.refunds, icon: <ReplayIcon />, color: "#ff9800" },
  ];

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, mt: 4, backgroundColor: "#f8fbff", minHeight: "100vh" }}>
      {/* Back Button */}
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3 }} variant="contained">
        Back
      </Button>

      {/* Summary Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          mb: 4,
          "@media (max-width: 1200px)": { gridTemplateColumns: "repeat(2, 1fr)" },
          "@media (max-width: 600px)": { gridTemplateColumns: "1fr" },
        }}
      >
        {summaryData.map((card, i) => (
          <Card key={i} sx={{ borderRadius: 3, boxShadow: 4, textAlign: "center", p: 2 }}>
            <Box
              sx={{
                mb: 1,
                width: 56,
                height: 56,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                color: card.color,
                bgcolor: "rgba(25, 118, 210, 0.1)",
              }}
            >
              {card.icon}
            </Box>
            <Typography variant="subtitle2" color="text.secondary">
              {card.title}
            </Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "#2d3748" }}>
              {card.value}
            </Typography>
          </Card>
        ))}
      </Box>

      {/* Profile Card */}
      <Paper sx={{ borderRadius: 3, boxShadow: 6, overflow: "hidden", maxWidth: "1000px", margin: "auto" }}>
        {/* Banner + Avatar */}
        <Box
          sx={{
            height: 180,
            background: "linear-gradient(135deg, #1976d2, #42a5f5)",
            position: "relative",
          }}
        >
          <Avatar
            src={customerDetails.profileImg}
            alt={customerDetails.name}
            sx={{
              width: 120,
              height: 120,
              border: "4px solid white",
              position: "absolute",
              bottom: -60,
              left: "50%",
              transform: "translateX(-50%)",
              boxShadow: 4,
            }}
          />
        </Box>

        <Box sx={{ mt: 8, textAlign: "center", p: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {customerDetails.name}
          </Typography>
          <Chip
            icon={<VerifiedUserIcon />}
            label={blocked ? "Blocked" : customerDetails.status}
            color={blocked ? "error" : customerDetails.status === "Active" ? "success" : "warning"}
            sx={{ mt: 1, fontWeight: "bold" }}
          />

          {/* Block/Unblock Button */}
          <Box mt={2}>
            <Button variant="contained" color={blocked ? "success" : "error"} onClick={() => setBlocked(!blocked)}>
              {blocked ? "Unblock Customer" : "Block Customer"}
            </Button>
          </Box>
        </Box>

        {/* Info Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            px: { xs: 2, md: 6 },
            pb: 5,
          }}
        >
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              <BadgeIcon sx={{ mr: 1 }} /> Customer ID:
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={2}>
              {customerDetails.id}
            </Typography>

            <Typography variant="subtitle1" fontWeight="bold">
              <EmailIcon sx={{ mr: 1 }} /> Email:
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={2}>
              {customerDetails.email}
            </Typography>

            <Typography variant="subtitle1" fontWeight="bold">
              <PhoneIcon sx={{ mr: 1 }} /> Phone:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {customerDetails.phone}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              <HomeIcon sx={{ mr: 1 }} /> Address:
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={2}>
              {customerDetails.address}
            </Typography>

            <Typography variant="subtitle1" fontWeight="bold">
              <EventIcon sx={{ mr: 1 }} /> Joined Date:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {customerDetails.joinedDate}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Orders Table */}
      <DataTable title="Recent Orders" rows={customerDetails.orderList} columns={["Order ID", "Date", "Amount", "Status"]} type="order" />

      {/* Refunds Table */}
      <DataTable title="Refunds History" rows={customerDetails.refundList} columns={["Refund ID", "Date", "Amount", "Status"]} type="refund" />

      {/* Transactions Table */}
      <DataTable title="Payment Transactions" rows={customerDetails.transactions} columns={["Txn ID", "Date", "Method", "Amount", "Status"]} type="txn" />
    </Box>
  );
};

// ✅ Reusable Table Component
const DataTable = ({ title, rows, columns, type }) => (
  <Paper sx={{ mt: 4, p: 3, borderRadius: 3, boxShadow: 5 }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Divider sx={{ mb: 2 }} />
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: "#f1f5f9" }}>
          {columns.map((col, idx) => (
            <TableCell key={idx} sx={{ fontWeight: "bold" }}>
              {col}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow
            key={row.id}
            sx={{
              backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
              "&:hover": { backgroundColor: "#e3f2fd" },
            }}
          >
            {Object.values(row).map((val, idx) => (
              <TableCell key={idx}>
                {idx === Object.values(row).length - 1 ? (
                  <Chip
                    label={val}
                    color={
                      val === "Paid" || val === "Success" || val === "Processed"
                        ? "success"
                        : val === "Pending"
                        ? "warning"
                        : "error"
                    }
                    size="small"
                  />
                ) : (
                  val
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default ViewCustomer;
