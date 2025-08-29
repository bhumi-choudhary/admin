import React, { useEffect, useRef, useState } from "react";
import { TextField, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, Button, FormLabel } from '@mui/material';

const AddCoupon = () => {
  const [today, setToday] = useState("");
  const [couponCode, setCouponCode] = useState('');
  const endRef = useRef(null);
  const startRef = useRef(null);
  useEffect(() => {
    // Today ki date yyyy-mm-dd format me convert
    const currentDate = new Date().toISOString().split("T")[0];
    setToday(currentDate);
  }, []);
  const openPicker = (ref) => {
    if (ref.current && ref.current.showPicker) {
      ref.current.showPicker(); // 👈 force open date picker (Chrome/Edge)
    } else {
      ref.current.focus(); // fallback (other browsers)
    }
  };
  return (
    <div className="p-6 bg-[#f7f9fc] min-h-screen mt-10">
      <button
        type="button"
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-xl  transition duration-200 mt-5 mb-4"
        onClick={() => window.history.back()}
      >
        Back to Coupon
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Coupon Status */}
          <div className="bg-white shadow-md rounded-xl border border-gray-100 h-[200px] flex flex-col">
            <div className="p-5 border-b bg-gradient-to-r from-sky-100 to-white rounded-t-2xl">
              <h2 className="text-lg font-semibold text-sky-700">Coupon Status</h2>
            </div>
            <div className="p-5 flex items-center gap-6 flex-1">
              <RadioGroup row name="status" defaultValue="Active">
                <FormControlLabel value="Active" control={<Radio size="small" />} label="Active" />
                <FormControlLabel value="Inactive" control={<Radio size="small" />} label="Inactive" />
                <FormControlLabel value="Future Plan" control={<Radio size="small" />} label="Future Plan" />
              </RadioGroup>
            </div>
          </div>

          {/* Date Schedule */}
          <div className="bg-white shadow-md rounded-2xl border border-gray-100">
            <div className="p-5 border-b bg-gradient-to-r from-sky-100 to-white rounded-t-2xl">
              <h2 className="text-lg font-semibold text-sky-700">Date Schedule</h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-1 gap-4">
              {/* Start Date */}
              <label className="text-sm font-medium text-gray-700">Start Date</label>
              <div
                className="border rounded-lg p-2 focus-within:ring-2 focus-within:ring-sky-500 cursor-pointer"
                onClick={() => openPicker(startRef)}
              >
                <input
                  ref={startRef}
                  type="date"
                  min={today}
                  className="w-full outline-none cursor-pointer"
                />
              </div>

              {/* End Date */}
              <label className="text-sm font-medium text-gray-700">End Date</label>
              <div
                className="border rounded-lg p-2 focus-within:ring-2 focus-within:ring-sky-500 cursor-pointer"
                onClick={() => openPicker(endRef)}
              >
                <input
                  ref={endRef}
                  type="date"
                  min={today}
                  className="w-full outline-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col">
          {/* Coupon Information */}
          <div className="bg-white shadow-md rounded-2xl border border-gray-100">
            <div className="p-5 border-b bg-gradient-to-r from-sky-100 to-white rounded-t-2xl">
              <h2 className="text-lg font-semibold text-sky-700">Coupon Information</h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Code */}
              <div>
                <label className="text-sm font-medium text-gray-700">Coupon Code</label>
                <input
                  type="text"
                  placeholder="Enter code"
                  className="border rounded-lg p-2 focus:ring-sky-500 focus:border-sky-500 w-full"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select className="border rounded-lg p-2 focus:ring-sky-500 focus:border-sky-500 w-full">
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Grocery</option>
                  <option>Home Appliances</option>
                  <option>Beauty</option>
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="text-sm font-medium text-gray-700">Country</label>
                <select className="border rounded-lg p-2 focus:ring-sky-500 focus:border-sky-500 w-full">
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>Canada</option>
                  <option>Australia</option>
                </select>
              </div>

              {/* Limit */}
              <div>
                <label className="text-sm font-medium text-gray-700">Limit</label>
                <input
                  type="text"
                  placeholder="Enter limit"
                  className="border rounded-lg p-2 focus:ring-sky-500 focus:border-sky-500 w-full"
                />
              </div>
            </div>

            {/* Coupon Types */}
            <div className="p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Coupon Types</h3>
              <div className="flex items-center gap-6 mb-3">
                <label className="flex items-center gap-2 text-gray-700">
                  <input type="radio" name="type" defaultChecked className="text-sky-500 focus:ring-sky-500" />
                  Free Shipping
                </label>
                <label className="flex items-center gap-2 text-gray-700">
                  <input type="radio" name="type" className="text-sky-500 focus:ring-sky-500" />
                  Percentage
                </label>
                <label className="flex items-center gap-2 text-gray-700">
                  <input type="radio" name="type" className="text-sky-500 focus:ring-sky-500" />
                  Fixed Amount
                </label>
              </div>

              {/* Value */}
              <div>
                <label className="text-sm font-medium text-gray-700">Value</label>
                <input
                  type="text"
                  placeholder="Enter value"
                  className="w-full border rounded-lg p-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
            </div>

            {/* Button */}
            <div className="p-5 border-t">
              <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 rounded-xl">
                Create Coupon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default AddCoupon;
