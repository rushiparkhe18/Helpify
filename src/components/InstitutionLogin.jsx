import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InstitutionLogin = () => {
  const [institutionName, setInstitutionName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (institutionName.trim() === "") {
      alert("Please enter an institution name.");
      return;
    }

    localStorage.setItem("institutionName", institutionName);
    navigate("/institution-requirements"); // Redirect to requirements page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Institution Login</h1>
      <input
        type="text"
        placeholder="Enter Institution Name"
        value={institutionName}
        onChange={(e) => setInstitutionName(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4 w-64"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Proceed
      </button>
    </div>
  );
};

export default InstitutionLogin;
