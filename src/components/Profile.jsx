import React, { useEffect, useState } from 'react';
import EditProfile from './EditProfile';
import UserCard from './UserCard';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector(store => store?.user?.loggedInUser);


  return (
    user && (
      <div className="flex justify-center gap-10 items-start p-10">
        <EditProfile user={user}/>
      </div>
    )
  );
};

export default Profile;
