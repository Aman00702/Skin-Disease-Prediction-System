import React, { useState, useEffect } from "react";
import axios from "axios";
import Typed from "typed.js"; // Import Typed.js

const Generate = ({ prediction }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const gen = async () => {
    try {
      setLoading(true);
      const res = {
        message:
          "Explain the " +
          prediction +
          " skin disease in brief and provide 3 solutions for its cure",
      };
      const predicted = await axios.post("http://127.0.0.1:5000/generate", res);
      const { generated } = predicted.data;
      setResult(generated);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result) {
      // Initialize Typed.js after result is set
      const options = {
        strings: [result],
        typeSpeed: 0.05,
        backSpeed: 30,
        loop: false,
      };
      const typed = new Typed("#typed-text", options);

      // Clean up
      return () => {
        typed.destroy();
      };
    }
  }, [result]);

  return (
    <div id="generate">
      <div className="mx-auto max-w-lg p-4">
        <h1 className="text-3xl font-bold mb-4">Generating Page</h1>
        {prediction && (
          <h1 className="text-xl mb-4">Prediction: {prediction}</h1>
        )}
        <button
          onClick={gen}
          disabled={!prediction || loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
        <div id="typed-text" className="mt-4"></div>{" "}
        {/* Container for Typed.js */}
      </div>
    </div>
  );
};

export default Generate;
