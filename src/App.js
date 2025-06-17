import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TermsAndCondition from "./components/TermsAndCondition";
import VehicleConditionReport from "./components/VehicleConditionReport";
import NavFirst from "./components/NavFirst";
import VehicleForm from "./components/VehicleForm";
import NavSecond from "./components/NavSecond";
import NavThird from "./components/NavThird";
import FeedBack from "./components/FeedBack";
import FeedbackForm from "./components/FeedbackForm";
import NavFour from "./components/NavFour";
import SignaturePad from "./components/SignaturePad";
import LoginScreen from "./components/LoginScreen";
import { CustomerProvider } from './components/CustomerContext';
import NavFourth from "./components/NavFourth"
import VehicleDropForm from "./components/VehicleDropform";
import DealerSignaturePad from "./components/DealerSignaturePad";
import ThankYouPage from "./components/Thankyou";

function App() {
  return (
    <div className="App">
      <CustomerProvider>

        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NavFirst />
                  <VehicleConditionReport />
                </>
              }
            />

            <Route
              path="/asappropriate"
              element={
                <>
                  <NavSecond />
                  <VehicleForm />
                </>
              }
            />

            <Route
              path="/signature"
              element={
                <>
                  <NavFourth />
                  <SignaturePad />
                </>
              }
            />
            <Route
              path="/vehicleDrop"
              element={
                <>
                <NavThird/>
                  <VehicleDropForm />
                </>
              }
            />

            <Route
              path="/Dealersignature"
              element={
                <>
                  <NavFourth />
                  <DealerSignaturePad />
                </>
              }
            />
              <Route
              path="/Thankyou"
              element={
                <>
                  <ThankYouPage />
                </>
              }
            />
          </Routes>
          
          {/* <Route
            path="/customer-declaration"
            element={
              <>
                <NavThird/>
                <FeedBack/>
              </>
            }
          /> */}
          {/* <Route
            path="/value-your-feedback"
            element={
              <>
                <NavFour/>
                <FeedbackForm/>
              </>
            }
          /> */}
        </Router>
      </CustomerProvider>
    </div>
  );
}

export default App;
