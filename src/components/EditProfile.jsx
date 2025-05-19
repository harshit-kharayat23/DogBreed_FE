import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';

const EditProfile = ({user}) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [errorMsg, setErrorMsg] = useState('');
  const [toast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditProfile = async () => {
    try {
      setErrorMsg('');
      const res = await axios.put(
        import.meta.env.VITE_BASE_URL + '/edit-profile',
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate('/profile'); // Change to desired page
      }, 2500);
    } catch (err) {
      setErrorMsg(err?.response?.data || 'Something went wrong.');
    }
  };

  return (
    <div className='flex justify-center items-center'>
    <div className="flex justify-center items-center my-20 mx-10">
      {toast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success shadow-lg">
            <span>✅ Profile updated successfully!</span>
          </div>
        </div>
      )}

      <div className="card card-dash bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-xl mb-4">Edit Profile</h2>

          {/* First Name */}
          <label className="text-sm font-semibold text-gray-700 mb-1">First Name</label>
          <label className="input validator mb-3">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          {/* Last Name */}
          <label className="text-sm font-semibold text-gray-700 mb-1">Last Name</label>
          <label className="input validator mb-3">
            <input
              type="text"

              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          {/* Age */}
          <label className="text-sm font-semibold text-gray-700 mb-1">Age</label>
          <label className="input validator mb-3">
            <input
              type="number"

              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>

          {/* Gender */}
          <label className="text-sm font-semibold text-gray-700 mb-1">Gender</label>
          <select
            className="select select-bordered w-full mb-3"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option disabled value="">
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Others</option>
          </select>

          {/* Photo URL */}
          <label className="text-sm font-semibold text-gray-700 mb-1">Photo URL</label>
          <label className="input validator mb-3">
            <input
              type="text"
              placeholder="Profile Photo URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </label>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
          )}

          {/* Submit Button */}
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary w-full" onClick={handleEditProfile}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <UserCard user={user}/>
    </div>
  );
};

export default EditProfile;
