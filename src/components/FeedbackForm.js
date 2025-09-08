import React, { useState,useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { CustomerContext } from './CustomerContext';

const FeedbackForm = () => {
  const { customerTelephone } = useContext(CustomerContext);
  const navigate = useNavigate(); 
  const [feedback, setFeedback] = useState({
    callCenterService: "",
    roadsideService: "",
    overallService: "",
    recommendService: "",
    rating: "",
    comments: "",
  });

  const handleSignature = () => {
    window.scrollTo({
      top: 0,
    });
    navigate('/signature');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      // Check if all fields have values
  if (
    !feedback.callCenterService ||
    !feedback.roadsideService ||
    !feedback.overallService ||
    !feedback.recommendService ||
    !feedback.rating ||
    !feedback.comments
  ) {
    alert("Please fill in all fields before submitting.");
    return;
  }

    const payload = {
      id: 0,
      vehicleConditionReportId: 0,
      callCenterServiceRating: feedback.callCenterService,
      roadsideServiceRating: feedback.roadsideService,
      overallServiceRating: feedback.overallService,
      recommendationLikelihood: parseInt(feedback.rating),
      valuableComments: feedback.comments,
      customerTelephone,
    };

    try {
      const response = await fetch("https://iuat.acrossassist.in/api/Registration/SubmitCustomerFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        handleSignature();
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white max-w-xl mx-auto shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">We Value Your Feedback</h2>

      <div className="mb-4">
        <label className="block font-medium mb-2">1. How do you rate our call center service?</label>
        <div className="gap-4">
          {["Very Good", "Good", "Satisfactory", "Unsatisfactory"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="callCenterService"
                value={option}
                onChange={handleChange}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* 2. Roadside Service */}
      <div className="mb-4">
        <label className="block font-medium mb-2">2. How do you rate our service at the roadside?</label>
        <div className="gap-4">
          {["Very Good", "Good", "Satisfactory", "Unsatisfactory"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="roadsideService"
                value={option}
                onChange={handleChange}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* 3. Overall Service */}
      <div className="mb-4">
        <label className="block font-medium mb-2">3. How do you rate our overall service?</label>
        <div className="gap-4">
          {["Very Good", "Good", "Satisfactory", "Unsatisfactory"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="overallService"
                value={option}
                onChange={handleChange}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* 4. Recommend Service */}
      <div className="mb-4">
        <label className="block font-medium mb-2">4. How likely are you to recommend this service to others?</label>
        <div className="gap-4">
          {["Very Good", "Good", "Satisfactory", "Unsatisfactory"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="recommendService"
                value={option}
                onChange={handleChange}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* 5. Rating Scale */}
      <div className="mb-4">
        <label className="block font-medium mb-2">How likely are you to recommend this service to others?</label>
        <div className="flex flex-wrap justify-between gap-1">
          {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((num) => (
            <label key={num} className="cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={num}
                onChange={handleChange}
                className="hidden"
              />
              <div className="bg-gray-300 hover:bg-orange-500 text-black hover:text-white rounded-md px-2 py-1 text-center text-sm transition-colors duration-300">
                {num}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Your Valuable Comments</label>
        <textarea
          name="comments"
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          placeholder="Enter valuable comments"
        ></textarea>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="w-auto bg-orange-500 px-4 text-white py-2 rounded-md hover:bg-orange-600 transition"
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
