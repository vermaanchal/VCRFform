import React, { useState, useRef, useContext, useEffect } from "react";
import lefticon from "../assets/Right_Circle_Arrow.png";
import vehicle1 from "../assets/Frontcar.png";
import vehicle2 from "../assets/Backcar.png";
import vehicle3 from "../assets/Leftcar.png";
import vehicle4 from "../assets/Rightcar.png";
import vehicle5 from "../assets/Towingcar.png";
import vehicle6 from "../assets/Others.png";
import vehicle7 from "../assets/Front.png";
import vehicle8 from "../assets/Back.png";
import vehicle9 from "../assets/Left.png";
import vehicle10 from "../assets/Right.png";
import vehicle11 from "../assets/BikeTowing.png";
import vehicle12 from "../assets/Othersbike.png";

import { useNavigate } from "react-router-dom";
import { CustomerContext } from './CustomerContext';

function CameraCapture({ onCapture, isCameraOpen, setIsCameraOpen, vehicleIndex }) {
  const videoRef = useRef(null);

  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("getUserMedia is not supported on this browser or context.");
      return;
    }
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

function VehicleDropForm() {
  //   const { customerTelephone } = useContext(CustomerContext);
  const [customerTelephone, setCustomerTelephone] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const phone = params.get("phone");
    if (phone) {
      setCustomerTelephone(phone);
    }
  }, []);
  console.log(customerTelephone, 'custoo')
  const navigate = useNavigate();
  // const [vehicleType, setVehicleType] = useState("Four Wheeler");
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
    otherComments: "",
    hasDamageFront: false,
    hasDamageBack: false,
    hasDamageLeftside: false,
    hasDamageRightside: false,
    hasTowing: false,
  });
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const vehicleImages = [vehicle1, vehicle2, vehicle3, vehicle4, vehicle5, vehicle6, vehicle7, vehicle8, vehicle9, vehicle10, vehicle11, vehicle12];

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

    const photos = capturedImages[vehicleType]?.filter((img) => img) || [];

    if (photos.length < 5) {
      alert("Please capture at least 5 images before submitting.");
      return;
    }

    const payload = {
      isTwoWheeler,
      isFourWheeler,
      hasDamageFront: vehicleAttributes.hasDamageFront,
      hasDamageBack: vehicleAttributes.hasDamageBack,
      hasDamageLeftside: vehicleAttributes.hasDamageLeftside,
      hasDamageRightside: vehicleAttributes.hasDamageRightside,
      hasTowing: vehicleAttributes.hasTowing,
      hasAudioSystem: vehicleAttributes.hasAudioSystem,
      hasKeysRemote: vehicleAttributes.hasKeysRemote,
      hasTools: vehicleAttributes.hasTools,
      otherComments: vehicleAttributes.otherComments,
      hasUniform: vehicleAttributes.hasUniform,
      hasSeatCoverFloor: vehicleAttributes.hasSeatCoverFloor,
      hasWaterBottle: vehicleAttributes.hasWaterBottle,
      hasCarCover: vehicleAttributes.hasCarCover,
      customerTelephone,
      photoUrls: photos,
    };

    try {
      const response = await fetch("https://iuat.acrossassist.com/api/Registration/SubmitVehicleAttributesDrop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        navigate(`/Dealersignature?phone=${encodeURIComponent(customerTelephone)}`);
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
          <h1 className="text-xl font-semibold">Upload Images for Vehicle Drop</h1>
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
            {/* <p className="my-4 text-center " style={{textDecoration:"underline"}}>Upload Images for Vehicle Drop</p> */}
            <div className="grid grid-cols-3 gap-6 mt-6">
              {vehicleImages
                .slice(vehicleType === "Four Wheeler" ? 0 : 6, vehicleType === "Four Wheeler" ? 6 : vehicleImages.length)
                .map((vehicle, index) => (
                  <div
                    key={index}
                    onClick={() => handleVehicleSelect(index)}
                    className={`flex flex-col items-center p-4 rounded-lg shadow-sm cursor-pointer ${selectedVehicle === index ? "border-2 border-orange-500" : ""
                      }`}
                  >
                    <img
                      src={capturedImages[vehicleType][index] || vehicle}
                      alt={`Vehicle ${index + 1}`}
                      className="w-18 h-18"
                    />
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

            {/* {capturedImages[vehicleType].length >= 3 && (
              <button onClick={handleMoreCapture} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
                More
              </button>
            )} */}
            {/* Checklist with Radio Buttons */}
            <div className="mt-6 grid grid-cols-1 gap-4">
              {["Damage Front", "Damage Back", "Damage Leftside", "Damage Rightside", "Towing"
                // , "SpareWheel", "Audio System", "Keys + Remote", "Tools"
              ].map((item, index) => (
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
              <label className="block mb-2 text-sm font-medium text-gray-700">Add Details</label>
              <textarea
                className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows="3"
                placeholder="Enter Details"
                onChange={handleCommentsChange}
              ></textarea>
            </div>

            {/* Checklist Bottom */}

            {/* <div className="mt-6 grid grid-cols-2 gap-4">
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
        </div> */}

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

export default VehicleDropForm
