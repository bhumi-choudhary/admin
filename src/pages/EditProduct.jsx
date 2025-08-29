import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

function EditProduct() {
  const { productId } = useParams(); // productId from the URL
  const navigate = useNavigate();
  const { products, updateProduct } = useContext(ProductContext);

  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    const foundProduct = products.find(product => product.id === parseInt(productId));
    if (foundProduct) {
      setProductData(foundProduct);
      setSelectedSizes(foundProduct.sizes || []);
      setSelectedColors(foundProduct.colors || []);
      if (foundProduct.images && Array.isArray(foundProduct.images)) {
        setImages(foundProduct.images.map(img => typeof img === 'string' ? img : img.url));
      } else {
        setImages([]);
      }
    } else {
      toast.error("Product not found!");
      navigate('/admin/products');
    }
    setLoading(false);
  }, [productId, products, navigate]);

  if (loading) {
    return <div className="text-center mt-10 text-lg font-semibold text-gray-700">Loading product details...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (selectedOption) => {
    setProductData(prev => ({ ...prev, category: selectedOption ? selectedOption.value : '' }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSizeChange = (size) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const handleColorChange = (color) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...productData,
      id: parseInt(productId),
      sizes: selectedSizes,
      colors: selectedColors,
      images: images.map(img => ({ url: img, name: 'uploaded_image' }))
    };
    updateProduct(updatedProduct); // assuming this updates context/state
    toast.success("Product updated successfully!");
    navigate('/admin/products');
  };

  return (
    <div className="container mx-auto p-6">
      {/* Back Button */}
      <div className="flex justify-start mb-4">
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-xl  transition duration-200 mt-10"
          onClick={() => window.history.back()}
        >
          Back to Products
        </button>
      </div>
      <ToastContainer />
      <div className="flex justify-end mb-4">
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-xl mr-4 transition duration-200"
          onClick={() => {
            const foundProduct = products.find(product => product.id === parseInt(productId));
            if (foundProduct) {
              setProductData(foundProduct);
              setSelectedSizes(foundProduct.sizes || []);
              setSelectedColors(foundProduct.colors || []);
              if (foundProduct.images && Array.isArray(foundProduct.images)) {
                setImages(foundProduct.images.map(img => typeof img === 'string' ? img : img.url));
              } else {
                setImages([]);
              }
            }
          }}
        >
          Reset Changes
        </button>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Edit Product</h2>
        <form onSubmit={handleEditProduct}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Product Information</h3>

              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                  value={productData.name || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="brand" className="block text-gray-700 font-medium mb-2">Brand Name</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                  value={productData.brand || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Product Category</label>
                <Select
                  id="category"
                  name="category"
                  options={[
                    { value: 'Electronics', label: 'Electronics' },
                    { value: 'Fashion', label: 'Fashion' },
                    { value: 'Home & Garden', label: 'Home & Garden' },
                    { value: 'Books', label: 'Books' },
                    { value: 'Sports', label: 'Sports' },
                    { value: 'Uncategorized', label: 'Uncategorized' }
                  ]}
                  className="w-full rounded-lg focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                  value={productData.category ? { value: productData.category, label: productData.category } : null}
                  onChange={handleCategoryChange}
                  isClearable
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="weight" className="block text-gray-700 font-medium mb-2">Weight (e.g., 300gm)</label>
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                    value={productData.weight || ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                    value={productData.gender || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Sizes</label>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'].map(size => (
                    <button
                      key={size}
                      type="button"
                      className={`px-4 py-2 rounded-full border ${selectedSizes.includes(size) ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Colors</label>
                <div className="flex flex-wrap gap-2">
                  {['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FFA500', '#800080'].map(color => (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColors.includes(color) ? 'border-blue-600' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                  value={productData.description || ''}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>

            {/* Tags and Meta */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Tags and Meta</h3>

              <div className="mb-4">
                <label htmlFor="tagNumber" className="block text-gray-700 font-medium mb-2">Tag Number</label>
                <input
                  type="text"
                  id="tagNumber"
                  name="tagNumber"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                  value={productData.tagNumber || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">Tags </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                  value={(Array.isArray(productData.tags) ? productData.tags.join(', ') : productData.tags) || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="stockCount" className="block text-gray-700 font-medium mb-2">Stock Count</label>
                <input
                  type="number"
                  id="stockCount"
                  name="stockCount"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                  value={productData.stockCount || ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* Pricing Details */}
              <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-6">Pricing Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="mb-4">
                  <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    min="0"
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                    value={productData.price || ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="discount" className="block text-gray-700 font-medium mb-2">Discount (%)</label>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    step="0.01"
                    min="0"
                    max="100"
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                    value={productData.discount || ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="tax" className="block text-gray-700 font-medium mb-2">Tax (%)</label>
                  <input
                    type="number"
                    id="tax"
                    name="tax"
                    step="0.01"
                    min="0"
                    max="100"
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                    value={productData.tax || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Product Images */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Product Images</h3>
                <div className="mb-4">
                  <label htmlFor="images" className="block text-gray-700 font-medium mb-2">Upload Images</label>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-400 focus:border-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                {/* Image Preview */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-full h-32 rounded-lg overflow-hidden shadow-md">
                      <img src={image} alt={`Product Image ${index + 1}`} className="w-full h-full object-contain" />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-600"
                        onClick={() => handleRemoveImage(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 shadow-md text-white font-semibold py-2 px-6 rounded-xl transition duration-200"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
