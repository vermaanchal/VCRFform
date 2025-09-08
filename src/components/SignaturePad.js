import React, { useState, useRef, useContext } from "react";
import success from "../assets/gif.gif";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import { CustomerContext } from "./CustomerContext";

const SignaturePad = () => {
  const { customerTelephone } = useContext(CustomerContext);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const customerSignatureRef = useRef(null);
  // const dealersSignatureRef = useRef(null);
  const operatorsSignatureRef = useRef(null);

  const handleSendOTP = () => {
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
  
    const otpCode = Math.floor(100000 + Math.random() * 900000);
  
    alert(`Your OTP is: ${otpCode}`);
    setOtpSent(true);
  };
  

  const handleVerifyOTP = () => {
    alert("OTP verified successfully");
  };

  // const handleSendOTP = () => {
  //   console.log("Sending OTP to:", phoneNumber);
  //   setOtpSent(true);
  // };

  const handleDoneClick = async () => {
   
    if (
      customerSignatureRef.current.isEmpty() ||
      // dealersSignatureRef.current.isEmpty() ||
      operatorsSignatureRef.current.isEmpty()
    ) {
      alert("Please fill out all signature fields.");
      return; 
    }
    if (!phoneNumber) {
      alert("Please enter your phone number.");
      return;
    }
    
    if (!otp) {
      alert("Please enter the OTP to verify.");
      return;
    }

    setIsModalOpen(true);

    const customerSignature =
      customerSignatureRef.current.toDataURL("image/png");
    // const dealersSignature = dealersSignatureRef.current.toDataURL("image/png");
    const operatorsSignature =
      operatorsSignatureRef.current.toDataURL("image/png");

    const payload = {
      reportId: 0,
      customerTelephone, 
      signatories: [
        {
          signatoryType: "Customer",
          signatureImageUrl: customerSignature,
          signatoryName: "Customer Name",
        },
        // {
        //   signatoryType: "Dealer",
        //   signatureImageUrl: dealersSignature,
        //   signatoryName: "Dealer Name",
        // },
        {
          signatoryType: "Operator",
          signatureImageUrl: operatorsSignature,
          signatoryName: "Operator Name",
        },
      ],
    };

    try {
      const response = await fetch(
        "https://iuat.acrossassist.in/api/Registration/SubmitSignature",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setIsModalOpen(true);
        setTimeout(() => {
          window.location.assign(`/vehicleDrop?phone=${encodeURIComponent(customerTelephone)}`);
        }, 2500);
      } else {
        console.error("Failed to submit signatures:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting signatures:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const clearSignature = (ref) => {
    ref.current.clear();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg p-6">
        <h2 className="text-center font-bold text-lg mb-4">Signature</h2>
        <div className="space-y-6">

          <div>
            <label
              htmlFor="customerSignature"
              className="text-gray-700 mb-2 block"
            >
              Customer Signature
            </label>
            <SignatureCanvas
              ref={customerSignatureRef}
              penColor="blue"
              canvasProps={{
                id: "customerSignature",
                className:
                  "border-2 border-dashed border-blue-400 rounded-lg p-4 h-32 w-full cursor-crosshair",
              }}
            />
            <button
              className="mt-2 text-blue-500"
              onClick={() => clearSignature(customerSignatureRef)}
            >
              Clear Signature
            </button>
          </div>

          {/* Dealers Signature */}
          {/* <div>
            <label
              htmlFor="dealersSignature"
              className="text-gray-700 mb-2 block"
            >
              Dealers Signature
            </label>
            <SignatureCanvas
              ref={dealersSignatureRef}
              penColor="blue"
              canvasProps={{
                id: "dealersSignature",
                className:
                  "border-2 border-dashed border-blue-400 rounded-lg p-4 h-32 w-full cursor-crosshair",
              }}
            />
            <button
              className="mt-2 text-blue-500"
              onClick={() => clearSignature(dealersSignatureRef)}
            >
              Clear Signature
            </button>
          </div>  */}

          {/* Operators Signature */}
          <div>
            <label
              htmlFor="operatorsSignature"
              className="text-gray-700 mb-2 block"
            >
              Operators Signature
            </label>
            <SignatureCanvas
              ref={operatorsSignatureRef}
              penColor="blue"
              canvasProps={{
                id: "operatorsSignature",
                className:
                  "border-2 border-dashed border-blue-400 rounded-lg p-4 h-32 w-full cursor-crosshair",
              }}
            />
            <button
              className="mt-2 text-blue-500"
              onClick={() => clearSignature(operatorsSignatureRef)}
            >
              Clear Signature
            </button>
          </div>
        </div>

        <div className="flex items-center mt-4">
          {!otpSent ? (
            <>
              <input
                type="tel"
                id="phoneNumber"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d{0,10}$/.test(input)) {
                    setPhoneNumber(input);
                  }
                }}
                // onChange={(e) => setPhoneNumber(e.target.value)}
                className="border-2 border-gray-300 rounded-lg p-2 w-52 mx-2 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendOTP}
                className="bg-orange-500 text-white font-semibold py-2 mx-2 w-auto px-2 rounded-lg hover:bg-orange-400"
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              <input
                type="tel"
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border-2 border-gray-300 rounded-lg p-2 w-52 mx-2 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleVerifyOTP}
                className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Verify
              </button>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDoneClick}
            className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600"
          >
            Done
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full">
            <div className="flex flex-col items-center">
              <img src={success} alt="successful" className="h-28 w-28 mb-4" />
              <p className="mb-4 text-center">
                Your document has been successfully uploaded.
              </p>
              <button
                onClick={handleCloseModal}
                className="bg-orange-500 text-white font-bold py-2 mt-2 px-6 rounded-lg hover:bg-orange-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignaturePad;
