import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
  Alert,
  Divider,
  Chip,
  Stack,
} from "@mui/material";

const ViewInvoice = () => {
  const { invoiceId } = useParams();

  // Dummy Data
  const invoice = {
    id: invoiceId || "#INV-075867/90",
    issueDate: "23 April 2024",
    dueDate: "26 April 2024",
    amount: "$737.00",
    status: "Paid",
    from: {
      name: "Larkon Admin.INC",
      address: "2437 Romano Street Cambridge, MA 02141",
      phone: "+(3178) 4171-2004",
      email: "JulianeKuhn@jourrapide.com",
    },
    to: {
      name: "Gaston Lapierre",
      address: "1344 Hershell Hollow Road WA 98168, USA",
      phone: "+(123) 732-760-5760",
      email: "hello@dundermuffin.com",
    },
    items: [
      {
        id: 1,
        name: "Men Black Slim Fit T-shirt",
        size: "M",
        qty: 1,
        price: 80,
        tax: 3,
        total: 83,
        img: "https://i.ibb.co/z7d7M6H/tshirt.png",
      },
      {
        id: 2,
        name: "Dark Green Cargo Pant",
        size: "M",
        qty: 3,
        price: 110,
        tax: 4,
        total: 330,
        img: "https://i.ibb.co/DkG9tr5/pants.png",
      },
      {
        id: 3,
        name: "Men Dark Brown Wallet",
        size: "S",
        qty: 1,
        price: 132,
        tax: 5,
        total: 137,
        img: "https://i.ibb.co/1ZPhtnY/wallet.png",
      },
      {
        id: 4,
        name: "Kid’s Yellow T-shirt",
        size: "S",
        qty: 2,
        price: 110,
        tax: 5,
        total: 223,
        img: "https://i.ibb.co/1MK0CY0/kids-tshirt.png",
      },
    ],
    subtotal: 777,
    discount: -60,
    estimatedTax: 20,
    grandTotal: 737,
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box className="p-4 md:p-8 mt-10 bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full max-w-5xl flex justify-start mb-4">
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-xl transition duration-200"
          onClick={() => window.history.back()}
        >
          Back to Products
        </button>
      </div>

      <Paper className="w-full max-w-5xl p-6 md:p-10 rounded-2xl shadow-md bg-white invoice-print">
        {/* Header */}
        <Box className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Left */}
          <Box>
            <Typography variant="h5" className="font-bold text-orange-600">
              Larkon
            </Typography>
            <Typography variant="body1" className="font-semibold mt-2">
              Larkon Admin.
            </Typography>
            <Typography className="text-gray-600">
              1729 Bangor St, Houlton, ME, 04730
            </Typography>
            <Typography className="text-gray-600">
              Phone: +1(242)-532-9199
            </Typography>
          </Box>

          {/* Center */}
          <Box className="flex flex-col items-center justify-center bg-cyan-50 rounded-lg p-4">
            <Chip
              label={invoice.status}
              color="success"
              sx={{ fontWeight: "bold", mb: 1 }}
            />
            <Typography className="text-sm text-gray-500">
              Invoice : {invoice.id}
            </Typography>
            <Typography className="text-sm text-gray-500">
              Issue Date: {invoice.issueDate}
            </Typography>
            <Typography className="text-sm text-gray-500">
              Due Date: {invoice.dueDate}
            </Typography>
            <Typography className="text-sm text-gray-500">
              Amount: {invoice.amount}
            </Typography>
          </Box>

          {/* Right */}
          <Box>
            <Typography variant="subtitle1" className="font-semibold">
              Issue For:
            </Typography>
            <Typography className="text-gray-800 font-medium">
              {invoice.to.name}
            </Typography>
            <Typography className="text-gray-600">{invoice.to.address}</Typography>
            <Typography className="text-gray-600">
              Phone: {invoice.to.phone}
            </Typography>
            <Typography className="text-gray-600">
              Email: {invoice.to.email}
            </Typography>
          </Box>
        </Box>

        <Divider className="my-6" />

        {/* Products Table */}
        <TableContainer component={Paper} className="overflow-x-auto rounded-lg">
          <Table size="small">
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Tax</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoice.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Box className="flex items-center space-x-3">
                      <Avatar
                        src={item.img}
                        variant="rounded"
                        sx={{ width: 48, height: 48 }}
                      />
                      <Box>
                        <Typography className="font-medium">{item.name}</Typography>
                        <Typography variant="caption" className="text-gray-500">
                          Size: {item.size}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>${item.tax.toFixed(2)}</TableCell>
                  <TableCell>${item.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Totals */}
        <Box className="flex justify-end mt-6">
          <Box className="w-full md:w-1/3 space-y-2">
            <Box className="flex justify-between text-gray-600">
              <span>Sub Total:</span>
              <span>${invoice.subtotal.toFixed(2)}</span>
            </Box>
            <Box className="flex justify-between text-gray-600">
              <span>Discount:</span>
              <span>${invoice.discount.toFixed(2)}</span>
            </Box>
            <Box className="flex justify-between text-gray-600">
              <span>Estimated Tax:</span>
              <span>${invoice.estimatedTax.toFixed(2)}</span>
            </Box>
            <Divider />
            <Box className="flex justify-between font-bold text-gray-800">
              <span>Grand Total:</span>
              <span>${invoice.grandTotal.toFixed(2)}</span>
            </Box>
          </Box>
        </Box>

        <Alert severity="error" className="mt-6 rounded-lg">
          All accounts are to be paid within 7 days from receipt of invoice. If
          not, credits details supplied as confirmation of work undertaken will
          be charged the agreed quoted fee noted above.
        </Alert>

        {/* Actions */}
        <Box className="mt-8 flex justify-end">
          <Stack direction="row" spacing={4}>
            <Button variant="contained" color="info" onClick={handlePrint}>
              Print
            </Button>
            <Button variant="outlined" color="error">
              Submit
            </Button>
          </Stack>
        </Box>

      </Paper>

      {/* Print CSS */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }

            .invoice-print, .invoice-print * {
              visibility: visible;
            }

            .invoice-print {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }

            /* Buttons hide */
            .invoice-print button {
              display: none;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default ViewInvoice;
