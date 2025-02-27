import { useState, useEffect } from "react";
import "../requests.css";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/requests")
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);

  return (
    <div>
      <h1>All Institution Requests</h1>

      {/* Display Requests */}
      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <div className="requests-container">
          {requests.map((req, index) => (
            <div key={index} className="request-card">
              <h2>{req.instituteName}</h2>
              <ul>
                {req.supplies.map((item, i) => (
                  <li key={i}>
                    {item.name} (x{item.quantity})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
