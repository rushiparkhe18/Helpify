import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InstitutionLogin from "./components/InstitutionLogin";
import InstitutionRequirement from "./components/institutionRequirement";
import RequestsPage from "./components/requestspagee";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InstitutionLogin />} />
        <Route path="/institution-requirements" element={<InstitutionRequirement />} />
        <Route path="/requests" element={<RequestsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
