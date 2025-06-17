import React from "react";
import righticon from "../assets/Right_Circle_Arrow.png"
import { useNavigate } from 'react-router-dom';

const TermsAndCondition = () => {
    const navigate = useNavigate(); 
    const handleTermsNext=()=>{
      window.scrollTo({
        top: 0,
      });
        navigate('/appendix-1');
    }
  return (
    <div className="flex flex-col items-center p-4  min-h-screen">
      
      <div className="bg-white w-full max-w-lg  p-4 rounded-b-lg text-left text-sm sm:text-base">
        <ol className="list-decimal list-inside space-y-4">
          <li className="py-1">
            Although reasonable care of customer's vehicle is taken all the
            time, and the company does not accept the responsibility for any
            loss or damage occurring to the vehicle during transit as a result
            of fire, flood, weather conditions, accidents or any other
            circumstances beyond the reasonable control or ACROSS ASSIST PVT.
            LTD. Or Service Centre.
          </li>
          <li className="py-1">
          Customers are requested to remove all personal object and other valuables if any from the vehicle before handing over the vehicle for repairs as we shall not accept any responsibility for the same.
          </li>
          <li className="py-1">
          Repair work is undertaken on the clear understanding that the payment of invoice will be made in full by online payment gateway, debit or credit card or cash acceptable to the company before taking delivery. The Company reserves the right to take back the vehicle to SVC until the full payment is received.
          </li>
          <li className="py-1">
          Force majeure special circumstances, beyond the control of ACROSS ASSIST PVT. LTD. or Service Centre. If any will be intimated and no claim/Compensation can be claimed from ACROSS ASSIST PVT. LTD. or Service Centre in such cases.
          </li>
          <li className="py-1">
          Customer are requested to check their vehicle to their entire satisfaction at the time of taking delivery after repairs/service, and no subsequent claims will be entertained.
          </li>
          <li className="py-1">
          In case of any dispute, only Court shall have jurisdiction to entertain the dispute.
          </li>
          <li className="py-1">
          The owner of the vehicle should have a valid driving license, valid insurance policy and registration certificate. A copy of these documents should be made available at the time of pick up of vehicle compulsory.
          </li>
          <li className="py-1">
          The prescribed Pick up and delivery charges (including taxes if any) shall be paid at the time time of delivery.
          </li>
          <li className="py-1">Call: 0120-4501400</li>
        </ol>
      </div>
    {/* Icon pushed to the right */}
    <div className="w-full max-w-lg flex justify-end">
        <button onClick={handleTermsNext}>
        <img src={righticon} className="h-10 w-10 mr-2" alt="LOGO" />
        </button>
      </div>
    </div>
  );
};

export default TermsAndCondition;
