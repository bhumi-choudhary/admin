import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { TruckIcon, TagIcon, GiftIcon, LifebuoyIcon } from '@heroicons/react/24/outline';
import './productDetails.css';

function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const { productId } = useParams();
  const { getProductById } = useProducts();
  const product = getProductById(productId);

  const [mainImage, setMainImage] = useState(product?.image || 'https://m.media-amazon.com/images/I/610InQb9rTL._SX569_.jpg');
  const [modalOpen, setModalOpen] = useState(false);

  if (!product) {
    return <div className="container mx-auto p-6 text-center text-red-600">Product not found.</div>;
  }

  const handleColorSelect = (color) => setSelectedColor(color);
  const handleSizeSelect = (size) => setSelectedSize(size);
  const handleQuantityChange = (amount) => setQuantity(prev => Math.max(1, prev + amount));
  const toggleDescription = () => setIsDescriptionExpanded(!isDescriptionExpanded);

  const displayDescription = isDescriptionExpanded
    ? product.description
    : `${product.description?.substring(0, 200) || '[No description available]'}${product.description?.length > 200 ? '...' : ''}`;

  const dummyColors = ['#000000', '#F5F5DC', '#808080', '#FFFFFF'];
  const dummySizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <>
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex justify-start mb-4">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-xl  transition duration-200 mt-10"
            onClick={() =>  window.history.back() }
          >
            Back to Products
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
          {/* Left Section */}

          <div className="left-section flex flex-col items-center">

            <div className="relative overflow-hidden rounded-lg shadow-lg mb-4 w-full max-w-md">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-auto object-cover transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                onClick={() => setModalOpen(true)}
              />
            </div>
            <div className="grid grid-cols-4 gap-2 w-full max-w-md">
              {[...Array(4)].map((_, index) => (
                <img
                  key={index}
                  src={`https://m.media-amazon.com/images/I/817ILrKnthL._SX569_.jpg?text=Thumb${index + 1}`}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg cursor-pointer hover:border-2 hover:border-blue-500 transition"
                  onClick={() => setMainImage(product.image || `https://m.media-amazon.com/images/I/81Rqw7bIqYL._SX569_.jpg?text=Image${index + 1}`)}
                />
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="right-section">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${index < Math.round(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.729 1.984a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.729-1.984a1 1 0 00-1.175 0l-2.729 1.984c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.363-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 text-sm">({product.reviews || 0} Reviews)</span>
            </div>

            {/* Price */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="price-section mb-4">
                <span className="text-green-600 font-bold text-3xl mr-2">${product.price?.toFixed(2) || '0.00'}</span>
                {product.oldPrice && <span className="text-gray-500 line-through text-lg mr-2">${product.oldPrice.toFixed(2)}</span>}
                {product.discount > 0 && (
                  <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded">{product.discount}% Off</span>
                )}
              </div>
              <p className="text-gray-700 mb-4">
                Availability:{' '}
                <span className={`font-semibold ${product.stockLeft > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stockLeft > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                {product.stockLeft > 50 && <span className="ml-2 text-green-600 font-semibold">Free Delivery Available</span>}
              </p>

              {/* Colors */}
              <div className="color-selection mb-4">
                <h4 className="font-semibold mb-2">Color:</h4>
                <div className="flex space-x-2">
                  {dummyColors.map((color, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer ${selectedColor === color ? 'border-blue-500' : 'border-gray-300'
                        }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                      title={color}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="size-selection mb-4">
                <h4 className="font-semibold mb-2">Size:</h4>
                <div className="flex space-x-2">
                  {(product.sizes || dummySizes).map((size, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-md border ${selectedSize === size
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300'
                        } hover:bg-blue-100 transition`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="quantity-selector mb-4">
                <h4 className="font-semibold mb-2">Quantity:</h4>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 border rounded-md hover:bg-gray-100 transition" onClick={() => handleQuantityChange(-1)}>
                    -
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button className="px-3 py-1 border rounded-md hover:bg-gray-100 transition" onClick={() => handleQuantityChange(1)}>
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                  Add to Cart
                </button>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Buy Now
                </button>
                <button className="text-gray-600 border border-gray-400 px-3 py-3 rounded-lg hover:bg-gray-100 transition">❤️</button>
              </div>

              {/* Offers */}
              <div className="offers-section mt-4">
                <h4 className="font-semibold mb-2">Offers</h4>
                <ul className="list-disc list-inside text-gray-700">
                  <li>10% Instant Discount on Bank XYZ Cards</li>
                  <li>Extra 5% off on UPI payments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="description-section mt-8">
          <h3 className="text-xl font-bold mb-4">Product Description</h3>
          <div className="bg-gray-100 p-6 rounded-lg overflow-hidden">
            <p className="text-gray-700">{displayDescription}</p>
            {product.description?.length > 200 && (
              <button
                onClick={toggleDescription}
                className="flex items-center text-blue-600 hover:underline mt-2 focus:outline-none"
              >
                {isDescriptionExpanded ? (
                  <>
                    Read Less <ChevronUpIcon className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    Read More <ChevronDownIcon className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Special Services */}
        <div className="special-services-section mt-8">
          <h3 className="text-xl font-bold mb-4">Special Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center">
              <TruckIcon className="h-8 w-8 text-blue-600 mb-2" />
              <p className="text-gray-700 text-sm font-semibold">Free Shipping</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center">
              <TagIcon className="h-8 w-8 text-green-600 mb-2" />
              <p className="text-gray-700 text-sm font-semibold">Special Discounts</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center">
              <GiftIcon className="h-8 w-8 text-purple-600 mb-2" />
              <p className="text-gray-700 text-sm font-semibold">Free Gift Wrapping</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center">
              <LifebuoyIcon className="h-8 w-8 text-red-600 mb-2" />
              <p className="text-gray-700 text-sm font-semibold">24x7 Expert Customer Service</p>
            </div>
          </div>
        </div>

        {/* Item Details */}
        <div className="item-details-section mt-8">
          <h3 className="text-xl font-bold mb-4">Item Details</h3>
          <div className="bg-gray-100 p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
            <div>
              <span className="font-semibold">Dimensions:</span> X x Y x Z
            </div>
            <div>
              <span className="font-semibold">Weight:</span> 300gm
            </div>
            <div>
              <span className="font-semibold">Material:</span> Cotton
            </div>
            <div>
              <span className="font-semibold">Manufacturer:</span> [Manufacturer Name]
            </div>
            <div>
              <span className="font-semibold">Item Number:</span> [Item Number]
            </div>
            <div>
              <span className="font-semibold">Country of Origin:</span> [Country]
            </div>
            <div>
              <span className="font-semibold">Department:</span> [Department Name]
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="reviews-section mt-8">
          <h3 className="text-xl font-bold mb-4">Top Reviews From Customers</h3>
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="border-b border-gray-300 pb-4 mb-4 last:border-b-0 last:mb-0">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-gray-400 rounded-full mr-3 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold">Customer Name</p>
                  <p className="text-yellow-500 text-sm">★★★★★</p>
                </div>
              </div>
              <p className="text-gray-700">
                This product is <span className="font-bold">amazing</span>! I love it. Highly recommend.
              </p>
              <div className="flex space-x-4 mt-2 text-sm text-gray-600">
                <button className="hover:underline">Helpful</button>
                <button className="hover:underline">Report</button>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Add-to-Cart Bar (Mobile) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg md:hidden">
          <button className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Image Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img src={mainImage} alt="Enlarged Product" className="max-w-screen max-h-screen object-contain" />
            <button className="absolute top-4 right-4 text-white text-3xl font-bold" onClick={() => setModalOpen(false)}>
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
