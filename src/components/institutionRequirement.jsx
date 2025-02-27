import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "C:/Users/sanke/OneDrive/Desktop/Tech Horizon/TrustBridge/src/styles.css"; // Import the CSS file

const availableItems = [
  { id: 1, name: "Food Pack", image: "/images/foodpack.jpg" },
  { id: 2, name: "Medical Kit", image: "/images/aid.jpg" },
  { id: 3, name: "Blankets", image: "/images/blankets.jpg" },
  { id: 4, name: "Clothing", image: "/images/clothing.jpg" },
  { id: 5, name: "Water Bottles", image: "/images/water.jpg" },
  { id: 6, name: "Hygiene Kit", image: "/images/hygiene.jpg" },
  { id: 7, name: "Baby Supplies", image: "/images/baby.jpg" },
  { id: 8, name: "Shelter Kit", image: "/images/shelter.jpg" },
  { id: 9, name: "School Supplies", image: "/images/school.jpg" },
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

  const sendRequest = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const requestData = { instituteName: institutionName, supplies: cart };

    try {
      const response = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert("Request Sent Successfully!");
        setCart([]); // Clear the cart after sending
        navigate("/requests");
      } else {
        const errorData = await response.json();
        alert(`Failed to send request: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Try again!");
    }
  };

  return (
    <div>
    

      {/* Navbar */}
      <nav className="navbar">
      <h1>Donation Hub</h1>
        <br />
      <span>Hi, {institutionName}</span>
        
      </nav>

      {/* Main Content - Items on left, cart on right */}
      <div className="container">
        {/* Left side - Items */}
        <div className="items-section">
          <h2 className="section-title">Select Items for Donation</h2>
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
        </div>

        {/* Right side - Cart */}
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