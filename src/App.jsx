import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InstitutionLogin from "./components/InstitutionLogin";
import InstitutionRequirement from "./components/institutionRequirement";
import RequestsPage from "./components/requestspagee";
import Donate from "C:/Users/sanke/OneDrive/Desktop/Tech Horizon/TrustBridge/src/components/donate.jsx";
import DonationForm from "./components/Landing";
import PaymentQRCode from "./components/payments";
import ImageClassifier from "./components/verify";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InstitutionLogin />} />
        <Route path="/institution-requirements" element={<InstitutionRequirement />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/land" element={<DonationForm />} />
        <Route path="/qr" element={<PaymentQRCode />} />
        <Route path="/verify" element={<ImageClassifier />} />
      </Routes>
    </Router>
  );
};

export default App;
