import React, { useState, useContext, useRef } from 'react';
import { EyeIcon, PencilIcon, TrashIcon, StarIcon } from '@heroicons/react/24/solid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import { ProductContext } from '../contexts/ProductContext';
import { IconButton, TextField, useMediaQuery, useTheme, Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
function Products() {
  const navigate = useNavigate();
  const { products, deleteProduct } = useContext(ProductContext);
  const productsTableRef = useRef(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7); // Set limit to 7 items per page
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(products.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (e, productId) => {
    if (e.target.checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const isProductSelected = (productId) => selectedProducts.includes(productId);

  const handleOpenDialog = (productId) => {
    setProductToDelete(productId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setProductToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete);
      toast.success('Product deleted successfully!');
    }
    handleCloseDialog();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const filteredProducts = (Array.isArray(products) ? products : []).filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">


      <ToastContainer position="top-right" autoClose={5000} />
      <div className="rounded-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 mt-3 flex-wrap gap-4">
          {/* Left Side Heading */}
          <h2 className="text-3xl font-bold text-gray-800">All Product List</h2>

          {/* Right Side Search + Button */}
          <div className="flex items-center gap-4 flex-wrap">
            <TextField
              label="Search Products"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ minWidth: 220 }}
            />

            <button
              className="bg-blue-500 hover:bg-blue-700 shadow-md text-white font-semibold py-2 px-5 rounded-xl transition duration-200"
              onClick={() => navigate('/admin/add-product')}
            >
              Add Product
            </button>
          </div>
        </div>


        {/* Table */}
        <div className="overflow-x-auto" ref={productsTableRef}>
          <div className="rounded-xl overflow-hidden">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white uppercase text-sm font-semibold">
                  <th className="py-3 px-6 text-left">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded"
                      onChange={handleSelectAll}
                      checked={selectedProducts.length === products.length && products.length > 0}
                    />
                  </th>
                  <th className="py-3 px-6 text-left">Product</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Stock</th>
                  <th className="py-3 px-6 text-left">Category</th>
                  <th className="py-3 px-6 text-center">Rating</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {filteredProducts
                  .slice((page - 1) * rowsPerPage, page * rowsPerPage) // Slice data for current page
                  .map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100 hover:bg-blue-50 transition duration-200"
                    >
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded"
                          checked={isProductSelected(product.id)}
                          onChange={(e) => handleSelectProduct(e, product.id)}
                        />
                      </td>
                      <td className="py-4 px-6 flex items-center">
                        <img
                          src={product.image || 'https://sp.yimg.com/ib/th/id/OIP.fLToAFZjw4l7mIZGyaPR3QHaLH?pid=Api&w=148&h=148&c=7&dpr=2&rs=1'}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg shadow mr-4"
                        />
                        <div>
                          <p className="font-bold text-gray-900">{product.name}</p>
                          <p className="text-gray-500 text-xs">
                            {product.sizes?.length > 0 ? `Size: ${product.sizes.join(', ')}` : 'No sizes specified'}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-gray-800">${product.price.toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <p className="text-blue-600 font-medium">{product.stockLeft} Left</p>
                        <p className="text-gray-500 text-xs">{product.sold} Sold</p>
                      </td>
                      <td className="py-4 px-6">{product.category}</td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="font-semibold text-gray-800">{product.rating}</span>
                          <span className="text-gray-500 text-xs ml-1">({product.reviews} Reviews)</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <IconButton color="primary" size="large" onClick={() => navigate(`/admin/products-detail/${product.id}`)}>
                            <EyeIcon className="w-4 h-4" />
                          </IconButton>
                          <IconButton color="warning" size="large" onClick={() => navigate(`/admin/edit-product/${product.id}`)}>
                            <PencilIcon className="w-4 h-4" />
                          </IconButton>
                          <IconButton color="error" size="large" onClick={() => handleOpenDialog(product.id)}>
                            <TrashIcon className="w-4 h-4" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={Math.ceil(filteredProducts.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Products;
