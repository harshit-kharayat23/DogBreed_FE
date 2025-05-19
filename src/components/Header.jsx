import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDisease } from '../utils/diseaseSlice';
import {SUPPORTED_LANGUAGES} from "../utils/constants"

import { changeLanguage } from '../utils/configSlice';
import { Link } from 'react-router-dom';

function Header() {

    
    const dispatch=useDispatch();
    const toggle=useSelector((store)=>store.disease.toggle)
    const handleGptSearchClick=()=>{
            dispatch(toggleDisease())
    }

    const languageHandler=(e)=>{

        dispatch(changeLanguage(e.target.value))
    }



  return (
<div className="w-full shadow-md bg-white sticky top-0 z-50">
  <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 py-4">
    
    {/* Logo */}
    <h2 className="text-blue-600 font-extrabold text-3xl">BarkNet</h2>

    {/* Nav Items */}
    <div className="flex items-center gap-6 flex-wrap">
      <ul className="flex items-center gap-6 text-lg font-medium text-gray-700">
        <li className="hover:text-blue-600 cursor-pointer"><Link to="/">Home</Link></li>
        <li className="hover:text-blue-600 cursor-pointer"><Link to="/about">About Us</Link> </li>
        <li className="hover:text-blue-600 cursor-pointer"><Link to="/contact">Contact Us</Link></li>
      </ul>

      {/* Predictor Button */}
      <button 
        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-200"
        onClick={handleGptSearchClick}
      >
        {toggle ? "Breed Predictor" : "Disease Predictor"}
      </button>

      {/* Language Selector */}
      {toggle && (
        <select 
          className="p-2 bg-amber-100 border border-gray-300 rounded-lg focus:outline-none"
          onChange={languageHandler}
        >
          {SUPPORTED_LANGUAGES.map(lang => (
            <option key={lang.identifier} value={lang.identifier}>
              {lang.name}
            </option>
          ))}
        </select>
      )}

      {/* Logout Button */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200">
        Log Out
      </button>
    </div>
  </div>
</div>

  )
}

export default Header
