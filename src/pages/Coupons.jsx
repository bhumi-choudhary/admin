import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  Pagination,
  Box,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@mui/material/styles";

const Coupons = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Black T-shirt",
      category: "Fashion",
      price: "$80.00",
      discount: "$20.00",
      code: "FASHION123",
      startDate: "12 May 2023",
      endDate: "12 Jun 2023",
      status: "Active",
      image: "https://m.media-amazon.com/images/I/717uJwrIUDL._SY879_.jpg",
    },
    {
      id: 2,
      name: "Olive Green Leather Bag",
      category: "Hand Bag",
      price: "$135.00",
      discount: "$37.00",
      code: "SUMMER24",
      startDate: "19 July 2023",
      endDate: "23 Aug 2023",
      status: "Expired",
      image: "https://m.media-amazon.com/images/I/717uJwrIUDL._SY879_.jpg",
    },
    {
      id: 3,
      name: "Women Golden Dress",
      category: "Fashion",
      price: "$219.00",
      discount: "$20.00",
      code: "FASHION123",
      startDate: "24 Aug 2023",
      endDate: "20 Sep 2023",
      status: "Active",
      image: "https://m.media-amazon.com/images/I/717uJwrIUDL._SY879_.jpg",
    },
    {
      id: 4,
      name: "Gray Cap For Men",
      category: "Cap",
      price: "$75.00",
      discount: "$12.00",
      code: "CODE000",
      startDate: "30 Dec 2023",
      endDate: "17 Jan 2024",
      status: "Active",
      image: "https://m.media-amazon.com/images/I/717uJwrIUDL._SY879_.jpg",
    },
  ];

  const [page, setPage] = useState(1);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filteredProducts = products.filter(coupon =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white mt-10">
        {/* Card 1 */}
        <div className="bg-orange-50 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-800">4 Coupons</h3>
          <p className="text-gray-600 text-sm mb-3">
            Small nice summer coupons pack
          </p>
          <p className="text-2xl font-bold text-orange-500 mb-3">$140.00</p>
          <Button
            variant="contained"
            className="!bg-orange-500 hover:!bg-orange-600 !text-white !px-5 !rounded-lg !mb-3"
          >
            Buy Now
          </Button>
          <p className="text-sm text-gray-600">Duration : 1 Year</p>
        </div>

        {/* Card 2 */}
        <div className="bg-teal-50 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-800">8 Coupons</h3>
          <p className="text-gray-600 text-sm mb-3">
            Medium nice summer coupons pack
          </p>
          <p className="text-2xl font-bold text-teal-500 mb-3">$235.00</p>
          <Button
            variant="contained"
            className="!bg-teal-500 hover:!bg-teal-600 !text-white !px-5 !rounded-lg !mb-3"
          >
            Buy Now
          </Button>
          <p className="text-sm text-gray-600">Duration : 1 Year</p>
        </div>

        {/* Card 3 */}
        <div className="relative bg-orange-50 rounded-xl shadow-md p-6 hover:shadow-lg transition overflow-hidden">
          <h3 className="flex items-center text-lg font-semibold text-gray-800">
            <span className="text-2xl mr-2">🛍️</span>
            30% Special discounts for customers
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            25 November - 2 December
          </p>
          <Button
            variant="contained"
            className="!bg-orange-500 hover:!bg-orange-600 !text-white !px-5 !rounded-lg"
          >
            View Plan
          </Button>

          {/* Decorative circles */}
          <div className="absolute left-[-30px] top-[-30px] h-32 w-32 bg-sky-300 rounded-full opacity-30"></div>
          <div className="absolute right-[-30px] bottom-[-30px] h-32 w-32 bg-sky-300 rounded-full opacity-30"></div>
        </div>
      </div>

      <Container maxWidth="xl" className="py-6">
        {/* Product Table */}
        <Paper elevation={1} className="p-4 rounded-xl shadow-md overflow-x-auto">
          {/* Header with title + search + add button */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            flexDirection={isMobile ? "column" : "row"}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: isMobile ? 2 : 0 }}
            >
              All Product List
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: isMobile ? "100%" : "auto",
                justifyContent: isMobile ? "center" : "flex-end",
              }}
            >
              <TextField
                label="Search Coupons"
                placeholder="Search coupons..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: isMobile ? "100%" : "250px" }}
              />
              <Button
                variant="contained"
                color="primary"
                className="!rounded-lg"
                onClick={() => navigate("/admin/add-coupon")}
              >
                Add Coupon
              </Button>
            </Box>
          </Box>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>Product Name & Type</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <div>
                          <Typography variant="body1" className="font-medium">
                            {product.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className="text-sm"
                          >
                            {product.category}
                          </Typography>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.discount}</TableCell>
                    <TableCell>{product.code}</TableCell>
                    <TableCell>{product.startDate}</TableCell>
                    <TableCell>{product.endDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={product.status}
                        color={product.status === "Active" ? "success" : "error"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex items-center justify-center gap-2">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => navigate(`/admin/products-detail/${product.id}`)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="warning"
                          onClick={() => navigate(`/admin/edit-product/${product.id}`)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            setProductIdToDelete(product.id);
                            setOpenDeleteDialog(true);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <div className="flex justify-end mt-4">
            <Pagination
              count={3}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </div>
        </Paper>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to delete this product? This action cannot be undone.
            </Typography>
            <div className="flex justify-end gap-3 mt-4">
              <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log(`Deleting product with ID: ${productIdToDelete}`);
                  setOpenDeleteDialog(false);
                }}
                color="error"
                variant="contained"
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default Coupons;
