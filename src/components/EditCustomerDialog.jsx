import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';

const EditCustomerDialog = ({ open, onClose, customer }) => {
  const [editedCustomer, setEditedCustomer] = useState({});

  useEffect(() => {
    if (customer) {
      setEditedCustomer(customer);
    }
  }, [customer]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // In a real application, you would typically send
    // the editedCustomer data to your backend API here
    console.log('Saving customer:', editedCustomer);
    onClose(); // Close the dialog after saving (or after API call success)
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Customer</DialogTitle>
      <DialogContent>
        <DialogContentText>Edit the customer details below.</DialogContentText>
        <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Customer Name"
            name="name"
            value={editedCustomer.name || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Invoice ID"
            name="invoiceId"
            value={editedCustomer.invoiceId || ''}
            onChange={handleChange}
            fullWidth
          />
           <TextField
            label="Status"
            name="status"
            value={editedCustomer.status || ''}
            onChange={handleChange}
            fullWidth
          />
           <TextField
            label="Total Amount"
            name="totalAmount"
            value={editedCustomer.totalAmount || ''}
            onChange={handleChange}
            fullWidth
          />
           <TextField
            label="Amount Due"
            name="amountDue"
            value={editedCustomer.amountDue || ''}
            onChange={handleChange}
            fullWidth
          />
           <TextField
            label="Due Date"
            name="dueDate"
            value={editedCustomer.dueDate || ''}
            onChange={handleChange}
            fullWidth
          />
            <TextField
            label="Payment Method"
            name="paymentMethod"
            value={editedCustomer.paymentMethod || ''}
            onChange={handleChange}
            fullWidth
          />
          {/* Add other fields as needed */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCustomerDialog;