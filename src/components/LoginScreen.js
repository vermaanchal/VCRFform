import React, { useState } from "react";
import login from "../assets/login.png"
import { useNavigate } from 'react-router-dom';

function LoginScreen() {

  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate(); 
  
  const handleVerifyOtp = () => {
    navigate("/terms-conditions"); 
  };
  

  const handleSendOtp = () => {
    // Placeholder for sending OTP logic (e.g., API call)
    console.log("OTP sent to:", mobileNumber);
    setOtpSent(true);
  };

 

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="  rounded-lg p-6 w-80 text-center">
        {/* <button className="text-2xl font-semibold text-gray-700 mb-4">&#8249;</button> */}
        
        {/* Illustration */}
        <div className="flex justify-center mb-4">
          <img
            src={login}
            alt="Illustration"
            className="h-32"
          />
        </div>
        
        <h2 className="text-xl font-semibold mb-2 py-2">Log in to your Account</h2>
        <p className="text-gray-500 mb-6 py-2">Welcome back, Please login to continue.</p>
        
        {/* Mobile Number Input */}
        <label className="block text-left font-medium text-gray-600 mb-1 py-2">Mobile No</label>
        <input
          type="text"
          placeholder="Enter your mobile no"
          value={mobileNumber}
          onChange={(e) => {
            const input = e.target.value;
            // Allow only numeric values and limit the input to 10 digits
            if (/^\d{0,10}$/.test(input)) {
              setMobileNumber(input);
            }
          }}
          // onChange={(e) => setMobileNumber(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 mb-4"
        />
        
        {/* OTP Input and Button */}
        {otpSent ? (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 mb-4"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-200"
            >
              Verify
            </button>
          </>
        ) : (
          <button
            onClick={handleSendOtp}
            className="w-full py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-200"
          >
            Send OTP
          </button>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
