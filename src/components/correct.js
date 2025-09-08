import React, { useState, useRef, useContext } from "react";
import lefticon from "../assets/Right_Circle_Arrow.png";
import vehicle1 from "../assets/vehicle1.png";
import vehicle2 from "../assets/vehicl2.png";
import vehicle3 from "../assets/vehicl3.png";
import vehicle4 from "../assets/vehicle4.png";
import vehicle5 from "../assets/vehicle5.png";
import vehicle6 from "../assets/vehicle6.png";
import { useNavigate } from "react-router-dom";
import { CustomerContext } from './CustomerContext';

function CameraCapture({ onCapture, isCameraOpen, setIsCameraOpen, vehicleIndex }) {
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraOpen(true);
    } catch (error) {
      console.error("Camera access denied:", error);
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");

    onCapture(imageData, vehicleIndex);

    const tracks = video.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    setIsCameraOpen(false);
  };

  React.useEffect(() => {
    if (isCameraOpen) {
      startCamera();
    }
  }, [isCameraOpen]);

  return (
    <div className="flex flex-col items-center">
      {isCameraOpen && (
        <div>
          <video ref={videoRef} autoPlay className="video-preview m-2" />
          <button onClick={captureImage} className="bg-orange-500 text-white px-2 py-1 rounded-lg">
            Capture Photo
          </button>
        </div>
      )}
    </div>
  );
}

function VehicleForm() {
  const { customerTelephone } = useContext(CustomerContext);
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState(null); // 'Four Wheeler' or 'Two Wheeler'
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [capturedImages, setCapturedImages] = useState({
    "Four Wheeler": [],
    "Two Wheeler": [],
  }); // Separate images for each type
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleAttributes, setVehicleAttributes] = useState({
    hasHubcaps: false,
    hasAirReal: false,
    hasFuel: false,
    hasMAT: false,
    hasSpareWheel: false,
    hasAudioSystem: false,
    hasKeysRemote: false,
    hasTools: false,
    otherComments: "",
    hasUniform: false,
    hasSeatCoverFloor: false,
    hasWaterBottle: false,
    hasCarCover: false,
  });
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const vehicleImages = [vehicle1, vehicle2, vehicle3, vehicle4, vehicle5, vehicle6];

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsCameraOpen(true);
    setCurrentImageIndex(0);
  };

  const handleMoreCapture = () => {
    setIsCameraOpen(true);
    setSelectedVehicle(capturedImages[vehicleType].length);
  };

  const handleRadioChange = (attribute, value) => {
    setVehicleAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: value === "yes"
    }));
  };

  const handleCheckboxChange = (attribute) => {
    setVehicleAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: !prevAttributes[attribute]
    }));
  };

  const handleCommentsChange = (e) => {
    setVehicleAttributes((prevAttributes) => ({
      ...prevAttributes,
      otherComments: e.target.value
    }));
  };

  const handleCapture = (imageData, vehicleIndex) => {
    setCapturedImages((prevImages) => ({
      ...prevImages,
      [vehicleType]: [
        ...prevImages[vehicleType].slice(0, vehicleIndex),
        imageData,
        ...prevImages[vehicleType].slice(vehicleIndex + 1),
      ],
    }));
    setCurrentImageIndex(vehicleIndex + 1);
  };

  const handleSubmit = async () => {
    const isFourWheeler = vehicleType === "Four Wheeler";
    const isTwoWheeler = vehicleType === "Two Wheeler";

    const payload = {
      isTwoWheeler,
      isFourWheeler,
      hasHubcaps: vehicleAttributes.hasHubcaps,
      hasAirReal: vehicleAttributes.hasAirReal,
      hasFuel: vehicleAttributes.hasFuel,
      hasMAT: vehicleAttributes.hasMAT,
      hasSpareWheel: vehicleAttributes.hasSpareWheel,
      hasAudioSystem: vehicleAttributes.hasAudioSystem,
      hasKeysRemote: vehicleAttributes.hasKeysRemote,
      hasTools: vehicleAttributes.hasTools,
      otherComments: vehicleAttributes.otherComments,
      hasUniform: vehicleAttributes.hasUniform,
      hasSeatCoverFloor: vehicleAttributes.hasSeatCoverFloor,
      hasWaterBottle: vehicleAttributes.hasWaterBottle,
      hasCarCover: vehicleAttributes.hasCarCover,
      customerTelephone,
      photoUrls: capturedImages[vehicleType].filter((img) => img),
    };

    try {
      const response = await fetch("https://iuat.acrossassist.in/api/Registration/SubmitVehicleAttributes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        navigate("/customer-declaration");
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  return (
    <div className="flex justify-center p-5 min-h-screen">
      <div className="w-full max-w-lg bg-white rounded-lg p-4">
        <div className="text-black w-full py-4 px-6 text-center rounded-t-lg">
          <h1 className="text-xl font-semibold">Please select a vehicle type</h1>
          <div className="flex justify-center space-x-6 mt-4">
            <button
              onClick={() => setVehicleType("Four Wheeler")}
              className={`px-4 py-2 ${vehicleType === "Four Wheeler" ? "bg-orange-500 text-white" : "bg-gray-200"} rounded-md`}
            >
              Four Wheeler
            </button>
            <button
              onClick={() => setVehicleType("Two Wheeler")}
              className={`px-4 py-2 ${vehicleType === "Two Wheeler" ? "bg-orange-500 text-white" : "bg-gray-200"} rounded-md`}
            >
              Two Wheeler
            </button>
          </div>
        </div>

        {vehicleType && (
          <>
            <div className="grid grid-cols-3 gap-6 mt-6">
              {vehicleImages
                .slice(vehicleType === "Four Wheeler" ? 0 : 3, vehicleType === "Four Wheeler" ? 3 : 6)
                .map((vehicle, index) => (
                  <div
                    key={index}
                    onClick={() => handleVehicleSelect(index)}
                    className={`flex flex-col items-center p-4 rounded-lg shadow-sm cursor-pointer ${selectedVehicle === index ? "border-2 border-orange-500" : ""}`}
                  >
                    <img src={capturedImages[vehicleType][index] || vehicle} alt={`Vehicle ${index + 1}`} className="w-16 h-16" />
                  </div>
                ))}
            </div>

            <CameraCapture
              onCapture={handleCapture}
              isCameraOpen={isCameraOpen}
              setIsCameraOpen={setIsCameraOpen}
              vehicleIndex={selectedVehicle}
            />

            {capturedImages[vehicleType].length > 3 && (
              <div className="flex flex-wrap justify-start mt-4 gap-4">
                {capturedImages[vehicleType].slice(3).map((image, index) => (
                  <img
                    key={index + 3}
                    src={image}
                    alt={`Captured image ${index + 4}`}
                    className="w-16 h-16 m-2 border border-gray-300 rounded-lg"
                  />
                ))}
              </div>
            )}

            {capturedImages[vehicleType].length >= 3 && (
              <button onClick={handleMoreCapture} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
                More
              </button>
            )}
                               {/* Checklist with Radio Buttons */}
        <div className="mt-6 grid grid-cols-1 gap-4">
          {["Hubcaps", "Air Real", "Fuel", "MAT", "SpareWheel", "Audio System", "Keys + Remote", "Tools"].map((item, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg shadow-sm">
              <span className="font-medium text-gray-700">{item}</span>
              <div className="flex space-x-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name={item}
                    className="form-radio text-orange-500"
                    value="yes"
                    onChange={() => handleRadioChange(`has${item.replace(" ", "")}`, "yes")}
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name={item}
                    className="form-radio text-orange-500"
                    value="no"
                    onChange={() => handleRadioChange(`has${item.replace(" ", "")}`, "no")}
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Other Comments */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Other Comments</label>
          <textarea
            className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows="3"
            placeholder="Enter other comments"
            onChange={handleCommentsChange}
          ></textarea>
        </div>

        {/* Checklist Bottom */}

        <div className="mt-6 grid grid-cols-2 gap-4">
          {["Uniform", "Seat Cover/floor", "MAT", "Water Bottle", "Car Cover"].map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-slate-50 rounded-lg shadow-sm">
              <span className="font-medium text-gray-700">{item}</span>
              <input
                type="checkbox"
                className="form-checkbox text-orange-500"
                onChange={() => handleCheckboxChange(`has${item.replace(" ", "")}`)}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
              <button onClick={handleSubmit} className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 shadow-md">
                Continue
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VehicleForm
