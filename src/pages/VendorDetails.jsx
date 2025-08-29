import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaStore, FaCalendarAlt } from 'react-icons/fa';
import Layout from '../components/Layout'; // Assuming you have a Layout component
// import './vendorDetails.css'; // Create a CSS file for styling

const dummyVendorData = {
  vendorId: 'vendor123',
  name: 'Example Vendor Co.',
  contactPerson: 'John Doe',
  email: 'john.doe@examplevendor.com',
  phone: '123-456-7890',
  address: '123 Business St, Suite 100, City, State, 12345',
  businessType: 'Online Retail',
  registrationDate: '2020-01-15',
  products: [
    { id: 1, name: 'Product A', price: 10.99, stock: 100 },
    { id: 2, name: 'Product B', price: 25.50, stock: 50 },
  ],
  salesHistory: [
    { orderId: 'order001', date: '2023-10-26', amount: 50.00 },
    { orderId: 'order002', date: '2023-10-25', amount: 120.00 },
  ],
};

const VendorDetails = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    // --- Start of Placeholder for Data Fetching ---
    // In a real application, you would fetch vendor data based on the vendorId
    // from an API or your data source.
    // Replace this dummy data assignment with your actual fetching logic.
    console.log(`Fetching vendor data for ID: ${vendorId}`); // Example logging
    // Example: fetchVendorData(vendorId).then(data => setVendor(data));

    // For demonstration purposes, we are still using dummy data.
    // Remove the following line when you implement actual data fetching.
    setVendor(dummyVendorData);
  }, [vendorId]);

  if (!vendor) {
    return <Layout>Loading vendor details...</Layout>;
  }

  return (
    <Layout>
      <div className="vendor-details-container">
        <h2>Vendor Details: {vendor.name}</h2>

        <div className="vendor-details-card">
          <h3>Contact Information</h3>
          <p><FaEnvelope /> Email: {vendor.email}</p>
          <p><FaPhone /> Phone: {vendor.phone}</p>
          <p><FaMapMarkerAlt /> Address: {vendor.address}</p>
          <p><FaCalendarAlt /> Registration Date: {vendor.registrationDate}</p>
        </div>

        <div className="vendor-details-card">
          <h3>Business Details</h3>
          <p><FaStore /> Business Type: {vendor.businessType}</p>
          <p>Contact Person: {vendor.contactPerson}</p>
        </div>

        <div className="vendor-details-card">
          <h3>Products</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {vendor.products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="vendor-details-card">
          <h3>Sales History</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {vendor.salesHistory.map(sale => (
                <tr key={sale.orderId}>
                  <td>{sale.orderId}</td>
                  <td>{sale.date}</td>
                  <td>${sale.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default VendorDetails;