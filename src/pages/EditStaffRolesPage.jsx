import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  Chip,
  Stack,
  Typography,
  useTheme,
  Paper,
} from '@mui/material';
import Layout from '../components/Layout'; // Assuming you have a Layout component
import { styled } from '@mui/material/styles'; // Import styled
import { toast } from 'react-toastify';

// Styled component for the form container
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2, // Match the rounded corners of the example image
  boxShadow: theme.shadows[3], // Match the shadow of the example image
  marginTop: theme.spacing(3),
}));



const EditStaffRolesPage = () => {
  const { staffId } = useParams();

  const theme = useTheme();
  const [rolesName, setRolesName] = useState('');
  const [workspace, setWorkspace] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [userName, setUserName] = useState('');

  const [userStatus, setUserStatus] = useState('Active');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Dummy data for workspace options - Replace with fetched data
  const workspaceOptions = ['Facebook', 'Google', 'Amazon', 'Microsoft'];

  // Placeholder for data fetching logic - REPLACE THIS WITH YOUR ACTUAL FETCHING LOGIC
  const fetchStaffById = (id) => {
    // For now, return dummy data after a delay to simulate network request
    return new Promise((resolve) => {
      setTimeout(() => {
        const dummyStaffData = {
          id: id,
          rolesName: 'Workspace Manager',
          workspace: 'Facebook',
          tags: ['Date', 'Manager'],
          userName: 'Gaston Lapierre',
          userStatus: 'Active',
        };
        resolve({ data: dummyStaffData });
      }, 500); // Simulate network delay
    });
  };

  useEffect(() => {
    const loadStaffData = async () => {
      if (staffId) {
        // Add your actual data fetching logic here using staffId
        // Example: const response = await api.get(`/staff/${staffId}`);
        setLoading(true);
        setError(null);
        try {
          // Replace with your actual data fetching logic
          const response = await fetchStaffById(staffId);
          if (response && response.data) {
            const data = response.data;
            setRolesName(data.rolesName || '');
            setWorkspace(data.workspace || '');
            setTags(data.tags || []);
            setUserName(data.userName || '');
            setUserStatus(data.userStatus || 'Active');
           } else {
             setError('Staff data not found.');
             toast.error('Staff data not found.');
          }
        } catch (err) {
          console.error('Error fetching staff details:', err);
           setError('Failed to load staff data.');
          toast.error('Failed to load staff data.');
        } finally {
          setLoading(false);
        }
      }
    };

    loadStaffData();
  }, [staffId]);


  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleSave = () => {
    // Handle saving the data (e.g., send to backend)
    console.log('Saving Staff Roles:', {
      rolesName,
      workspace,
      tags,
      userName,
      userStatus,
    });
    // In a real application, you would send this data to your backend
    toast.success('Staff roles updated successfully!');
    // Optionally navigate back after saving
    // navigate('/admin/staff');
  };

   if (loading) {
    return <Layout>Loading staff details...</Layout>;
  }

  if (error) {
    return <Layout>Error: {error}</Layout>;
  }


  return (
    <Layout>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
         <Typography variant="h4" sx={{mt:2}} fontWeight="bold" gutterBottom>
            Edit Staff Roles
         </Typography>
        <FormContainer>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Roles Information
          </Typography>
          <Box component="form" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
            <TextField
              label="Roles Name"
              variant="outlined"
              fullWidth
              value={rolesName}
              onChange={(e) => setRolesName(e.target.value)}
              sx={{ gridColumn: { xs: 'span 1', sm: 'span 1' } }}
            />
            <FormControl variant="outlined" fullWidth sx={{ gridColumn: { xs: 'span 1', sm: 'span 1' } }}>
              <InputLabel>Add Workspace</InputLabel>
              <Select
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value)}
                label="Add Workspace"
              >
                {workspaceOptions.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Tag"
              variant="outlined"
              fullWidth
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              sx={{ gridColumn: { xs: 'span 1', sm: 'span 1' } }}
            />
             <TextField
              label="User Name"
              variant="outlined"
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              sx={{ gridColumn: { xs: 'span 1', sm: 'span 1' } }}
            />
            <Box sx={{ gridColumn: { xs: 'span 1', sm: 'span 2' }, mt: 1 }}>
               <Typography variant="subtitle1" gutterBottom>Tags</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleDeleteTag(tag)}
                    sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText }}
                  />
                ))}
              </Stack>
            </Box>


            <Box sx={{ gridColumn: { xs: 'span 1', sm: 'span 2' }, mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>User Status</Typography>
              <RadioGroup
                row
                value={userStatus}
                onChange={(e) => setUserStatus(e.target.value)}
              >
                <FormControlLabel value="Active" control={<Radio color="primary" />} label="Active" />
                <FormControlLabel value="In Active" control={<Radio color="primary" />} label="In Active" />
              </RadioGroup>
            </Box>
          </Box>
        </FormContainer>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              bgcolor: theme.palette.orange ? theme.palette.orange.main : '#ff9800', // Fallback color
              color: theme.palette.orange ? theme.palette.orange.contrastText : '#000', // Fallback color
               '&:hover': {
                bgcolor: theme.palette.orange ? theme.palette.orange.dark : '#f57c00', // Fallback color
               },
              padding: '10px 30px', // Match the button size in the image
               borderRadius: '20px', // Match the button shape in the image
            }}
          >
            Save Change
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default EditStaffRolesPage;