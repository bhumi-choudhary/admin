import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Grid, Divider } from '@mui/material';
import { useSnackbar } from 'notistack';

function Settings() {
  const { enqueueSnackbar } = useSnackbar();

  const [profileData, setProfileData] = useState({
    fullName: 'Admin Name',
    email: 'admin@example.com',
    phone: '123-456-7890',
    role: 'Super Admin',
    department: 'IT',
    address: '123 Admin St, Admin City, Country',
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    enqueueSnackbar('Settings saved successfully!', { variant: 'success' });
  };

  const handleCancel = () => {
    setProfileData({
      fullName: 'Admin Name',
      email: 'admin@example.com',
      phone: '123-456-7890',
      role: 'Super Admin',
      department: 'IT',
      address: '123 Admin St, Admin City, Country',
    });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    enqueueSnackbar('Changes cancelled.', { variant: 'info' });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center', mt: 5 }}>
        Settings
      </Typography>

      {/* Profile Card */}
      <Paper elevation={4} sx={{ p: 4, mb: 4, width: '100%', maxWidth: 800, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Profile Details
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {Object.keys(profileData).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                label={key.replace(/([A-Z])/g, ' $1').trim()}
                name={key}
                value={profileData[key]}
                onChange={handleProfileInputChange}
                variant="outlined"
                size="small"
                disabled={key === 'email' || key === 'role'}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Change Password Card */}
      <Paper elevation={4} sx={{ p: 4, mb: 4, width: '100%', maxWidth: 800, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Change Password
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              variant="outlined"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              variant="outlined"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Settings;
