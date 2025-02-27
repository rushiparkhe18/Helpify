import { createContext, useState, useContext } from "react";

// Create the context
const RequestsContext = createContext();

// Custom hook for easy access
export const useRequests = () => useContext(RequestsContext);

// Provider component
export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  // Function to add new request
  const addRequest = (newRequest) => {
    setRequests((prevRequests) => [...prevRequests, newRequest]);
  };

  return (
    <RequestsContext.Provider value={{ requests, addRequest }}>
      {children}
    </RequestsContext.Provider>
  );
};
