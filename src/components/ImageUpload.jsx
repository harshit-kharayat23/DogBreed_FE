import { useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi"; // upload icon

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/predict`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResult({
        breed: response.data.breed,
        confidence: response.data.confidence,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
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
      <p className="text-lg font-medium">Drop image or click to select</p>
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

        {/* Result */}
        {result && (
          <div className="mt-6 text-gray-800 text-lg font-semibold">
            <p>Predicted Breed: <span className="text-blue-700">{result.breed}</span></p>
            <p>Confidence: <span className="text-blue-700">{result.confidence}%</span></p>
          </div>
        )}

        {/* Caption */}
        <p className="mt-8 text-sm italic text-gray-500">
          For best results, limit the image to just the dog.
        </p>
      </div>
    </div>
  );
}
