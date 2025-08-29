import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import PaidIcon from "@mui/icons-material/Paid";
import WcIcon from "@mui/icons-material/Wc";
import CakeIcon from "@mui/icons-material/Cake";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ViewStaff = () => {
  const { staffId } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  // ✅ Dummy Staff Data
  const staffDetails = {
    id: staffId,
    name: `Staff Member ${staffId}`,
    email: `staff${staffId}@example.com`,
    phone: "9876543210",
    role: staffId % 2 === 0 ? "Administrator" : "Support Staff",
    department: staffId % 2 === 0 ? "Operations" : "Customer Support",
    address: "Office No. 5, Jaipur, Rajasthan",
    status: staffId % 2 === 0 ? "Active" : "Inactive",
    joinedDate: "2022-05-12",
    salary: "₹45,000 / month",
    gender: staffId % 2 === 0 ? "Male" : "Female",
    dob: "1995-08-20",
    users: [
      { id: 1, name: "Customer A", email: "a@example.com" },
      { id: 2, name: "Customer B", email: "b@example.com" },
      { id: 3, name: "Customer C", email: "c@example.com" },
      { id: 4, name: "Customer D", email: "d@example.com" },
    ],
  };

  // ✅ Pagination Handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        padding: { xs: 2, md: 4 },
        mt: 2,
        minHeight: "100vh",
      }}
    >
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
        variant="contained"
        color="primary"
      >
        Back
      </Button>

      {/* Title */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "primary.main",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        Staff Profile
      </Typography>

      {/* Profile Card */}
      <Paper
        sx={{
          padding: { xs: 3, md: 5 },
          borderRadius: 3,
          boxShadow: 6,
          maxWidth: "950px",
          margin: "auto",
        }}
      >
        {/* Avatar & Name */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Avatar sx={{ bgcolor: "primary.main", width: 90, height: 90, mb: 2 }}>
            <PersonIcon fontSize="large" />
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {staffDetails.name}
          </Typography>
          <Chip
            icon={<VerifiedUserIcon />}
            label={staffDetails.status}
            color={staffDetails.status === "Active" ? "success" : "error"}
            sx={{ mt: 1, fontWeight: "bold" }}
          />
        </Box>

        {/* Staff Info */}
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" mb={1}>
              <BadgeIcon sx={{ color: "primary.main", mr: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Staff ID:
              </Typography>
            </Box>
            <Typography color="text.secondary" mb={2}>
              {staffDetails.id}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box display="flex" alignItems="center" mb={1}>
              <WorkIcon sx={{ color: "primary.main", mr: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Role:
              </Typography>
            </Box>
            <Typography color="text.secondary" mb={2}>
              {staffDetails.role}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box display="flex" alignItems="center" mb={1}>
              <WorkIcon sx={{ color: "primary.main", mr: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Department:
              </Typography>
            </Box>
            <Typography color="text.secondary" mb={2}>
              {staffDetails.department}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box display="flex" alignItems="center" mb={1}>
              <EmailIcon sx={{ color: "primary.main", mr: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Email:
              </Typography>
            </Box>
            <Typography color="text.secondary" mb={2}>
              {staffDetails.email}
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" mb={1}>
              <PhoneIcon sx={{ color: "primary.main", mr: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Phone:
              </Typography>
            </Box>
            <Typography color="text.secondary" mb={2}>
              {staffDetails.phone}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box display="flex" alignItems="center" mb={1}>
              <HomeIcon sx={{ color: "primary.main", mr: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Address:
              </Typography>
            </Box>
            <Typography color="text.secondary" mb={2}>
              {staffDetails.address}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box display="flex" alignItems="center" mb={1}>
              <EventIcon sx={{ color: "primary.main", mr: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Joined Date:
              </Typography>
            </Box>
            <Typography color="text.secondary" mb={2}>
              {staffDetails.joinedDate}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box display="flex" alignItems="center" mb={1}>
              <PaidIcon sx={{ color: "primary.main", mr: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Salary:
              </Typography>
            </Box>
            <Typography color="text.secondary" mb={2}>
              {staffDetails.salary}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box display="flex" alignItems="center" mb={1}>
              <WcIcon sx={{ color: "primary.main", mr: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Gender:
              </Typography>
            </Box>
            <Typography color="text.secondary" mb={2}>
              {staffDetails.gender}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box display="flex" alignItems="center" mb={1}>
              <CakeIcon sx={{ color: "primary.main", mr: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Date of Birth:
              </Typography>
            </Box>
            <Typography color="text.secondary">{staffDetails.dob}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Assigned Users */}
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
        >
          <GroupIcon sx={{ mr: 1, color: "primary.main" }} /> Assigned Users (
          {staffDetails.users.length})
        </Typography>

        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffDetails.users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() =>
                          navigate(`/admin/customer/view/${user.id}`)
                        }
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10]}
            component="div"
            count={staffDetails.users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ViewStaff;
