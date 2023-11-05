import React from 'react'
import providusBank from "../assets/ProvidusBank.png"
import { useNavigate } from 'react-router-dom'

function Header() {
   const navigate = useNavigate()
  const logout = () =>{
    navigate("/")
    sessionStorage.clear();
    window.location.href = '/inbranch';
   
    
  }
  return (
    <div className='bg-white  h-[80px] flex item-center justify-content-center relative bg-white'>
        <div className='absolute top-2 left-[5%]'>
           <img className='' src = {providusBank} alt = "providus"/>
        </div>
        <div className='absolute top-[20px] right-[5%]'>
           <p onClick = {() => logout()} className='text-[#FDB815] font-bold text-xl'> Log Out </p>
        </div>
    </div>
  )
}

export default Header