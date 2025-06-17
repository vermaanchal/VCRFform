import React from 'react';
import lefticon from "../assets/lefticon.png";
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate(); 
  const handleClick=()=>{
    navigate("/");
  }
  return (
    <div className="bg-[linear-gradient(180deg,_#A1BFFF_0%,_#79A3FF_100%)] relative h-14">
    <div className="flex items-center justify-between mx-auto p-2 relative z-10">
        {/* Left Icon */}
        <button onClick={handleClick} className="flex-shrink-0 z-20">
            <img src={lefticon} className="h-10 w-10" alt="LOGO" />
        </button>

        {/* Centered Text */}
        <div className="absolute inset-0 flex justify-center items-center">
            <p className="text-xl font-semibold text-white">Terms And Conditions</p>
        </div>
    </div>
</div>
  );
};

export default Nav;
