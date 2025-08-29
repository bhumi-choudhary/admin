import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  Pagination,
  TextField,
  InputAdornment,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// ✅ Icons
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

// ================= Dummy Data =================
const initialCustomerRows = [
  { id: 1, name: 'Michael A. Miner', avatar: 'https://i.pravatar.cc/150?img=1', invoiceId: '#INV2540', status: 'Completed', totalAmount: '$4,521', amountDue: '$8,901', dueDate: '07 Jan, 2023', paymentMethod: 'Mastercard' },
  { id: 2, name: 'Jessica D. Campbell', avatar: 'https://i.pravatar.cc/150?img=2', invoiceId: '#INV3832', status: 'Pending', totalAmount: '$3,650', amountDue: '$7,452', dueDate: '10 Feb, 2023', paymentMethod: 'Visa' },
  { id: 3, name: 'William T. Carter', avatar: 'https://i.pravatar.cc/150?img=3', invoiceId: '#INV1092', status: 'Cancelled', totalAmount: '$2,541', amountDue: '$5,200', dueDate: '20 Mar, 2023', paymentMethod: 'PayPal' },
  { id: 4, name: 'Sophia K. Lopez', avatar: 'https://i.pravatar.cc/150?img=4', invoiceId: '#INV2874', status: 'Completed', totalAmount: '$6,210', amountDue: '$2,345', dueDate: '15 Apr, 2023', paymentMethod: 'Amex' },
  { id: 5, name: 'James R. Brown', avatar: 'https://i.pravatar.cc/150?img=5', invoiceId: '#INV5738', status: 'Pending', totalAmount: '$1,920', amountDue: '$4,780', dueDate: '01 May, 2023', paymentMethod: 'Mastercard' },
  { id: 6, name: 'Emily G. Johnson', avatar: 'https://i.pravatar.cc/150?img=6', invoiceId: '#INV7642', status: 'Completed', totalAmount: '$8,300', amountDue: '$6,100', dueDate: '21 Jun, 2023', paymentMethod: 'Visa' },
  { id: 7, name: 'Daniel M. White', avatar: 'https://i.pravatar.cc/150?img=7', invoiceId: '#INV4512', status: 'Cancelled', totalAmount: '$4,750', amountDue: '$9,200', dueDate: '05 Jul, 2023', paymentMethod: 'PayPal' },
  { id: 8, name: 'Olivia H. Adams', avatar: 'https://i.pravatar.cc/150?img=8', invoiceId: '#INV9254', status: 'Pending', totalAmount: '$2,480', amountDue: '$7,890', dueDate: '18 Aug, 2023', paymentMethod: 'Amex' },
  { id: 9, name: 'Ethan J. Harris', avatar: 'https://i.pravatar.cc/150?img=9', invoiceId: '#INV6721', status: 'Completed', totalAmount: '$9,120', amountDue: '$3,450', dueDate: '30 Sep, 2023', paymentMethod: 'Mastercard' },
  { id: 10, name: 'Ava L. Martinez', avatar: 'https://i.pravatar.cc/150?img=10', invoiceId: '#INV3125', status: 'Cancelled', totalAmount: '$5,430', amountDue: '$2,780', dueDate: '12 Oct, 2023', paymentMethod: 'Visa' },
  { id: 11, name: 'Liam N. Walker', avatar: 'https://i.pravatar.cc/150?img=11', invoiceId: '#INV8432', status: 'Pending', totalAmount: '$3,250', amountDue: '$8,600', dueDate: '25 Nov, 2023', paymentMethod: 'PayPal' },
  { id: 12, name: 'Isabella O. Hall', avatar: 'https://i.pravatar.cc/150?img=12', invoiceId: '#INV5219', status: 'Completed', totalAmount: '$7,890', amountDue: '$4,320', dueDate: '08 Dec, 2023', paymentMethod: 'Amex' },
];

// Styled Components
const StatusChip = styled(Chip)(({ theme, status }) => ({
  color: '#fff',
  backgroundColor:
    status === 'Completed' ? theme.palette.success.main :
      status === 'Pending' ? theme.palette.warning.main :
        theme.palette.error.main,
}));

const CustomerListTable = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [rowsPerPage] = useState(10); // Default 10 rows
  const [customerRows, setCustomerRows] = useState(initialCustomerRows); // ✅ Data in state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('All');

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedCustomers(customerRows.map((customer) => customer.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (id) => {
    setSelectedCustomers((prev) =>
      prev.includes(id) ? prev.filter((customerId) => customerId !== id) : [...prev, id]
    );
  };

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (customerToDelete) {
      setCustomerRows((prev) => prev.filter((c) => c.id !== customerToDelete.id));
    }
    setDeleteDialogOpen(false);
    setCustomerToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setCustomerToDelete(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1); // MUI Pagination is 1-based
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to first page on search
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    setPage(0); // Reset to first page on filter
  };

  const filteredAndSearchedCustomers = customerRows.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()); // Example search fields

    const matchesFilter = filterValue === 'All' || customer.status === filterValue;

    return matchesSearch && matchesFilter;
  });

  const visibleRows = filteredAndSearchedCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2, borderRadius: 3, boxShadow: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h6">All Customers List</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search customer"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl variant="outlined" size="small">
            <Select
              value={filterValue}
              onChange={handleFilterChange}
              displayEmpty
              inputProps={{ 'aria-label': 'select filter' }}
            >
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>


      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selectedCustomers.length > 0 && selectedCustomers.length < customerRows.length}
                checked={customerRows.length > 0 && selectedCustomers.length === customerRows.length}
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Invoice ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Amount Due</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {visibleRows.map((customer) => (
            <TableRow hover key={customer.id}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedCustomers.includes(customer.id)}
                  onChange={() => handleSelectCustomer(customer.id)}
                />
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar src={customer.avatar} alt={customer.name} />
                  <Typography variant="body2">{customer.name}</Typography>
                </Box>
              </TableCell>
              <TableCell>{customer.invoiceId}</TableCell>
              <TableCell>
                <StatusChip status={customer.status} label={customer.status} size="small" />
              </TableCell>
              <TableCell>{customer.totalAmount}</TableCell>
              <TableCell>{customer.amountDue}</TableCell>
              <TableCell>{customer.dueDate}</TableCell>
              <TableCell>{customer.paymentMethod}</TableCell>
              <TableCell align="center">
                {/* View Customer */}
                <IconButton onClick={() => navigate(`/admin/customer/view/${customer.id}`)}>
                  <VisibilityOutlinedIcon color="primary" />
                </IconButton>

                {/* Edit Customer */}
                {/* <IconButton onClick={() => navigate(`/admin/customer/edit/${customer.id}`)}>
                  <EditOutlinedIcon color="secondary" />
                </IconButton> */}

                {/* Delete Customer */}
                <IconButton onClick={() => handleDeleteClick(customer)}>
                  <DeleteOutlineOutlinedIcon color="error" />
                </IconButton>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ✅ Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, pb: 2 }}>
        <Pagination
          count={Math.ceil(filteredAndSearchedCustomers.length / rowsPerPage)}
          page={page + 1}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>

      {/* ✅ Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{customerToDelete?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CustomerListTable;
