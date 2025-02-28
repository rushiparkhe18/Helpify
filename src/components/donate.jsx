import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import vendorsData from "C:/Users/sanke/OneDrive/Desktop/Tech Horizon/TrustBridge/vendors.json";

const Donate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const request = location.state;
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    if (!request) {
      navigate("/requests");
    }
  }, [request, navigate]);

  let institutionData;
  try {
    institutionData = JSON.parse(request?.instituteName);
  } catch (error) {
    console.error("Error parsing instituteName:", error);
    institutionData = { institutionName: "Unknown", city: "Unknown" };
  }

  const calculateTotal = () => {
    if (!selectedVendor) return 0;
    return request.supplies.reduce((total, item) => {
      const price = selectedVendor.prices[item.name] || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const handleConfirmDonation = () => {
    alert(`Thank you for donating! Total Amount: ₹${calculateTotal()}`);
    navigate("/qr");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "rgba(151, 146, 146, 0.93)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "1px 4px 50px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h1 style={{ textAlign: "center", color: "#333" }}>
            Donate to {institutionData.institutionName} ({institutionData.city})
          </h1>
          <button
            onClick={() => navigate("/verify")}
            style={{
              padding: "8px 15px",
              backgroundColor: "#ff9800",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Verify ✅
          </button>
        </div>

        <h2 style={{ color: "#555", marginBottom: "10px" }}>Select a Vendor</h2>
        <div style={{ display: "grid", gap: "10px" }}>
          {vendorsData.map((vendor) => (
            <div
              key={vendor.id}
              style={{
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: selectedVendor?.id === vendor.id ? "#e3f2fd" : "#f9f9f9",
                transition: "background 0.3s",
              }}
            >
              <h3 style={{ margin: "0 0 5px 0", color: "#222" }}>{vendor.name}</h3>
              <p style={{ margin: "0 0 10px 0", color: "#777" }}>📍 {vendor.location}</p>
              <button
                onClick={() => setSelectedVendor(vendor)}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Select Vendor
              </button>
            </div>
          ))}
        </div>

        {selectedVendor && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#eef5f9",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <h2 style={{ color: "#444", marginBottom: "10px" }}>Donation Summary</h2>
            <ul style={{ padding: "0", listStyle: "none", marginBottom: "10px" }}>
              {request.supplies.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    color: "#333",
                  }}
                >
                  {item.name} (x{item.quantity})
                  <span style={{ fontWeight: "bold", color: "#007bff" }}>
                    ₹{selectedVendor.prices[item.name] * item.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <h3 style={{ color: "#008000" }}>Total: ₹{calculateTotal()}</h3>
            <button 
              onClick={handleConfirmDonation}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                marginTop: "10px",
              }}
            >
              Confirm Donation ✅
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donate;
