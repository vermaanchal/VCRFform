import React from "react";
import righticon from "../assets/Right_Circle_Arrow.png";
import { useNavigate } from "react-router-dom";

const FeedBack = () => {
  const navigate = useNavigate();
  const handleContinue3 = () => {
    window.scrollTo({
      top: 0,
    });
    navigate("/value-your-feedback");
  };
  return (
    <div className="flex flex-col items-center p-4  min-h-screen">
      <div className=" text-black w-full py-4 px-6 text-center rounded-t-lg">
        <h1 className="text-xl font-semibold">
          Customer Declaration/ Feedback
        </h1>
      </div>
      <div className="bg-white w-full max-w-lg  p-4 rounded-b-lg text-left text-sm sm:text-base">
        <ol className="list-decimal list-inside space-y-4">
          <li className="py-1">
            I am entitled to the service requested. In the event of this
            subsequently not being the case I shall be responsible for the cost
            of any assistance provided
          </li>
          <li className="py-1">
          I  accept that road side repairs will be of a temporary nature and that advice of a franchised dealer should be sought by me as soon as possible.
          </li>
          <li className="py-1">
          In the case of forced entry, I confirm that I specifically requested that the operator forcefully enter the vehicle and that all damages accessioned there by is and shall be my sole responsibility.
          </li>
          <li className="py-1">
          Across Assist/it's authorized Service Provider is not responsible for the subsequent damage caused by the hydra whenused.
          </li>
          <li className="py-1">
          Any Consequential damage shall be approved at the discretion of Across Assist Pvt. Ltd.

          </li>
          <li className="py-1">
            In case of any dispute, only Court shall have jurisdiction to
            entertain the dispute.
          </li>
          <li className="py-1">
          For pick & drop services, in case of any accident or mishap to the vehicle, the cost of repair for damages shall be covered under the insurance of the vehicle drawn by the customer. In case the vehicle is not insured, the cost of repair shall be borne by the customer only. 
          </li>
          <li className="py-1">
          I confirm that prior to handover any irregularities have marked in the above diagram and pointed out to me. Also I understand, this is pre-inspection VCRF, a detailed Inspection of would done at service center.
          </li>
          {/* <li className="py-1">Call: 0120-4501400</li> */}
        </ol>
      </div>
      {/* Icon pushed to the right */}
      <div className='flex items-center justify-center py-5'>
        <button onClick={handleContinue3} className="bg-orange-500 text-white py-2 px-4 rounded w-full">
          Continue
        </button>
        </div>
    </div>
  );
};

export default FeedBack;
