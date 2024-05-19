import { useState } from "react";
import axios from "axios";
// import "./Prediction.css"; // Import your CSS file

const Prediction = ({ predict }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { prediction, confidence } = response.data;
      setPrediction(prediction);
      setConfidence(confidence);
      predict(prediction);
    } catch (error) {
      console.error("Error predicting skin disease:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="prediction" className="mt-5 ">
      <div className="mx-auto max-w-lg">
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-300 p-2 mb-4 w-full"
        />

        

        <button
          onClick={handleSubmit}
          disabled={!selectedFile || loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 mr-2"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
        {prediction && (
          <div className="mt-4">
            <h2 className="mb-2">Prediction</h2>
            <p>{prediction}</p>
            <h2 className="mt-4 mb-2">Confidence</h2>
            <p>{confidence}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prediction;
