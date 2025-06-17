import React, { useState , useContext} from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import { CustomerContext } from './CustomerContext';

const VehicleConditionReport = () => {
  const navigate = useNavigate();
  const { customerTelephone, setCustomerTelephone } = useContext(CustomerContext);
const locations = useLocation();
  // State variables for each input field
  const [technicianName, setTechnicianName] = useState('');
  const [srnNo, setsrnNo] = useState('');
  const [agencyName, setagencyName] = useState('');
  const [agencyNo, setagencyNo] = useState('');
  const [vehicleNo, setvehicleNo] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [regNo, setRegNo] = useState('');
  const [jobNo, setJobNo] = useState('');
  const [odometerReading, setOdometerReading] = useState('');
  const [kmTravelledByAssistanceVehicle, setKmTravelledByAssistanceVehicle] = useState('');
  const [reportedFault, setReportedFault] = useState('');
  const [customerName, setCustomerName] = useState('');
  // const [customerTelephone, setCustomerTelephone] = useState('');
  const [brandModel, setBrandModel] = useState('');
  const [location, setLocation] = useState('');
  const [reachingTime, setReachingTime] = useState('');
  const [deliveryToDealershipDateTime, setDeliveryToDealershipDateTime] = useState('');

 
  const handleContinue1 = async () => {
    // window.scrollTo({
    //   top: 0,
    // });
    if (!technicianName || !time || !date || !regNo || !jobNo || !odometerReading || 
      !kmTravelledByAssistanceVehicle || !reportedFault || !customerName || 
      !customerTelephone || !brandModel || !location || !reachingTime || 
      !deliveryToDealershipDateTime) {
    alert("Please fill in all required fields.");
    return;
  }

    // Ensure the time is correctly formatted as an object
    const timeArray = time.split(':');
    // const timeFormatted = {
    //   ticks: 0, // You can adjust this if you need to track ticks
    //   days: 0,
    //   hours: parseInt(timeArray[0], 10) || 0,  // Convert hours from time input
    //   minutes: parseInt(timeArray[1], 10) || 0, // Convert minutes from time input
    //   seconds: 0,
    //   milliseconds: 0,
    // };
    const formattedDate = new Date(date.split('/').reverse().join('-')).toISOString();
    const formattedDatereachingTime = new Date(date.split('/').reverse().join('-')).toISOString();
    const formattedDatedeliveryToDealershipDateTime = new Date(date.split('/').reverse().join('-')).toISOString();

    // Gather data to send
    const data = {
      technicianName,
      time,  // Correct time format
      date:formattedDate,
      regNo,
      jobNo,
      odometerReading: parseInt(odometerReading, 10),
      kmTravelledByAssistanceVehicle: parseInt(kmTravelledByAssistanceVehicle, 10),
      reportedFault,
      customerName,
      customerTelephone,
      brandModel,
      location,
      srnNo,
      agencyName,
      agencyNo,
      vehicleNo,
      reachingTime:formattedDatereachingTime,
      deliveryToDealershipDateTime:formattedDatedeliveryToDealershipDateTime,
      report: "Your report data here"
    };

    if(!data){
      return;
    }

    try {
      // Make the POST request to the API
      const response = await fetch('https://iuat.acrossassist.com/api/Registration/SubmitVehicleConditionReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // If the response is successful, navigate to the next page
        navigate('/asappropriate');
      } else {
        // Handle response failure
        console.error('Failed to submit data');
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }
    } catch (error) {
      // Catch and log any errors that occur during the fetch
      console.error('Error:', error);
    }
  };

  //--------for srn number0---------------
//   useEffect(() => {
//     const queryParams = new URLSearchParams(locations.search);
//     const aaNumberFromUrl = queryParams.get("SRNnumber");

//     if (aaNumberFromUrl) {
//         setFormData((prev) => ({
//             ...prev,
//             IntimationNumber: aaNumberFromUrl,
//         }));
//     }
// }, [locations.search]);

//  API- GetSRNData
//--------------------------tarun API------------
  // const handleFetchData = async () => {
  //   if (!srnNo.trim()) {
  //     alert("Please enter an SRN number");
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch("https://mintflix.live:8086/api/Auto/GetSRNData", {
  //       method: "POST", // Change to POST
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ srN_No:srnNo }),
  //     });
  
  //     const result = await response.json();
  
  //     if (result.status && result.dataItem) {
  //       const data = result.dataItem[0];
  //       console.log(data,'ddddd')
  //       const now = new Date();
  //       setDate(now.toISOString().split("T")[0]); // yyyy-mm-dd
  //       setTime(now.toTimeString().split(" ")[0].slice(0, 5));
  //       setTechnicianName(data.technicianName || "");
  //       // setTime(data.time || "");
  //       // setDate(data.date ? data.date.split("T")[0] : "");
  //       setRegNo(data.vehicleNo || "");
  //       setJobNo(data.jobNo || "");
  //       setOdometerReading(data.odometerReading || "");
  //       setReportedFault(data.reportedFault || "");
  //       setCustomerName(data.customerFirstName || "");
  //       setCustomerTelephone(data.customerMobileNo || "");
  //       setBrandModel(data.model_Variant || "");
  //       setLocation(data.incident_Location || "");
  //       setReachingTime(data.reachingTime ? data.reachingTime.split("T")[0] : "");
  //       setagencyName(data.agencyName || ""); 
  //       setagencyNo(data.agencyNo || ""); 
  //       setvehicleNo(data.vehicleNo || "");
  //       setDeliveryToDealershipDateTime(data.deliveryToDealershipDateTime ? data.deliveryToDealershipDateTime.split("T")[0] : "");
  //     } else {
  //       alert("No data found for this SRN number.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     alert("Failed to fetch data. Please try again.");
  //   }
  // };
  
  //-----------saurabh API----------------------------
  const handleFetchData = async () => {
    if (!srnNo.trim()) {
      alert("Please enter an SRN number");
      return;
    }
  
    try {
      const response = await fetch("https://iuat.acrossassist.com/api/Registration/GetVehicleConditionBySRN", {
        method: "POST", // Change to POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ srnNo:srnNo }),
      });
  
      const result = await response.json();
  
      if (result.status && result.data) {
        const data = result.data;
        console.log(data,'ddddd')
        const now = new Date();
        // setDate(now.toISOString().split("T")[0]); // yyyy-mm-dd
        // setTime(now.toTimeString().split(" ")[0].slice(0, 5));
        setKmTravelledByAssistanceVehicle(data.kmTravelledByAssistanceVehicle || "")
        setTechnicianName(data.technicianName || "");
        setTime(data.time || "");
        setDate(data.date ? data.date.split("T")[0] : "");
        setRegNo(data.vehicleNo || "");
        setJobNo(data.jobNo || "");
        setOdometerReading(data.odometerReading || "");
        setReportedFault(data.reportedFault || "");
        setCustomerName(data.customerName || "");
        setCustomerTelephone(data.customerTelephone || "");
        setBrandModel(data.brandModel || "");
        setLocation(data.location || "");
        setReachingTime(data.reachingTime ? data.reachingTime.split("T")[0] : "");
        setagencyName(data.agencyName || ""); 
        setagencyNo(data.agencyNo || ""); 
        setvehicleNo(data.vehicleNo || "");
        setDeliveryToDealershipDateTime(data.deliveryToDealershipDateTime ? data.deliveryToDealershipDateTime.split("T")[0] : "");
      } else {
        alert("No data found for this SRN number.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again.");
    }
  };
  

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 min-h-screen">
      <div className="text-black w-full py-4 px-6 text-center rounded-t-lg">
        <h1 className="text-xl font-semibold">Appendix 1</h1>
      </div>

      <div className="bg-white w-full max-w-lg p-6 rounded-b-lg text-left space-y-4">

      <div className='pb-2'>
          <label className="block font-semibold">SRN Number</label>
          <input
            type="text"
            value={srnNo}
            onChange={(e) => setsrnNo(e.target.value)}
            placeholder="Enter SRN number"
            className="border p-2 w-full rounded"
            onKeyDown={(e) => e.key === "Enter" && handleFetchData()}
          />
        </div>
        <div className='pb-2'>
          <label className="block font-semibold">Agency Name</label>
          <input
            type="text"
            value={agencyName}
            onChange={(e) => setagencyName(e.target.value)}
            placeholder="Enter Agency Name"
            className="border p-2 w-full rounded"
          />
        </div>
        <div className='pb-2'>
          <label className="block font-semibold">Agency Number</label>
          <input
            type="text"
            value={agencyNo}
            onChange={(e) => setagencyNo(e.target.value)}
            placeholder="Enter Agency number"
            className="border p-2 w-full rounded"
          />
        </div>
        <div className='pb-2'>
          <label className="block font-semibold">Vehicle Number</label>
          <input
            type="text"
            value={vehicleNo}
            onChange={(e) => setvehicleNo(e.target.value)}
            placeholder="Enter Vehicle Number"
            className="border p-2 w-full rounded"
          />
        </div>
        
        
        <div className='pb-2'>
          <label className="block font-semibold">Technician Name</label>
          <input
            type="text"
            value={technicianName}
            onChange={(e) => setTechnicianName(e.target.value)}
            placeholder="Enter technician name"
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="12:00"
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="DD/MM/YYYY"
              className="border p-2 w-full rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Reg No</label>
            <input
              type="text"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              placeholder="Enter reg no"
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Job No</label>
            <input
              type="text"
              value={jobNo}
              onChange={(e) => setJobNo(e.target.value)}
              placeholder="Enter job no"
              className="border p-2 w-full rounded"
            />
          </div>
        </div>
        <div className='py-2'>
          <label className="block font-semibold">Odometer Reading (Customer Vehicle)</label>
          <input
            type="text"
            value={odometerReading}
            onChange={(e) => setOdometerReading(e.target.value)}
            placeholder="Enter your odometer reading"
            className="border p-2 w-full rounded"
          />
        </div>
        <div className='py-2'>
          <label className="block font-semibold">KM Travelled by Assistance Vehicle</label>
          <input
            type="text"
            value={kmTravelledByAssistanceVehicle}
            onChange={(e) => setKmTravelledByAssistanceVehicle(e.target.value)}
            placeholder="Enter your km travelled by assistance"
            className="border p-2 w-full rounded"
          />
        </div>
        <div className='py-2'>
          <label className="block font-semibold">Reported Fault</label>
          <input
            type="text"
            value={reportedFault}
            onChange={(e) => setReportedFault(e.target.value)}
            placeholder="Enter your reported fault"
            className="border p-2 w-full rounded"
          />
        </div>
        <div className='py-2'> 
          <label className="block font-semibold">Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter your customer name"
            className="border p-2 w-full rounded"
          />
        </div>
        <div className='py-2'>
  <label className="block font-semibold">Customer Telephone</label>
  <input
    type="text"
    value={customerTelephone}
    onChange={(e) => {
      const input = e.target.value;
      // Allow only numeric values and limit the input to 10 digits
      if (/^\d{0,10}$/.test(input)) {
        setCustomerTelephone(input);
      }
    }}
    placeholder="Enter your customer telephone"
    className="border p-2 w-full rounded"
  />
</div>

        <div className='py-2'>
          <label className="block font-semibold">Brand / Model</label>
          <input
            type="text"
            value={brandModel}
            onChange={(e) => setBrandModel(e.target.value)}
            placeholder="Enter your brand / model"
            className="border p-2 w-full rounded"
          />
        </div>
        <div className='py-2'>
          <label className="block font-semibold">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            className="border p-2 w-full rounded"
          />
        </div>
        <div className='py-2'>
          <label className="block font-semibold">Reaching Date</label>
          <input
            type="date"
            value={reachingTime}
            onChange={(e) => setReachingTime(e.target.value)}
            placeholder="Enter your reaching time"
            className="border p-2 w-full rounded"
          />
        </div>
        <div className='py-2'>
          <label className="block font-semibold">Delivery to Dealership Date & Time</label>
          <input
            type="date"
            value={deliveryToDealershipDateTime}
            onChange={(e) => setDeliveryToDealershipDateTime(e.target.value)}
            placeholder="Enter your Delivery to Dealership Date & Time"
            className="border p-2 w-full rounded"
          />
        </div>
      </div>

      <div className='flex items-center justify-center py-5'>
        <button onClick={handleContinue1} className="bg-orange-500 text-white py-2 px-4 rounded w-full">
          Continue
        </button>
      </div>
    </div>
  );
};

export default VehicleConditionReport;
