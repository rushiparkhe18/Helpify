import { useState, useEffect } from "react";

const RequestsPage = () => {
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("requests"));
    if (data) {
      setRequests(data);
    }
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Donation Requests</h1>
      {requests ? (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{requests.institutionName}</h2>
          <ul>
            {requests.items.map((item, index) => (
              <li key={index} className="border p-2 rounded mt-2">
                {item.name} (x{item.quantity})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4">No requests found.</p>
      )}
    </div>
  );
};

export default RequestsPage;
