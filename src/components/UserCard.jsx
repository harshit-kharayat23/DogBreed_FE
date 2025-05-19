import React from 'react'

const UserCard = ({user}) => {
    const {firstName,lastName,age,gender,photoUrl}=user
  return (

    <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
            <img
            src={user.photoUrl}
            alt="userphoto" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName } {lastName}</h2>
            <p>Age: {age}</p>
            <p>Gender: {age}</p>
            <div className="card-actions justify-end">

            </div>
        </div>
    </div>
  )
}

export default UserCard
