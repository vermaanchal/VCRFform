import React from 'react';
import lefticon from "../assets/lefticon.png";
import { useNavigate } from 'react-router-dom';

const NavFour = () => {
    const navigate = useNavigate(); 
    const moveTerms = () => {
        // alert("Button clicked!");
        navigate("/customer-declaration"); // Navigate to the desired route
    }

    return (
        <div className="bg-[linear-gradient(180deg,_#A1BFFF_0%,_#79A3FF_100%)] relative h-14">
            <div className="flex items-center justify-between mx-auto p-2 relative z-10">
                {/* Left Icon */}
                <button onClick={moveTerms} className="flex-shrink-0 z-20">
                    <img src={lefticon} className="h-10 w-10" alt="LOGO" />
                </button>

                {/* Centered Text */}
                <div className="absolute inset-0 flex justify-center items-center">
                    <p className="text-xl font-semibold text-white">Vehicle Condition Report</p>
                </div>
            </div>
        </div>
    );
};

export default NavFour;
