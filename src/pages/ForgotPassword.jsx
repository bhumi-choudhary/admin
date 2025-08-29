import React, { useState, useRef } from "react";
import { z } from "zod";
import { toast } from 'react-toastify';
import {
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  Box
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import { VpnKey } from '@mui/icons-material'; // Added VpnKey for OTP icon
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState("email");
  const [email, setEmail] = useState("");

  // OTP + Password States
  const [otp, setOtp] = useState(new Array(6).fill("")); // 6 digit OTP
  const [otpError, setOtpError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Schemas
  const emailSchema = z.object({
    email: z.string().email("Invalid email address"),
  });

  const otpSchema = z.object({
    otp: z.string().length(6, "OTP must be 6 digits"),
  });

  const passwordUpdateSchema = z
    .object({
      newPassword: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z
        .string()
        .min(8, "Confirm Password must be at least 8 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const result = emailSchema.safeParse({ email });
    if (result.success) {
      setEmailError("");
      // Simulate sending OTP - In a real app, you'd call a backend API here
      console.log("Email submitted:", email);
      toast.success("OTP sent to your email"); // Success toast
      setCurrentStep("otp");
    } else {
      if (result.error && Array.isArray(result.error.errors) && result.error.errors.length > 0) {
        setEmailError(result.error.errors[0].message);
      } else {
        setEmailError("An unexpected error occurred."); // Generic error if structure is unexpected
        console.error("Unexpected Zod error format:", result.error);
      }
      toast.error("Failed to send OTP. Please try again."); // Error toast for email submission
    }
  };

  const handlePasswordUpdate = () => {
    const result = passwordUpdateSchema.safeParse({
      newPassword,
      confirmPassword,
    });

    if (result.success) {
      setNewPasswordError("");
      setConfirmPasswordError("");
      console.log("Password updated:", newPassword);
      // Simulate password update - In a real app, you'd call a backend API here
      toast.success("Password updated successfully"); // Success toast
      navigate("/login");
    } else {
      setNewPasswordError("");
      setConfirmPasswordError("");
    
      if (result.error && Array.isArray(result.error.errors)) {
        result.error.errors.forEach((err) => {
          if (err.path[0] === "newPassword") setNewPasswordError(err.message);
          if (err.path[0] === "confirmPassword") setConfirmPasswordError(err.message);
        });
      } else {
        console.error("Unexpected error format:", result.error);
        toast.error("Failed to update password. Please try again."); // Generic error toast
      }
    }
    
  };

  // Handle OTP input (with backspace navigation)
  const handleOtpChange = (value, index, e) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus(); // auto next
      } else if (!value && e.key === "Backspace" && index > 0) {
        inputRefs.current[index - 1].focus(); // auto back
      }
    }
  };

  const handleVerifyOtp = () => {
    const otpValue = otp.join("");
    const result = otpSchema.safeParse({ otp: otpValue });

    // Simulate OTP verification - In a real app, you'd call a backend API here
    if (result.success) {
      setOtpError("");
      console.log("OTP entered:", otpValue);
      toast.success("OTP verified successfully"); // Success toast
      setCurrentStep("update-password");
    } else {
       if (result.error && Array.isArray(result.error.errors) && result.error.errors.length > 0) {
        setOtpError(result.error.errors[0].message);
      } else {
         setOtpError("Invalid OTP format."); // Generic error if structure is unexpected
         console.error("Unexpected Zod error format for OTP:", result.error);
      }
      toast.error("Invalid OTP. Please try again."); // Error toast
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "email":
        return (
          <div className="flex justify-center items-center w-full md:w-1/2 p-4">
            <Paper
              elevation={10}
              sx={{
                p: { xs: 4, md: 6 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.9)",
                maxWidth: 400,
                width: "100%",
              }}
            >
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Forgot Password
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, textAlign: "center" }}>
                Enter your email address to reset your password
              </Typography>
              <form onSubmit={handleEmailSubmit} style={{ width: "100%" }}>
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  error={!!emailError}
                  helperText={emailError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  color="primary"
                  sx={{ mt: 3, mb: 2, borderRadius: 2, py: 1.5 }}
                >
                  Reset Password
                </Button>
              </form>
              <Button
                variant="text"
                onClick={() => navigate("/")}
                fullWidth
                color="secondary"
              >
                Back to Login {/* Used navigate directly */}
              </Button>
            </Paper>
          </div>
        );

      case "otp":
        return (
          <div className="flex justify-center items-center w-full md:w-1/2 p-4">
            <Paper
              elevation={10}
              sx={{
                p: { xs: 4, md: 6 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.9)",
                maxWidth: 400,
                width: "100%",
              }}
            >
              <Typography variant="h5" gutterBottom fontWeight="bold">
                OTP Verification
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, textAlign: "center" }}>
                Enter the 6-digit OTP sent to your email.
              </Typography>

              {/* OTP Input Boxes */}
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                {otp.map((digit, index) => (
                  <TextField
                    key={index}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, index, e.nativeEvent)
                    }
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center", fontSize: "18px" },
                      type: "text", // Ensure type is text for visibility
                      inputMode: "numeric", // Suggest numeric keyboard
                      autocomplete: "one-time-code", // Hint for OTP autofill
                    }}
                     InputProps={{ // Consistent input adornment
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKey color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ width: 50 }} // Keep individual box width
                  />
                ))}
              </Box>
              {otpError && (
                <Typography color="error" variant="body2" sx={{ mb: 1 }}>
                  {otpError}
                </Typography>
              )}

              <Button
                variant="contained"
                fullWidth
                color="primary"
                sx={{ mt: 2, borderRadius: 2, py: 1.5 }}
                onClick={handleVerifyOtp}
              >
                Verify
              </Button>
              <Button
                variant="text"
                onClick={() => setCurrentStep("email")}
                fullWidth
                sx={{ mt: 2 }}
                color="secondary"
              >
                Back to Email {/* Used setCurrentStep */}
              </Button>
              <Button
                variant="text"
                onClick={() => navigate("/")}
                fullWidth
                color="secondary"
              >
                Back to Login {/* Used navigate directly */}
              </Button>
            </Paper>
          </div>
        );

      case "update-password":
        return (
          <div className="flex justify-center items-center w-full md:w-1/2 p-4">
            <Paper
              elevation={10}
              sx={{
                p: { xs: 4, md: 6 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.9)",
                maxWidth: 400,
                width: "100%",
              }}
            >
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Update Password
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, textAlign: "center" }}>
                Set your new password.
              </Typography>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setNewPasswordError("");
                }}
                error={!!newPasswordError}
                helperText={newPasswordError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError("");
                }}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                fullWidth
                color="primary"
                sx={{ mt: 3, borderRadius: 2, py: 1.5 }}
                onClick={handlePasswordUpdate}
              >
                Update Password
              </Button>
              <Button
                variant="text"
                onClick={() => setCurrentStep("otp")}
                fullWidth
                sx={{ mt: 2 }}
                color="secondary"
              >
                Back to OTP {/* Used setCurrentStep */}
              </Button>
              <Button
                variant="text"
                onClick={() => navigate("/")}
                fullWidth
                color="secondary"
              >
                Back to Login {/* Used navigate directly */}
              </Button>
            </Paper>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="w-full md:w-1/2 bg-purple-700 hidden md:flex items-center justify-center"></div>

      {/* Right Side */}
      {renderStep()}
    </div>
  );
};

export default ForgotPassword;
