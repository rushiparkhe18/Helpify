import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InstitutionLogin from "./components/InstitutionLogin";
import InstitutionRequirement from "./components/institutionRequirement";
import RequestsPage from "./components/requestspagee";
import Donate from "C:/Users/sanke/OneDrive/Desktop/Tech Horizon/TrustBridge/src/components/donate.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InstitutionLogin />} />
        <Route path="/institution-requirements" element={<InstitutionRequirement />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </Router>
  );
};

export default App;
