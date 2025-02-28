import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../requests.css";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/requests")
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);

  return (
    <div>
      <h1>All Institution Requests</h1>

      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <div className="requests-container">
          {requests.map((req, index) => {
            let institutionData;
            try {
              institutionData = JSON.parse(req.instituteName); // Parse JSON safely
            } catch (error) {
              console.error("Error parsing instituteName:", error);
              institutionData = { institutionName: "Unknown", city: "Unknown" }; // Fallback
            }

            return (
              <div key={index} className="request-card">
                <h2>{institutionData.institutionName} - {institutionData.city}</h2>
                <ul>
                  {req.supplies.map((item, i) => (
                    <li key={i}>
                      {item.name} (x{item.quantity})
                    </li>
                  ))}
                </ul>
                <button 
                  className="donate-btn" 
                  onClick={() => navigate(`/donate`, { state: req })}
                >
                  Donate
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Requests;
