import React, { useState } from "react";
import axios from "axios";

export default function QRgeneration() {
  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [qrImage, setQrImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      dogName,
      dogBreed,
      userName,
      phoneNumber,
    };

    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/generateQR",
        formData,
        { withCredentials: true }
      );
      setQrImage(res.data.qrImage);
    } catch (err) {
      alert("Error generating QR: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Generate Dog QR Code</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Dog Name</label>
          <input
            type="text"
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Dog Breed</label>
          <input
            type="text"
            value={dogBreed}
            onChange={(e) => setDogBreed(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Your Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            pattern="[0-9]{10}"
            title="Enter 10-digit phone number"
            className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-xl transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate QR"}
        </button>
      </form>

      {qrImage && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-medium mb-2">Your QR Code</h3>
          <img src={qrImage} alt="Generated QR Code" className="mx-auto" />
          <a
            href={qrImage}
            download="dog_qr_code.png"
            className="inline-block mt-3 text-blue-600 underline hover:text-blue-800"
          >
            Download QR Code
          </a>
        </div>
      )}
    </div>
  );
}
