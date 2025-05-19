import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Body from './Body'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Home = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector(store=>store.user)
    const fetchUser=async()=>{

      try{
        const res=await axios.get(import.meta.env.VITE_BASE_URL+ "/profile",{withCredentials:true})
          dispatch(addUser(res?.data?.data))
      }
      catch(err){
        navigate("/login")
        console.log(err)
      }
        
    }

    useEffect(()=>{
      if(user.length==0){
        fetchUser();
      }

    },[])

  return (
    <div>
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default Home
