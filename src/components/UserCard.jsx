import React from 'react';

const UserCard = ({ user }) => {
  const {
    firstName,
    lastName,
    age,
    gender,
    photoUrl,
    dogAge,
    dogGender,
    dogBreed,
    dogName,
  } = user;

  return (
    <div className="max-w-sm w-full bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-3xl p-8 text-center border border-gray-200 transition hover:shadow-2xl">
      <div className="relative">
        <img
          src={photoUrl}
          alt="Profile"
          className="w-36 h-36 object-cover rounded-full mx-auto mb-4 border-4 border-blue-300 shadow-lg"
        />
      </div>
      <h3 className="text-2xl font-bold text-gray-800">{firstName} {lastName}</h3>
      <p className="text-sm text-gray-600 mt-1">Age: {age} | Gender: {gender}</p>

      <div className="mt-5 text-sm text-left text-gray-700 space-y-2">
        <p>🐾 <strong>Dog's Name:</strong> {dogName}</p>
        <p><strong>Dog's Age:</strong> {dogAge}</p>
        <p><strong>Dog's Breed:</strong> {dogBreed}</p>
        <p><strong>Dog's Gender:</strong> {dogGender}</p>
      </div>
    </div>
  );
};

export default UserCard;
