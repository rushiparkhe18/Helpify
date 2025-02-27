import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "C:/Users/sanke/OneDrive/Desktop/Tech Horizon/TrustBridge/src/styles.css"; // Import the CSS file

const availableItems = [
  { id: 1, name: "Food Pack", image: "/images/foodpack.jpg" },
  { id: 2, name: "Medical Kit", image: "/images/aid.jpg" },
  { id: 3, name: "Blankets", image: "/images/blankets.jpg" },
];

const InstitutionRequirement = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [institutionName, setInstitutionName] = useState("");
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const name = localStorage.getItem("institutionName");
    if (!name) {
      navigate("/");
    } else {
      setInstitutionName(name);
    }
  }, [navigate]);

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value > 0 ? parseInt(value, 10) : "",
    }));
  };

  const addToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    if (quantity < 1) {
      alert("Please enter a valid quantity!");
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prevCart, { ...item, quantity }];
    });

    setQuantities((prev) => ({ ...prev, [item.id]: "" }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const sendRequest = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }
    const requestData = { institutionName, items: cart };
    localStorage.setItem("requests", JSON.stringify(requestData));
    alert("Request Sent!");
    navigate("/requests");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h1>Donation Hub</h1>
        <span>Hi, {institutionName}</span>
      </nav>

      {/* Main Content */}
      <div className="container">
        <h2>Select Items for Donation</h2>

        {/* Items Grid */}
        <div className="items-grid">
          {availableItems.map((item) => (
            <div key={item.id} className="item-card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <div>
                <input
                  type="number"
                  min="1"
                  value={quantities[item.id] || ""}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="quantity-input"
                  placeholder="Qty"
                />
                <button onClick={() => addToCart(item)} className="add-btn">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        <div className="cart-section">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <div>
                    <img src={item.image} alt={item.name} />
                    <span>{item.name} (x{item.quantity})</span>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button onClick={sendRequest} className="send-btn">
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstitutionRequirement;
