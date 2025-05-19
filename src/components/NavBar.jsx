import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();
    const handleLogOut=async()=>{


        try{
            await axios.get(import.meta.env.VITE_BASE_URL+ "/logout",{},{withCredentials:true})
            dispatch(removeUser());
            navigate("/login")
        }catch(err){
          console.log(err)
        }
        
    }

  return (
    <div className="navbar bg-base-200 shadow-sm ">
      <div className="flex-1">
        <Link to="/body" className="btn btn-ghost text-2xl font-bold">
          BarkNet
        </Link>
      </div>

      <div className="flex-none gap-4 items-center ">
        <Link to="/predictor" className="btn btn-primary btn-md normal-case mr-4 rounded-lg">
          Disease Predictor
        </Link>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li onClick={handleLogOut}><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
