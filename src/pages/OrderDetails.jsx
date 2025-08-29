import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  Box,
  Divider,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CheckCircle as ConfirmedIcon,
  CreditCard as PaymentIcon,
  Inventory2 as ProcessingIcon,
  LocalShipping as ShippingIcon,
  TaskAlt as DeliveredIcon,
} from "@mui/icons-material";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  marginBottom: theme.spacing(3),
}));
const ProductImage = styled("img")({
  width: 70,
  height: 70,
  borderRadius: 12,
  objectFit: "cover",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
});

const StatusChip = styled(Chip)(({ status }) => {
  let color = "#2563eb"; // default blue
  if (status === "Ready") color = "#16a34a"; // green
  if (status === "Packaging") color = "#f59e0b"; // yellow
  if (status === "Cancelled") color = "#dc2626"; // red

  return {
    backgroundColor: color,
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "8px",
  };
});

const OrderDetails = () => {
  const orderDetails = {
    id: "#0758267/90",
    status: "Processing",
    date: "April 23, 2024",
    time: "6:23 PM",
    estimatedShip: "Apr 25, 2024",
    products: [
      {
        id: 1,
        image: "https://m.media-amazon.com/images/I/817ILrKnthL._SX569_.jpg",
        name: "Men Black Slim Fit T-shirt",
        size: "M",
        quantity: 1,
        price: 80,
        tax: 3,
        total: 83,
        status: "Ready",
      },
      {
        id: 2,
        image: "https://m.media-amazon.com/images/I/817ILrKnthL._SX569_.jpg",
        name: "Dark Green Cargo Pant",
        size: "M",
        quantity: 3,
        price: 330,
        tax: 4,
        total: 334,
        status: "Packaging",
      },
      {
        id: 3,
        image: "https://m.media-amazon.com/images/I/817ILrKnthL._SX569_.jpg",
        name: "Men Dark Brown Wallet",
        size: "S",
        quantity: 1,
        price: 132,
        tax: 5,
        total: 137,
        status: "Ready",
      },
      {
        id: 4,
        image: "https://m.media-amazon.com/images/I/817ILrKnthL._SX569_.jpg",
        name: "Kid's Yellow T-shirt",
        size: "S",
        quantity: 2,
        price: 220,
        tax: 3,
        total: 223,
        status: "Packaging",
      },
    ],
    summary: {
      subtotal: 777,
      discount: 60,
      delivery: 0,
      tax: 20,
      finalTotal: 737,
    },
    payment: {
      method: "Master Card",
      status: "Paid",
      transactionId: "IN00475843195095",
      cardHolder: "Gaston Lapierre",
    },
    customer: {
      name: "Gaston Lapierre",
      email: "hello@dudemuffin.com",
      contact: "(723) 732-7560",
      shippingAddress: "1344 Hershell Hollow Road, Tukwila, WA 98168, United States",
    },
    timeline: [
      {
        status: "Order Confirmed",
        time: "April 23, 2024, 09:40 am",
        icon: <ConfirmedIcon color="primary" />,
      },
      {
        status: "Order Payment",
        time: "April 23, 2024, 09:40 am",
        icon: <PaymentIcon color="primary" />,
      },
      {
        status: "Invoice Created",
        time: "April 23, 2024, 09:40 am",
        icon: <ProcessingIcon color="primary" />,
      },
      {
        status: "Packing Started",
        time: "April 23, 2024, 09:40 am",
        icon: <ShippingIcon color="primary" />,
      },
    ],
  };

  const steps = ["Order Confirming", "Payment Pending", "Processing", "Shipping", "Delivered"];
  const getActiveStep = (status) => {
    switch (status) {
      case "Order Confirming": return 0;
      case "Payment Pending": return 1;
      case "Processing": return 2;
      case "Shipping": return 3;
      case "Delivered": return 4;
      default: return 2;
    }
  };

  return (
    <Container maxWidth="xl" className="mt-6 mb-6">
       <div className="flex justify-start mb-4">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-xl  transition duration-200 mt-10"
            onClick={() =>  window.history.back() }
          >
            Back to Orders
          </button>
        </div>
      {/* Header */}
      <StyledCard>
        <CardContent>
          <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-15 ">
            <Box>
              <Typography variant="h6" fontWeight="bold" className="flex items-center gap-2">
              Order id :  {orderDetails.id}
                <Chip label="In Progress" color="primary" size="small" />
              </Typography>
              <Typography variant="body2" color="textSecondary" className="mt-1">
                Order Date: {orderDetails.date} at {orderDetails.time}
              </Typography>
              <Typography variant="body2" className="mt-1">
                Estimated Shipping Date: <strong>{orderDetails.estimatedShip}</strong>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </StyledCard>


      {/* Stepper */}
      <StyledCard>
        <CardContent>
          <Stepper activeStep={getActiveStep(orderDetails.status)} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </StyledCard>

      <Grid container spacing={3}>
        {/* Product List */}
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Products
              </Typography>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 text-sm">
                    <th className="text-left p-3">Product</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Qty</th>
                    <th className="text-left p-3">Price</th>
                    <th className="text-left p-3">Tax</th>
                    <th className="text-left p-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.products.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-3">
                        <Box display="flex" alignItems="center" gap={2}>
                          <ProductImage src={item.image} alt={item.name} />
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {item.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="textSecondary"
                            >
                              Size: {item.size}
                            </Typography>
                          </Box>
                        </Box>
                      </td>
                      <td className="p-3">
                        <StatusChip
                          label={item.status}
                          status={item.status}
                          size="small"
                        />
                      </td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3">${item.price.toFixed(2)}</td>
                      <td className="p-3">${item.tax.toFixed(2)}</td>
                      <td className="p-3 font-semibold">
                        ${item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>

          </StyledCard>

          {/* Timeline */}
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">Order Timeline</Typography>
              {orderDetails.timeline.map((e, i) => (
                <Box key={i} className="flex items-start mb-3">
                  <Box className="mr-2">{e.icon}</Box>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">{e.status}</Typography>
                    <Typography variant="caption" color="textSecondary">{e.time}</Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Order Summary */}
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">Order Summary</Typography>
              <Box className="flex justify-between mb-1"><span>Sub Total</span><span>${orderDetails.summary.subtotal}</span></Box>
              <Box className="flex justify-between mb-1 text-red-500"><span>Discount</span><span>- ${orderDetails.summary.discount}</span></Box>
              <Box className="flex justify-between mb-1"><span>Delivery</span><span>${orderDetails.summary.delivery}</span></Box>
              <Box className="flex justify-between mb-2"><span>Tax</span><span>${orderDetails.summary.tax}</span></Box>
              <Divider className="my-2" />
              <Box className="flex justify-between font-semibold text-lg"><span>Total</span><span>${orderDetails.summary.finalTotal}</span></Box>
            </CardContent>
          </StyledCard>

          {/* Payment Info */}
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">Payment Information</Typography>
              <Typography variant="body2">Method: {orderDetails.payment.method}</Typography>
              <Typography variant="body2">Status: <Chip label={orderDetails.payment.status} color="success" size="small" /></Typography>
              <Typography variant="body2">Transaction ID: {orderDetails.payment.transactionId}</Typography>
              <Typography variant="body2">Card Holder: {orderDetails.payment.cardHolder}</Typography>
            </CardContent>
          </StyledCard>

          {/* Customer Info */}
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">Customer Details</Typography>
              <Typography variant="body2 font-medium">{orderDetails.customer.name}</Typography>
              <Typography variant="body2 text-blue-600">{orderDetails.customer.email}</Typography>
              <Typography variant="body2">{orderDetails.customer.contact}</Typography>
              <Typography variant="body2">{orderDetails.customer.shippingAddress}</Typography>
              <Box className="mt-3">
                <iframe
                  title="map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(orderDetails.customer.shippingAddress)}&output=embed`}
                  width="100%"
                  height="200"
                  className="rounded-lg"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetails;
