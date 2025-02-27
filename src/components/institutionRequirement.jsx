import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const availableItems = [
  { id: 1, name: "Food Pack" },
  { id: 2, name: "Medical Kit" },
  { id: 3, name: "Blankets" },
];

const InstitutionRequirement = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [institutionName, setInstitutionName] = useState("");
  const [quantities, setQuantities] = useState({}); // Track quantity input

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
    const quantity = quantities[item.id] || 1; // Default to 1 if no input

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

    // Reset the quantity input
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
    <div className="p-5">
      <h1 className="text-2xl font-bold">Welcome, {institutionName}</h1>
      <h2 className="text-lg mt-3">Select Items for Donation Request</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {availableItems.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <h3>{item.name}</h3>
            <input
              type="number"
              min="1"
              value={quantities[item.id] || ""}
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              className="mt-2 p-1 border rounded w-16"
              placeholder="Qty"
            />
            <button
              onClick={() => addToCart(item)}
              className="ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <h2 className="text-lg mt-6">Cart</h2>
      <ul className="mt-2">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between p-2 border rounded">
            {item.name} (x{item.quantity})
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={sendRequest}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send Request
      </button>
    </div>
  );
};

export default InstitutionRequirement;
