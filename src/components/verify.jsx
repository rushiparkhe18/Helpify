import React, { useState } from "react";

const ImageClassifier = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); // Show preview
        }
    };

    const handleUpload = async () => {
        if (!image) {
            alert("Please select an image first!");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("file", image);

        try {
            const response = await fetch("http://localhost:8001/classify", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to classify image");

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Error:", error);
            alert("Error classifying image!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial" }}>
            <h2>Food Image Classifier</h2>

            <input type="file" accept="image/*" onChange={handleImageChange} />
            
            {preview && <img src={preview} alt="Uploaded" style={{ width: "300px", marginTop: "10px" }} />}
            
            <br />
            <button onClick={handleUpload} style={{ marginTop: "10px", padding: "10px 20px", cursor: "pointer" }}>
                {loading ? "Classifying..." : "Classify Image"}
            </button>

            {result && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Prediction: {result.prediction}</h3>
                    <p>Confidence: {result.confidence}%</p>
                </div>
            )}
        </div>
    );
};

export default ImageClassifier;
