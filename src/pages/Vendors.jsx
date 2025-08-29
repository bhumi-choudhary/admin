import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  Tooltip,
  Chip,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  ErrorOutline as ErrorOutlineIcon,
  Group as GroupIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  WarningAmber as WarningAmberIcon,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "@mui/material/styles";

import { Link, useNavigate } from "react-router-dom";

function StatCard({ title, value, subtitle, icon, trend }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "1rem",
        background:
          "linear-gradient(145deg, rgba(227,242,253,1), rgba(187,222,251,1))",
        border: "1px solid rgba(2, 136, 209, 0.08)",
      }}
      className="shadow-md"
    >
      <CardContent className="flex items-center justify-between gap-4 p-5">
        <Box className="flex-1">
          <Typography variant="subtitle2" className="text-slate-600">
            {title}
          </Typography>
          <Box className="flex items-baseline gap-2 flex-wrap">
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" className="text-slate-500">
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Chip
                size="small"
                label={trend}
                color={trend.startsWith("▲") ? "success" : "error"}
                variant="outlined"
              />
            )}
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
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}

function Vendors() {
  const [month, setMonth] = useState("this-month");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);
  const rowsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const vendors = useMemo(
    () => [
      { id: "#WH-001", name: "Central Fulfillment", location: "123 Commerce St, NY", manager: "John Doe", contact: "+1 (555) 123-4567", stockAvailable: 6490, stockShipping: 3022, revenue: "$25,737" },
      { id: "#WH-002", name: "East Coast Hub", location: "456 Market Ave, NY", manager: "Jane Smith", contact: "+1 (555) 234-5678", stockAvailable: 7362, stockShipping: 4253, revenue: "$67,351" }, // Corrected syntax error
      { id: "#WH-003", name: "West Coast Depot", location: "789 Trade Blvd, CA", manager: "Richard Roe", contact: "+1 (555) 345-6789", stockAvailable: 8842, stockShipping: 3221, revenue: "$45,865" },
      { id: "#WH-004", name: "Southern Distribution", location: "101 Supply Rd, TX", manager: "Alice Johnson", contact: "+1 (555) 456-7890", stockAvailable: 5463, stockShipping: 2100, revenue: "$54,655" },
      { id: "#WH-005", name: "Northern Fulfillment", location: "202 Logistics Ln, IL", manager: "Michael Brown", contact: "+1 (555) 567-8901", stockAvailable: 12643, stockShipping: 7008, revenue: "$92,533" },
      { id: "#WH-006", name: "Midwest Center", location: "303 Central St, MO", manager: "Emily Davis", contact: "+1 (555) 678-9012", stockAvailable: 7553, stockShipping: 5600, revenue: "$43,898" },
      { id: "#WH-007", name: "Southeast Storage", location: "404 Storage Dr, FL", manager: "William Green", contact: "+1 (555) 789-0123", stockAvailable: 9381, stockShipping: 5343, revenue: "$76,909" },
      { id: "#WH-008", name: "Northwest Hub", location: "505 Commerce Pl, WA", manager: "Jessica White", contact: "+1 (555) 890-1234", stockAvailable: 6500, stockShipping: 3453, revenue: "$32,765" },
      { id: "#WH-009", name: "Southwest Fulfillment", location: "606 Trade Ave, AZ", manager: "Christopher Black", contact: "+1 (555) 901-2345", stockAvailable: 7555, stockShipping: 9000, revenue: "$67,565" },
      { id: "#WH-010", name: "Northeast Depot", location: "707 Distribution Rd, MA", manager: "Patricia Clark", contact: "+1 (555) 012-3456", stockAvailable: 5499, stockShipping: 3433, revenue: "$43,765" },
    ],
    []
  );

  // Filter vendors based on search term
  const filteredVendors = useMemo(() => {
    return vendors.filter(
      (vendor) =>
        vendor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [vendors, searchTerm]);


 


  const cardData = [
    { title: "Total Product Items", value: "3521", subtitle: "(Items)", icon: <GroupIcon /> }, // Changed icon for example
    { title: "In Stock Product", value: "1311", subtitle: "(Items)", icon: <CheckCircleOutlineIcon /> },
    { title: "Out Of Stock Product", value: "231", subtitle: "(Items)", icon: <ErrorOutlineIcon /> },
    { title: "Total Visited Customer", value: "2334", subtitle: "Last Week", icon: <GroupIcon />, trend: "▼ 4.5%" },
  ];

  const handleSelectAll = (e) => {
    // hook up selection state if needed
  };

  const handleDeleteClick = (vendor) => {
    setVendorToDelete(vendor);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setVendorToDelete(null);

    // yaha toast
    toast.success("Vendor deleted successfully!", {

    });
  };

  const handleViewDetails = (vendorId) => {
    navigate(`/admin/vendors-detail/${vendorId}`);
  };
  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: "#f4f6f9", minHeight: "100vh" }}>

      {/* Top stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 mt-4 sm:mt-10">
        {cardData.map((c, i) => (
          <StatCard key={i} {...c} />
        ))}
        </div>
      {/* Search Input */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <TextField
          label="Search Vendors"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: isMobile ? "100%" : "auto" }}
        />
      </Box>

      {/* Table header row with filter */}
      <Box className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 sm:gap-0">
        <Typography variant="h5" className="font-semibold">
          All Warehouse List
        </Typography>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Select month" }}
          >
            <MenuItem value="this-month">This Month</MenuItem>
            <MenuItem value="last-month">Last Month</MenuItem>
            <MenuItem value="this-year">This Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "14px",
          border: "1px solid rgba(2, 136, 209, 0.08)",
          overflowX: "auto", // allows horizontal scroll on small screens
        }}
        className="shadow"
      >
        <Table stickyHeader sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  fontSize: { xs: "0.65rem", sm: "0.85rem", md: "0.9rem" }, // responsive font
                },
              }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="default"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    "&.Mui-checked": { color: "rgba(255,255,255,0.9)" },
                  }}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Warehouse ID</TableCell>
              <TableCell>Warehouse Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Stock Available</TableCell>
              <TableCell>Stock Shipping</TableCell>
              <TableCell>Revenue</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredVendors
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((v) => (
                <TableRow
                  key={v.id}
                  hover
                  sx={{
                    "&:hover": { backgroundColor: "rgba(2,136,209,0.04)" },
                    fontSize: { xs: "0.7rem", sm: "0.85rem" }, // responsive font
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell>{v.id}</TableCell>
                  <TableCell>{v.name}</TableCell>
                  <TableCell>{v.location}</TableCell>
                  <TableCell>{v.manager}</TableCell>
                  <TableCell>{v.contact}</TableCell>
                  <TableCell>{v.stockAvailable.toLocaleString()}</TableCell>
                  <TableCell>{v.stockShipping.toLocaleString()}</TableCell>
                  <TableCell>{v.revenue}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      position: { xs: "static", sm: "sticky" },
                      right: 0,
                      bgcolor: { xs: "transparent", sm: "white" },
                      zIndex: 1,
                    }}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row" }} // stack buttons on mobile
                      spacing={1}
                      justifyContent="center"
                    >
                      <Tooltip title="View" arrow>
                        <IconButton size="small" color="info">
                          <VisibilityIcon fontSize="small" onClick={() => handleViewDetails(v.id)} />
                        </IconButton>
                      </Tooltip>
                      {/* <Tooltip title="Edit" arrow>
                        <IconButton size="small" color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip> */}
                      <Tooltip title="Delete" arrow>
                        <IconButton size="small" color="error">
                          <DeleteIcon
                            fontSize="small"
                            className="hover:scale-110 transition-transform duration-200"
                            onClick={() => handleDeleteClick(v)}
                          />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>


      {/* Pagination */}
      <Box className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2 sm:gap-0">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1.5 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-50"
        >
          Previous
        </button>
        <Pagination
          count={3} // Replace with actual total pages
          page={page}
          onChange={(_, val) => setPage(val)}
          color="primary"
          siblingCount={0}
        />
        <button
          onClick={() => setPage((p) => Math.min(3, p + 1))}
          className="px-3 py-1.5 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-50"
        >
          Next
        </button>
      </Box>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <DialogTitle id="delete-modal-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <Box className="flex items-center gap-3">
            <WarningAmberIcon color="error" sx={{ fontSize: 40 }} />
            <Typography id="delete-modal-description">
              Are you sure you want to delete vendor "{vendorToDelete?.name}"? This action cannot be undone.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseDeleteModal} className="px-4 py-2 rounded-md border text-slate-700 hover:bg-slate-100">Cancel</button>
          <button onClick={() => { /* Add delete logic here */ handleCloseDeleteModal(); }} className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600">Delete</button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Vendors;
