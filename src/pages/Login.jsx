import React, { useState } from "react";
import { z } from "zod";
import { Typography } from "@mui/material";
import { toast } from 'react-toastify';

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => { // Make the function async
 try {
      loginSchema.parse({ email, password });
 setEmailError("");
 setPasswordError("");

      login({ email: email }); // Call login from AuthContext with email
      toast.success("Login successful!");
 navigate("/admin/dashboard"); // Navigate to dashboard
 } catch (error) {
 if (error instanceof z.ZodError) {
 const fieldErrors = error.flatten().fieldErrors;
      setEmailError(fieldErrors.email?.[0] || "");
      setPasswordError(fieldErrors.password?.[0] || "");
 }
 }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/login_image.jpg')" }}
    >
      {/* White login card right side */}
      <div className="ml-auto mr-10 w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-[rgb(103,58,183)]">
          Welcome back !
        </h2>
        <p className="text-center text-gray-500 text-sm mt-2">
          Enter your credentials to access
        </p>

        {/* Username */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Email"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[rgb(103,58,183)] outline-none ${emailError ? "border-red-500" : ""
              }`}
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError("") }}
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>

        {/* Password */}
        <div className="mt-4">
          <input
            type="password"
            placeholder="Password"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[rgb(103,58,183)] outline-none ${passwordError ? "border-red-500" : ""
              }`}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPasswordError("") }}
          />
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-[rgb(103,58,183)]" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-[rgb(103,58,183)] hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Button */}
        <button
          className="w-full bg-[rgb(103,58,183)] text-white py-3 rounded-lg mt-6 font-semibold hover:bg-[rgb(85,43,163)] transition"
          onClick={handleLogin}
        >
          Login
        </button>{' '}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2, cursor: 'pointer' }}
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </Typography>{' '}
      </div>{' '}
    </div>
  );
};

export default Login;