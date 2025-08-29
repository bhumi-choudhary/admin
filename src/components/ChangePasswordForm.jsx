import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Static placeholder logic
    enqueueSnackbar('Password changed successfully!', { variant: 'success' });
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Change Password
        </Typography>
        <form onSubmit={handleChangePassword}>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Change Password
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ChangePasswordForm;
