import React, { useState, useContext } from "react";
import { CloudArrowUpIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom"; // Correct import for useNavigate
import { ProductContext } from "../contexts/ProductContext";


import { toast } from 'react-toastify';
const AddProductPage = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    category: "", // Initialize with empty string
    brand: "",
    weight: "",
    gender: "",
    sizes: [],
    colors: [],
    description: "",
    tagNumber: "",
    stockQuantity: "",
    tags: [],
    price: "",
    discount: "",
    tax: "",
    images: [],
  });

  // 🔹 Common input styles
  const inputClass =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm " +
    "focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // 🔹 Multiple image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setProductData({ ...productData, images: [...productData.images, ...newImages] });
  };

  const handleRemoveImage = (indexToRemove) => {
    setProductData({
      ...productData,
      images: productData.images.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setProductData({ ...productData, images: [...productData.images, ...newImages] });
  };

  const handleSizeSelect = (size) => {
    setProductData({
      ...productData,
      sizes: productData.sizes.includes(size)
        ? productData.sizes.filter((s) => s !== size)
        : [...productData.sizes, size],
    });
  };

  const handleColorSelect = (color) => {
    setProductData({
      ...productData,
      colors: productData.colors.includes(color)
        ? productData.colors.filter((c) => c !== color)
        : [...productData.colors, color],
    });
  };

  const handleAddTag = (tag) => {
    if (tag && !productData.tags.includes(tag)) {
      setProductData({ ...productData, tags: [...productData.tags, tag] });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setProductData({
      ...productData,
      tags: productData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const { addProduct } = useContext(ProductContext); // Use useContext to access addProduct

  const handleCreateProduct = () => {
    // Ensure price is a number before adding to context
    const productDataWithNumberPrice = {
      ...productData,
      price: parseFloat(productData.price) || 0, // Convert to float, default to 0 if invalid
    };
    addProduct(productDataWithNumberPrice); // Add product to the shared context
    toast.success("Product created successfully!"); // Show success toast
 navigate('/admin/products'); // Navigate to the products page
  };


  const handleCancel = () => {
    navigate('/products'); // Navigate back to the products page
  };


  // Dummy data
  const categories = ["Electronics", "Fashion", "Shoes", "Accessories"];
  const genders = ["Male", "Female", "Unisex"];
  const availableSizes = ["S", "M", "L", "XL"];
  const availableColors = [
    "#3b82f6", // Tailwind blue-500
    "#ef4444",
    "#22c55e",
    "#eab308",
    "#6366f1",
  ];

  return (
    <div className="container mx-auto p-4 ">
      {/* Back Button */}
      <button // Removed onBack prop and used navigate directly
        onClick={() => navigate('/admin/products')}
        
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-xl  transition duration-200 mt-10 flex items-center mb-4"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" /> Back
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 🔹 Left Column: Product Preview */}
          <div className="bg-gray-50 rounded-lg p-6 flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Product Preview
            </h2>

            <div className="flex-grow overflow-y-auto">
              {productData.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {productData.images.map((img, i) => (
 <div key={i} className="relative">
 <img
 key={i}
 src={img}
 alt="Product Preview"
 className="w-full h-32 object-contain rounded-md"
                    />
 <button
 type="button"
 className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition text-xs"
 onClick={() => handleRemoveImage(i)}
 >
 <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
 <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
 </svg>
 </button>
 </div>
                  ))}
                </div>
              )}

              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {productData.name || "Product Name"}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                Category: {productData.category || "N/A"}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Price: {productData.price ? `$${productData.price}` : "N/A"}
              </p>
              {productData.sizes.length > 0 && (
                <p className="text-sm text-gray-600 mb-1">
                  Size: {productData.sizes.join(", ")}
                </p>
              )}
              {productData.colors.length > 0 && (
                <div className="flex items-center mb-1">
                  <span className="text-sm text-gray-600 mr-2">Colors:</span>
                  <div className="flex space-x-1">
                    {productData.colors.map((color, index) => (
                      <span
                        key={index}
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color }}
                      ></span>
                    ))}
                  </div>
                </div>
              )}
              {productData.discount && (
                <p className="text-sm text-green-600 font-semibold">
                  Discount: {productData.discount}% OFF
                </p>
              )}
              <p className="text-sm text-gray-600 mt-4">
                {productData.description || "Product description preview..."}
              </p>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="px-6 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                onClick={handleCreateProduct}
              >
                Create Product
              </button>
            </div>
          </div>

          {/* 🔹 Right Column: Product Form */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Product Details
            </h2>

            {/* Upload Area */}
            <div
              className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-500 transition mb-6"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById("imageUpload").click()}
            >
              <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Drag and drop or click to upload images
              </span>
              <input
                id="imageUpload"
                type="file"
                className="sr-only"
                multiple
                onChange={handleImageUpload}
              />
            </div>

            {/* Product Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Product Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className={inputClass}
                    value={productData.name}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    className={inputClass}
                    value={productData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    className={inputClass}
                    value={productData.brand}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Weight
                  </label>
                  <input
                    type="text"
                    name="weight"
                    className={inputClass}
                    value={productData.weight}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    name="gender"
                    className={inputClass}
                    value={productData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    {genders.map((gen) => (
                      <option key={gen} value={gen}>
                        {gen}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sizes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sizes
                  </label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {availableSizes.map((size) => (
                      <span
                        key={size}
                        className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
                          productData.sizes.includes(size)
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                        onClick={() => handleSizeSelect(size)}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Colors
                  </label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {availableColors.map((color, index) => (
                      <span
                        key={index}
                        className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                          productData.colors.includes(color)
                            ? "border-blue-600"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(color)}
                      ></span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    className={inputClass}
                    value={productData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Stock & Tags */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Stock & Tags
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tag Number
                  </label>
                  <input
                    type="text"
                    name="tagNumber"
                    className={inputClass}
                    value={productData.tagNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stockQuantity"
                    className={inputClass}
                    value={productData.stockQuantity}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Tags */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <div className="mt-1 flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md max-h-24 overflow-y-auto">
                    {productData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                        <button
                          type="button"
                          className="ml-1 text-blue-400 hover:text-blue-600"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      className="flex-grow min-w-0 bg-transparent border-none focus:ring-0 focus:outline-none text-sm"
                      placeholder="Add a tag..."
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && e.target.value) {
                          handleAddTag(e.target.value.trim());
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Pricing Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    className={inputClass}
                    value={productData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Discount (%)
                  </label>
                  <input
                    type="text"
                    name="discount"
                    className={inputClass}
                    value={productData.discount}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tax (%)
                  </label>
                  <input
                    type="text"
                    name="tax"
                    className={inputClass}
                    value={productData.tax}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
