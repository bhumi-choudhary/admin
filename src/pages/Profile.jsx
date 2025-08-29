import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

import ProfileDetails from '../components/ProfileDetails';



const Profile = () => {
  return (
    <Box sx={{ padding: 3, flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3,mt:5 }}>
        Admin Profile
      </Typography>
      <ProfileDetails />
    </Box>
  );
};

export default Profile;