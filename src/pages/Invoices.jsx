import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Pagination,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Receipt,
  HourglassEmpty,
  Cancel,
  Visibility,
  Delete,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const Invoices = () => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const rowsPerPage = 10;

  const stats = [
    { label: "Total Invoice", value: "2310", icon: <Receipt />, color: "#1976D2", bg: "#E3F2FD" },
    { label: "Pending Invoice", value: "1000", icon: <HourglassEmpty />, color: "#FB8C00", bg: "#FFF3E0" },
    { label: "Paid Invoice", value: "1310", icon: <TrendingUp />, color: "#2E7D32", bg: "#E8F5E9" },
    { label: "Inactive Invoice", value: "1243", icon: <Cancel />, color: "#C62828", bg: "#FFEBEE" },
  ];

  const allInvoices = [
    { id: "INV-001", billingName: "John Doe", avatar: "https://i.pravatar.cc/150?img=1", orderDate: "07 Jan, 2023", total: "$150", paymentMethod: "Mastercard", status: "Completed" },
    { id: "INV-002", billingName: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=2", orderDate: "03 Dec, 2023", total: "$250", paymentMethod: "Visa", status: "Cancel" },
    { id: "INV-003", billingName: "Peter Jones", avatar: "https://i.pravatar.cc/150?img=3", orderDate: "28 Sep, 2023", total: "$100", paymentMethod: "Paypal", status: "Completed" },
    { id: "INV-004", billingName: "Mary Brown", avatar: "https://i.pravatar.cc/150?img=4", orderDate: "10 Aug, 2023", total: "$300", paymentMethod: "Mastercard", status: "Pending" },
    { id: "INV-005", billingName: "David Green", avatar: "https://i.pravatar.cc/150?img=5", orderDate: "22 May, 2023", total: "$50", paymentMethod: "Visa", status: "Cancel" },
    { id: "INV-006", billingName: "Alice Williams", avatar: "https://i.pravatar.cc/150?img=6", orderDate: "15 Apr, 2023", total: "$180", paymentMethod: "Paypal", status: "Completed" },
    { id: "INV-007", billingName: "Bob Johnson", avatar: "https://i.pravatar.cc/150?img=7", orderDate: "01 Mar, 2023", total: "$90", paymentMethod: "Mastercard", status: "Pending" },
    { id: "INV-008", billingName: "Charlie Davis", avatar: "https://i.pravatar.cc/150?img=8", orderDate: "20 Feb, 2023", total: "$400", paymentMethod: "Visa", status: "Completed" },
    { id: "INV-009", billingName: "Diana Miller", avatar: "https://i.pravatar.cc/150?img=9", orderDate: "11 Jan, 2023", total: "$120", paymentMethod: "Mastercard", status: "Cancel" },
    { id: "INV-010", billingName: "Ethan Wilson", avatar: "https://i.pravatar.cc/150?img=10", orderDate: "05 Dec, 2022", total: "$60", paymentMethod: "Paypal", status: "Pending" },
  ];

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getStatusChip = (status) => {
    switch (status) {
      case "Completed":
        return <Chip label={status} size="small" sx={{ backgroundColor: "#E6F7E6", color: "#1B5E20", fontWeight: 600 }} />;
      case "Pending":
        return <Chip label={status} size="small" sx={{ backgroundColor: "#FFF8E1", color: "#FF8F00", fontWeight: 600 }} />;
      case "Cancel":
        return <Chip label={status} size="small" sx={{ backgroundColor: "#FFEBEE", color: "#C62828", fontWeight: 600 }} />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const filteredInvoices = allInvoices.filter(invoice =>
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.billingName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedInvoices = filteredInvoices.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleDeleteClick = (invoice) => {
    setSelectedInvoice(invoice);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleted invoice:", selectedInvoice);
    setDeleteDialogOpen(false);
    setSelectedInvoice(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedInvoice(null);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedInvoices(allInvoices.map((inv) => inv.id));
    } else {
      setSelectedInvoices([]);
    }
  };

  const handleCheckboxToggle = (invoiceId) => {
    if (selectedInvoices.includes(invoiceId)) {
      setSelectedInvoices(selectedInvoices.filter((id) => id !== invoiceId));
    } else {
      setSelectedInvoices([...selectedInvoices, invoiceId]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ padding: 3, mt: 5, backgroundColor: "#f8fbff", minHeight: "100vh" }}>
      {/* Stats Cards */}
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
        {stats.map((stat, index) => (
          <Card key={index} className="rounded-2xl shadow-sm hover:shadow-md transition duration-300 bg-white">
            <CardContent className="flex items-center justify-between gap-4 p-5">
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" className="text-slate-600">{stat.label}</Typography>
                <Box className="flex items-baseline gap-2 flex-wrap">
                  <Typography variant="h5" fontWeight="bold" sx={{ color: "#2d3748" }}>{stat.value}</Typography>
                </Box>
              </Box>
              <Box sx={{ p: 1.25, borderRadius: "12px", color: stat.color, bgcolor: stat.bg, mx: "auto" }}>
                {stat.icon}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Invoice Table */}
      <Paper className="rounded-2xl shadow-sm overflow-hidden bg-white">
        <Box className="p-4 flex flex-col sm:flex-row justify-between items-center border-b border-blue-50">
          <Typography variant="h6" className="font-bold text-gray-800 mb-2 sm:mb-0">All Invoices List</Typography>
          <TextField
            label="Search Invoices"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "0px" },
            }}
          />
        </Box>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-blue-50">
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                      indeterminate={selectedInvoices.length > 0 && selectedInvoices.length < allInvoices.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell className="text-blue-600 font-semibold">Invoice ID</TableCell>
                  <TableCell className="text-blue-600 font-semibold">Billing Name</TableCell>
                  <TableCell className="text-blue-600 font-semibold">Order Date</TableCell>
                  <TableCell className="text-blue-600 font-semibold">Total</TableCell>
                  <TableCell className="text-blue-600 font-semibold">Payment Method</TableCell>
                  <TableCell className="text-blue-600 font-semibold">Status</TableCell>
                  <TableCell align="right" className="text-blue-600 font-semibold">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedInvoices.map((invoice) => (
                  <TableRow key={invoice.id} className="hover:bg-blue-50 transition">
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedInvoices.includes(invoice.id)}
                        onChange={() => handleCheckboxToggle(invoice.id)}
                      />
                    </TableCell>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar src={invoice.avatar} alt={invoice.billingName} sx={{ width: 30, height: 30, mr: 1 }} />
                        {invoice.billingName}
                      </div>
                    </TableCell>
                    <TableCell>{invoice.orderDate}</TableCell>
                    <TableCell>{invoice.total}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell>{getStatusChip(invoice.status)}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="View">
                        <IconButton
                          sx={{ backgroundColor: "#E3F2FD", color: "#1976D2", "&:hover": { backgroundColor: "#BBDEFB" } }}
                          onClick={() => navigate(`/admin/invoices/${invoice.id}`)}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          sx={{ backgroundColor: "#FFEBEE", color: "#E53935", "&:hover": { backgroundColor: "#FFCDD2" } }}
                          onClick={() => handleDeleteClick(invoice)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, pb: 2 }}>
            <Pagination
              count={Math.ceil(filteredInvoices.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden p-4 space-y-4">
          {paginatedInvoices.map((invoice) => (
            <Card key={invoice.id} className="rounded-xl shadow-sm border border-blue-100 bg-white">
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Checkbox
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={() => handleCheckboxToggle(invoice.id)}
                      className="mr-2"
                    />
                    <Typography variant="h6" className="font-semibold">{invoice.id}</Typography>
                  </div>
                  {getStatusChip(invoice.status)}
                </div>
                <Typography variant="body2" className="text-gray-600 mb-1">Billing: {invoice.billingName}</Typography>
                <Typography variant="body2" className="text-gray-600 mb-1">Order Date: {invoice.orderDate}</Typography>
                <Typography variant="body2" className="text-gray-600 mb-1">Total: {invoice.total}</Typography>
                <Typography variant="body2" className="text-gray-600 mb-2">Payment: {invoice.paymentMethod}</Typography>
                <div className="flex space-x-2">
                  <IconButton
                    sx={{ backgroundColor: "#E3F2FD", color: "#1976D2", "&:hover": { backgroundColor: "#BBDEFB" } }}
                    onClick={() => navigate(`/admin/invoices/${invoice.id}`)}
                  >
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton
                    sx={{ backgroundColor: "#FFEBEE", color: "#E53935", "&:hover": { backgroundColor: "#FFCDD2" } }}
                    onClick={() => handleDeleteClick(invoice)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Mobile Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={Math.ceil(filteredInvoices.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </div>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Invoice</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {selectedInvoice?.id}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Invoices;
