import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InstitutionLogin = () => {
    const [formData, setFormData] = useState({
      institutionName: "",
      address: "",
      city: "",
      country: "",
      license: "",
    });
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleLogin = (e) => {
      e.preventDefault(); // Prevents form submission reload (if inside a form)
  
      if (Object.values(formData).some((value) => value.trim() === "")) {
        alert("Please fill out all fields.");
        return;
      }
      
      localStorage.setItem("institutionName", JSON.stringify(formData));
      navigate("/institution-requirements"); // Redirect to requirements page
    };
  
  // Style object for form inputs to avoid repetition
  const inputStyle = {
    width: "100%", 
    background: "linear-gradient(135deg,rgba(255, 255, 255, 0.51),rgb(225, 230, 237))",
    padding: "12px", 
    border: "1px solid #aaa", 
    borderRadius: "6px", 
    fontSize: "16px",
    color: "#333" // Ensure text is visible regardless of color scheme
  };
  
  // Override the body styles for this component
  // This will ensure our component layout works correctly
  return (
    <div 
      className="login-container"
      style={{ 
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        background: "rgb(183, 177, 177)", 
        padding: "20px",
        zIndex: 1000 // Ensure our component is on top
      }}
    >
      <div style={{ 
        backgroundColor: "white", 
        boxShadow: "0 6px 45px rgb(0, 0, 0)", 
        borderRadius: "10px", 
        padding: "40px", 
        width: "100%", 
        maxWidth: "420px",
        color: "#333" // Ensure text is visible regardless of dark/light mode
      }}>
        <h1 style={{ 
          textAlign: "center", 
          marginBottom: "20px", 
          fontSize: "26px", 
          
          fontWeight: "bold", 
          color: "rgb(36, 115, 5)",
          lineHeight: "1.2", // Override the h1 line-height from index.css
          
        }} >
          Institution Login 
        </h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="text"
            name="institutionName"
            placeholder="Institution Name"
            value={formData.institutionName}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="license"
            placeholder="License Number"
            value={formData.license}
            onChange={handleChange}
            style={inputStyle}
          />
          <button
            onClick={handleLogin}
            style={{ 
              width: "100%", 
              backgroundColor: "rgb(36, 115, 5)", 
              color: "white", 
              padding: "12px", 
              border: "none", 
              borderRadius: "6px", 
              cursor: "pointer", 
              fontSize: "16px", 
              transition: "background 0.3s",
              fontWeight: "500" // Match the button style from index.css
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#163d65")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#1e3c72")}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstitutionLogin;