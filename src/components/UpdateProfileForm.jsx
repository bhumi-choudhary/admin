import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';

const UpdateProfileForm = () => {
  const [formData, setFormData] = useState({
    name: 'Admin Name',
    email: 'admin@example.com',
    phone: '123-456-7890',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    alert('Profile update (placeholder): Check console for data.');
  };

  return (
    <Box
      sx={{
        mt: 5,
        display: 'flex',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper
        sx={{
          p: { xs: 3, sm: 5 },
          width: '100%',
          maxWidth: 800,
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 600, textAlign: 'center', mb: 4 }}
        >
          Update Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 2 },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 2 },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 2 },
                }}
              />
            </Grid>
            {/* Add more inputs like Address, Role, etc. */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  py: 1.2,
                  fontWeight: 600,
                  fontSize: 12,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': { backgroundColor: '#1976d2' },
                }}
              >
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default UpdateProfileForm;
