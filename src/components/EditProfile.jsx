import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDogInfo } from "@/utils/dogSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [dogBreed, setDogBreed] = useState(user?.dogBreed || "");
  const [dogAge, setDogAge] = useState(user?.dogAge || "");
  const [dogGender, setDogGender] = useState(user?.dogGender || "");
  const [dogName, setDogName] = useState(user?.dogName || "");
  const [errorMsg, setErrorMsg] = useState("");
  const [toast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const handleEditProfile = async () => {
    try {
      setErrorMsg("");
      const res = await axios.patch(
        import.meta.env.VITE_BASE_URL + "/profile/update/" + user._id,
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          dogName,
          dogBreed,
          dogAge,
          dogGender,
        },
        { withCredentials: true }
      );
      console.log(res?.data?.data);
      dispatch(addUser(res?.data?.data));
      dispatch(
        addDogInfo({
          dogName: res?.data?.data?.dogName,
          dogBreed: res?.data?.data?.dogBreed,
          dogGender: res?.data?.data?.dogGender,
          dogAge: res?.data?.data?.dogAge,
        })
      );

      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch (err) {
      console.log(err);
      setErrorMsg(err?.response?.data || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-10 px-6 lg:px-20 py-10 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Edit Form */}
      <div className="w-full max-w-xl bg-white shadow-xl rounded-3xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Form Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              First Name
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Last Name
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Your Age
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Your Gender
            </label>
            <Select value={gender} onValueChange={(value) => setGender(value)}>
              <SelectTrigger className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400">
                <SelectValue placeholder="select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Dog's Name
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              value={dogName}
              onChange={(e) => setDogName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Dog's Breed
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              value={dogBreed}
              onChange={(e) => setDogBreed(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Dog's Age
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="number"
              value={dogAge}
              onChange={(e) => setDogAge(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Dog's Gender
            </label>
            <Select
              value={dogGender}
              onValueChange={(value) => setDogGender(value)}
            >
              <SelectTrigger className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400">
                <SelectValue placeholder="select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Profile Photo URL
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>
        </div>

        {errorMsg && <p className="text-red-500 text-sm mt-5">{errorMsg}</p>}

        <button
          className="mt-8 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition duration-300"
          onClick={handleEditProfile}
        >
          Save Changes
        </button>
      </div>

      {/* Live Preview */}
      <UserCard
        user={{
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          dogBreed,
          dogAge,
          dogGender,
          dogName,
        }}
      />

      {toast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl z-50 animate-bounce">
          Profile updated successfully!
        </div>
      )}
    </div>
  );
};

export default EditProfile;
