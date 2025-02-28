import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../land.css"; // Updated CSS filename

function App() {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const navigate = useNavigate(); // Initialize navigation function

  return (
    <div className="trust-app">
      {/* Navbar */}
      <nav className="trust-navbar">
        <div className="trust-logo">🤝 TrustBridge</div>
        <div className="trust-nav-links">
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <button className="trust-login-btn" onClick={() => setShowRoleModal(true)}>
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="trust-hero">
        <h1>Building Trust Between Donors and Charitable Institutes</h1>
        <p>Join our platform that ensures transparent and impactful giving.</p>
        <button className="trust-donate-btn" onClick={() => setShowRoleModal(true)}>
          Start Donating
        </button>
      </header>

      {/* Features Section */}
      <section className="trust-features">
        <div className="trust-card">
          <h3>💚 For Donors</h3>
          <p>Support verified charitable causes with confidence.</p>
        </div>
        <div className="trust-card">
          <h3>📄 For Charities</h3>
          <p>Connect with donors who believe in your cause.</p>
        </div>
      </section>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="trust-modal">
          <div className="trust-modal-content">
            <h2>Choose Your Role</h2>
            <p>Select how you'd like to join TrustBridge</p>
            <button 
              className="trust-role-btn" 
              onClick={() => {
                navigate("/requests"); // Navigate to requests page for donors
              }}
            >
              Continue as Donor
            </button>
            <button 
              className="trust-role-btn" 
              onClick={() => {
                navigate("/"); // Navigate to home for charities
              }}
            >
              Continue as Charity
            </button>

            <button className="trust-back-btn" onClick={() => setShowRoleModal(false)}>
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
