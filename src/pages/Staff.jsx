import React, { useState } from "react";
import {
  styled,
  Box,
  Typography,
  Paper,
  Grid,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TextField,
  MenuItem,
  Pagination,
  Chip,
  Avatar,
  AvatarGroup,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Button,
} from "@mui/material";

import { Group as GroupIcon, CheckCircleOutline as CheckCircleOutlineIcon, ErrorOutline as ErrorOutlineIcon } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// Dummy Staff Data
const staffData = [
  {
    id: 1,
    role: "Workspace Manager",
    workspace: {
      name: "Facebook",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg",
    },
    tags: ["Manager", "Product"],
    users: [
      { id: 101, avatarUrl: "https://i.pravatar.cc/150?img=1" },
      { id: 102, avatarUrl: "https://i.pravatar.cc/150?img=2" },
      { id: 103, avatarUrl: "https://i.pravatar.cc/150?img=3" },
    ],
    status: true,
  },
  {
    id: 2,
    role: "Product Owner",
    workspace: {
      name: "Slack",
      logoUrl: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg",
    },
    tags: ["Manager", "Product", "Data"],
    users: [
      { id: 104, avatarUrl: "https://i.pravatar.cc/150?img=4" },
      { id: 105, avatarUrl: "https://i.pravatar.cc/150?img=5" },
      { id: 106, avatarUrl: "https://i.pravatar.cc/150?img=6" },
      { id: 107, avatarUrl: "https://i.pravatar.cc/150?img=7" },
    ],
    status: true,
  },
];
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
const SummaryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  borderRadius: "1rem",
  background:
    "linear-gradient(145deg, rgba(227,242,253,1), rgba(187,222,251,1))",
  border: "1px solid rgba(2, 136, 209, 0.08)",
  boxShadow: theme.shadows[3],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
}));

function Staff() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const navigate = useNavigate();


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const rowsPerPage = 5;

  // Filter + Search Logic
  const filteredData = staffData.filter((staff) => {
    const matchesSearch =
      staff.role.toLowerCase().includes(search.toLowerCase()) ||
      staff.workspace.name.toLowerCase().includes(search.toLowerCase()) ||
      staff.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" ? staff.status : !staff.status);
    return matchesSearch && matchesStatus;
  });

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Summary Cards
  const totalStaff = staffData.length;
  const activeStaff = staffData.filter((s) => s.status).length;
  const inactiveStaff = staffData.filter((s) => !s.status).length;
  const totalWorkspaces = new Set(staffData.map(s => s.workspace.name)).size;

  // Delete Confirmation
  const handleDeleteClick = (staff) => {
    setStaffToDelete(staff);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    setOpenDialog(false);
    toast.success(`Deleted ${staffToDelete?.role} successfully!`, {
      position: "top-right",
      autoClose: 3000,
    });
    console.log("Deleted:", staffToDelete);
    setStaffToDelete(null);
  };

  const handleViewDetails = (staffId) => {
    navigate(`/admin/staff/view/${staffId}`);
  };

  // Cards Data with Icons
  const summaryCardsData = [
    { title: "Total Staff", value: totalStaff, icon: <GroupIcon fontSize="large" /> },
    { title: "Active Staff", value: activeStaff, icon: <CheckCircleOutlineIcon fontSize="large" /> },
    { title: "Inactive Staff", value: inactiveStaff, icon: <ErrorOutlineIcon fontSize="large" /> },
    { title: "Workspaces", value: totalWorkspaces, icon: <GroupIcon fontSize="large" /> },
  ];

  const handleEditClick = (staffId) => {
    navigate(`/admin/staff/edit/${staffId}`);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f9ff", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{mt:5}} fontWeight="bold" gutterBottom>
        Staff Management
      </Typography>

      {/* Top Summary Cards */}
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
        {summaryCardsData.map((card, i) => (
          <SummaryCard key={i} elevation={0}>
            <CardContent className="flex items-center justify-between gap-4 p-5">
              <Box className="flex-1">
                <Typography variant="subtitle2" className="text-slate-600">
                  {card.title}
                </Typography>
                <Box className="flex items-baseline gap-2 flex-wrap">
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    {card.value}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: "12px",
                  bgcolor: "rgba(2,136,209,0.08)",
                  color: "primary.main",
                }}
              >
                {card.icon}
              </Box>
            </CardContent>
          </SummaryCard>
        ))}
      </Box>

      {/* Search + Filter + Add */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
          <Grid item xs={12} sm={4} md={3}>
            <TextField
              label="Search Staff"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <TextField
              select
              label="Filter by Status"
              fullWidth
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <Button variant="contained"  color="primary" fullWidth onClick={() => navigate('/admin/add-staff')}>
              + Add Staff
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Staff Table */}
      <Paper sx={{ borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
              <TableRow>
                <TableCell sx={{ py: 1.5 }}><b>Role</b></TableCell>
                <TableCell sx={{ py: 1.5 }}><b>Workspace</b></TableCell>
                <TableCell sx={{ py: 1.5 }}><b>Tags</b></TableCell>
                <TableCell sx={{ py: 1.5 }}><b>Users</b></TableCell>
                <TableCell sx={{ py: 1.5 }}><b>Status</b></TableCell>
                <TableCell sx={{ py: 1.5 }} align="center"><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((staff) => (
                <TableRow key={staff.id} hover>
                  <TableCell sx={{ py: 1.5 }}>{staff.role}</TableCell>
                  <TableCell sx={{ py: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                    {staff.workspace.logoUrl && (
                      <Avatar src={staff.workspace.logoUrl} sx={{ width: 30, height: 30 }} />
                    )}
                    {staff.workspace.name}
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {staff.tags.map((tag, idx) => (
                        <Chip key={idx} label={tag} size="small" />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <AvatarGroup max={4}>
                      {staff.users.map((user) => (
                        <Avatar key={user.id} src={user.avatarUrl} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <Chip
                      label={staff.status ? "Active" : "Inactive"}
                      color={staff.status ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }} align="center">
                    <IconButton color="primary" size="small">
                      <Visibility onClick={() => handleViewDetails(staff.id)} />
                    </IconButton>
                    {/* <IconButton color="primary" size="small">
                      <Edit onClick={() => handleEditClick(staff.id)} />
                    </IconButton> */}
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(staff)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 2 }}>
                    No staff found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Paper>

      {/* Delete Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <b>{staffToDelete?.role}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />

    </Box>
  );
}

export default Staff;
