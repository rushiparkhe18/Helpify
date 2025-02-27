const handleSendRequest = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instituteName: "ABC Institute",
        supplies: [{ name: "Notebooks", quantity: 50 }],
      }),
    });

    if (!response.ok) throw new Error("Failed to send request");

    const data = await response.json();
    console.log("✅ Request Sent:", data);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
};
