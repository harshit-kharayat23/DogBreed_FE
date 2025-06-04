import { useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setGeminiResponse("");
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);
    setGeminiResponse("");
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/predict-breed`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      let dogBreed = response?.data?.prediction?.prediction.slice(10);
      let predictionConfidence = parseFloat(
        response?.data?.prediction?.confidence
      ).toFixed(2);

      if (predictionConfidence < 5.0) {
        setResult({
          breed: "Please use a dog image",
          confidence: predictionConfidence,
        });
        return;
      }

      setResult({
        breed: dogBreed,
        confidence: predictionConfidence,
      });

      // Automatically call Gemini API
      const geminiPrompt = `Tell about the ${dogBreed} in one line and then provide a few bullet points on health tips, common diseases, and care suggestions in breif .`;

      const geminiRes = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/gemniResponse`,
        { prompt: geminiPrompt },
        { withCredentials: true }
      );

      setGeminiResponse(geminiRes?.data?.result || "No health info found.");
    } catch (error) {
      console.error("Error uploading image or calling Gemini:", error);
      setGeminiResponse("Something went wrong with Gemini.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 min-h-screen">
      <div className="w-full max-w-md bg-white text-center">
        {/* Upload Box */}
        <label
          htmlFor="fileUpload"
          className="cursor-pointer border-2 border-dashed border-blue-400 rounded-lg px-6 py-10 flex items-center justify-center text-gray-600 hover:border-blue-500 transition w-full h-64"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="object-cover w-full h-full rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <FiUploadCloud className="text-4xl mb-4 text-blue-500" />
              <p className="text-lg font-medium">
                Drop image or click to select
              </p>
              <p className="text-sm text-gray-500 mt-1">
                JPG, PNG, BMP, or WEBP
              </p>
            </div>
          )}
          <input
            type="file"
            id="fileUpload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!image || loading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full transition"
        >
          {loading ? "Predicting..." : "Upload & Predict"}
        </button>
         {/* Caption */}
        <p className="mt-8 text-sm italic text-gray-500">
          For best results, limit the image to just the dog.
        </p>

        {/* Result */}
        {result && (
          <div className="mt-6 text-gray-800 text-lg font-semibold">
            <p>
              Predicted Breed:{" "}
              <span className="text-blue-700">{result.breed}</span>
            </p>
          
          </div>
        )}

       

       
      </div>
       {/* Gemini Response */}
        {geminiResponse && (
          <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-lg w-full text-left text-gray-800 max-w-2xl mx-auto prose prose-sm sm:prose lg:prose-lg ">
            <h3 className="text-xl font-bold text-blue-700 mb-3">
              Health & Breed Info
            </h3>
            <ReactMarkdown>{geminiResponse}</ReactMarkdown>
          </div>
        )}
    </div>
  );
}
