import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  overflow: "hidden",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
}));

function ProfileDetails() {
  const theme = useTheme();

  const admin = {
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 9876543210",
    role: "Super Admin",
    department: "IT & Security",
    dateOfJoining: "2022-05-10",
    status: "Active",
    address: "123 Admin Street, Tech City, India",
    lastLogin: "2025-08-28 09:15 AM",
    employeeId: "#EMP10234",
    designation: "Head of IT",
    manager: "Jane Smith",
    officeLocation: "Bangalore HQ",
    bloodGroup: "O+",
  };

  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const storedProfilePicture = localStorage.getItem("profilePictureUrl");
    if (storedProfilePicture) {
      setProfilePicture(storedProfilePicture);
    }
  }, []);

  const productData = [
    { id: "#P001", name: "Laptop Pro 15", sales: 320, stock: 15 },
    { id: "#P002", name: "Wireless Mouse", sales: 210, stock: 40 },
    { id: "#P003", name: "Bluetooth Headset", sales: 185, stock: 25 },
    { id: "#P004", name: "Smartphone X", sales: 410, stock: 8 },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, width: "100%" }}>
      <StyledCard>
        {/* Top Header Strip */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #2196f3, #21cbf3)",
            height: 100,
          }}
        />

        <CardContent sx={{ mt: -10 }}>
          <Grid container spacing={4}>
            {/* Avatar & Basic Info */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Avatar
                alt={admin.fullName}
                src={
                  profilePicture ||
                  "https://randomuser.me/api/portraits/men/75.jpg"
                }
                sx={{
                  width: 150,
                  height: 150,
                  mb: 2,
                  border: "5px solid #fff",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                  bgcolor: "primary.light",
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {admin.fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {admin.role}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  bgcolor: "success.light",
                  color: "success.dark",
                  fontWeight: 600,
                }}
              >
                {admin.status}
              </Typography>
            </Grid>

            {/* Detailed Info */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                {[
                  { label: "Employee ID", value: admin.employeeId },
                  { label: "Designation", value: admin.designation },
                  { label: "Department", value: admin.department },
                  { label: "Manager", value: admin.manager },
                  { label: "Email Address", value: admin.email },
                  { label: "Phone Number", value: admin.phone },
                  { label: "Office Location", value: admin.officeLocation },
                  { label: "Date of Joining", value: admin.dateOfJoining },
                  { label: "Blood Group", value: admin.bloodGroup },
                  { label: "Address", value: admin.address },
                  { label: "Last Login", value: admin.lastLogin },
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "grey.50",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 500, mb: 0.5 }}
                        color="text.secondary"
                      >
                        {item.label}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>

      {/* Product Summary Table */}
      <StyledCard>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 700, color: "primary.main" }}
          >
            Product Summary
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Product ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Sales</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.sales}</TableCell>
                  <TableCell>{row.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </StyledCard>
    </Box>
  );
}

export default ProfileDetails;
