import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableContainer,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
  Stack,
  TextField,
  Pagination,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

// ✅ Icons
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import { ToastContainer, toast } from "react-toastify";
// 🎨 Gradient Cards
const OrderSummaryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  borderRadius: "16px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
  transition: "all 0.3s ease",
  background: "linear-gradient(135deg, #ffffff, #f9fafc)",
}));

// ✅ Summary Data
const orderSummaryData = [
  { icon: <LocalAtmOutlinedIcon fontSize="large" />, title: "Payment Refund", value: 490, color: "#ff6b6b" },
  { icon: <CancelOutlinedIcon fontSize="large" />, title: "Order Cancel", value: 241, color: "#f06595" },
  { icon: <LocalShippingOutlinedIcon fontSize="large" />, title: "Order Shipped", value: 630, color: "#339af0" },
  { icon: <DeliveryDiningOutlinedIcon fontSize="large" />, title: "Order Delivering", value: 170, color: "#845ef7" },
  { icon: <RateReviewOutlinedIcon fontSize="large" />, title: "Pending Review", value: 210, color: "#fcc419" },
  { icon: <PaymentOutlinedIcon fontSize="large" />, title: "Pending Payment", value: 608, color: "#ffa94d" },
  { icon: <CheckCircleOutlineOutlinedIcon fontSize="large" />, title: "Delivered", value: 200, color: "#51cf66" },
  { icon: <HourglassEmptyOutlinedIcon fontSize="large" />, title: "In Progress", value: 656, color: "#4dabf7" },
];

// ✅ Fake Orders
const orders = [
  { id: "#583488/80", date: "Apr 23, 2024", customer: "Gail C. Anderson", priority: "Normal", total: "$1,230.00", payment: "Unpaid", items: 4, delivery: "-", status: "Draft" },
  { id: "#456754/80", date: "Apr 20, 2024", customer: "Jung S. Ayala", priority: "Normal", total: "$987.00", payment: "Paid", items: 2, delivery: "-", status: "Packaging" },
  { id: "#578246/80", date: "Apr 19, 2024", customer: "David A. Arnold", priority: "High", total: "$1,478.00", payment: "Paid", items: 5, delivery: "#D-57837678", status: "Completed" },
  { id: "#348930/80", date: "Apr 04, 2024", customer: "Cecile D. Gordon", priority: "Normal", total: "$720.00", payment: "Refund", items: 4, delivery: "-", status: "Canceled" },
];

// ✅ Chip color mapping
const paymentColor = { Paid: "success", Unpaid: "warning", Refund: "info" };
const statusColor = { Draft: "default", Packaging: "warning", Completed: "success", Canceled: "error" };



function Orders() {
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");


  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const ordersPerPage = 10; // Adjust as needed
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  // Delete modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [orderToDeleteId, setOrderToDeleteId] = useState(null);

  // Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleDeleteClick = (orderId) => {
    setOrderToDeleteId(orderId);
    setOpenDeleteModal(true);
  };

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
    setOrderToDeleteId(null);
  };

  const handleDeleteOrder = () => {
    console.log("Deleting order with ID:", orderToDeleteId);

    // ✅ React Toastify Success Message
    toast.success("Order deleted successfully!");

    handleCloseModal();
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: "#f4f6f9", minHeight: "100vh" }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          gutterBottom
          fontWeight="bold"
          sx={{ mt: 5 }}
        >
          Orders Dashboard
        </Typography>

        {/* Summary Cards */}
        <Box
          sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, mb: 4, "@media (max-width: 1200px)": { gridTemplateColumns: "repeat(2, 1fr)" }, "@media (max-width: 600px)": { gridTemplateColumns: "1fr" }, }}
        >
          {orderSummaryData.map((card, i) => (
            <OrderSummaryCard key={i}>
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
                  bgcolor: "rgba(255, 102, 0, 0.1)",
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
            </OrderSummaryCard>
          ))}
        </Box>

        {/* Table */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <TextField
          label="Search Orders"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: isMobile ? '100%' : 'auto' }}
        />
      </Box>
        <Paper
          sx={{
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: 1,
            bgcolor: "white",
          }}
        >
          <TableContainer sx={{ maxHeight: { xs: 400, sm: "none" }, overflowX: "auto" }}>
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead
                
              >
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Created at</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Delivery No</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  "& .MuiTableCell-root": {
                    color: "text.primary", // Adjust text color
                  },
                  "& .MuiTableRow-root:hover": {
                    bgcolor: "rgba(2,136,209,0.04)", // Light blue hover effect
                  },
                }}
              >
                {filteredOrders.slice((page - 1) * ordersPerPage, page * ordersPerPage).map((order, i) => (
                  <TableRow key={i}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{order.customer}</TableCell>
                    <TableCell>{order.priority}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.payment}
                        color={paymentColor[order.payment] || "default"}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>{order.delivery}</TableCell>

                    <TableCell>
                      <Chip
                        label={order.status}
                        color={statusColor[order.status] || "default"}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        position: { xs: "static", sm: "sticky" },
                        right: 0,
                        bgcolor: { xs: "transparent", sm: "white" },
                        zIndex: 1,
                      }}
                    >
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        justifyContent="center"
                      >
                        <IconButton color="primary" size="small" onClick={() => navigate(`/admin/order-details/${order.id}`)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>

                        <IconButton color="error" size="small" onClick={() => handleDeleteClick(order.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          {/* <button
            onClick={() => handlePageChange(page - 1)}
            className="px-3 py-1.5 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            Previous
          </button>
          {/* Replace custom pagination with MUI Pagination */}
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, val) => handlePageChange(val)}
            color="primary"
            siblingCount={1} // Adjust based on desired visibility of sibling pages
          />
          <button // Removed custom pagination buttons and using only MUI Pagination
            onClick={() => handlePageChange(page + 1)}
            className="px-3 py-1.5 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            Next
          </button> 
          {/* Old PageButton rendering
            <PageButton
              key={i}
              active={page === i + 1 ? 1 : 0}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
          */}
        </Box>
      </Box>

      {/* Delete Modal */}
      <Dialog open={openDeleteModal} onClose={handleCloseModal}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete order {orderToDeleteId}? This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteOrder} color="error" variant="contained">
            Delete
          </Button>
        </Box>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Orders;
