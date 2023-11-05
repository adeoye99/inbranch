import React , { useState } from 'react'
import { useForm } from "react-hook-form"
import Signin from "../assets/signin.png"
import PulseLoader from "react-spinners/PulseLoader";
import axios from 'axios'
import providusBank from "../assets/ProvidusBank.png"
// import TextField from '@mui/material/TextField';
// import {  makeStyles } from '@material-ui/core'
import { useNavigate } from "react-router-dom";



const API_URL = process.env.REACT_APP_BaseApi_URL
function Login() {
   
   const { register, handleSubmit ,formState : { errors }, } = useForm({ mode: "onChange"  });
   const [ submitting , setSubmitting ] = useState(false)
   const [invalidCred , setInvalidCred] = useState(false)
//    const [ errorMessage , setErrorMessage ] = useState("") 
   const navigate = useNavigate()
   
   const onSubmit = async (data) =>{
      // console.log(data)
      const encrptedpassword = btoa(data.password)
      const payload = {
        username : data.username,
        password : encrptedpassword
      }
      console.log(payload)
     setSubmitting(true)
      try{
        const response = await axios.post( API_URL + "/auth/login" , payload)
       
        if(response.data.data[0].accessToken) {
         sessionStorage.setItem("token", JSON.stringify(response.data.data[0].accessToken));
         navigate("/Home")
           
       }
   
      }
      catch(e){
         setSubmitting(false)
          setInvalidCred(true)
        //   setErrorMessage("Invalid username or password")
   
      }finally{
         setSubmitting(false)  
      }
   }



//    const useStyles = makeStyles((theme) => ({
//       formControl: {
//         // '& .MuiInputBase-root': {
//         //   '&.Mui-focused': {
//         //     border: `1px solid ${theme.palette.warning.main}`,
//         //     boxShadow: `0 0 0 2px ${theme.palette.warning.light}`,
//         //   },
//         // },
//         "& .MuiInputLabel-outlined.Mui-focused": 
//         {
//           color: "#FDB813"
//         },
//         "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": 
//         {
//           borderColor: "#FDB813"
//         },
//         "&:hover .MuiInputLabel-outlined":
//          {
//           color: "#FDB813"
//         },
//         "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline" : 
//         {
//           borderColor: "#FDB813"
//         },
      
//       },
//       input: 
//       {
//         fontSize: '14px', // set the font size to 14 pixels
//       },
//     }));
//     const classes = useStyles();
 


return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
            
            <div  style = {{ backgroundImage : `url(${Signin})`, backgroundSize: "cover", backgroundPosition: "center"}}> 
            </div>
            <div className='relative'>
                <img src = {providusBank} className='absolute right-8 top-8'  alt = "providus bank" />
              <form 
                 onSubmit={handleSubmit(onSubmit)}  
                 className = 'mt-[26%] items-center my-auto mx-auto grid grid-cols-1 w-[80%] md:w-[50%] gap-y-4' 
               >
                <h1 className = "text-lg md:text-2xl font-medium">IN-BRANCH ACCOUNT OPENING</h1>
                <p className = "" >please enter your credential</p>
                {invalidCred ? <p className='text-red-500'>Invalid username or password</p> : <p></p>}
                
                      <input
                       type = "text"
                        className='border border-black border rounded h-[55px] mt-[4%] pl-4 focus:border-none focus:outline-yellow-500 '
                        placeholder='Username'
                        {...register("username", { required: true })}
                        aria-invalid={errors.username ? "true" : "false"} 
                      />
                        {errors.username?.type === 'required' && <p role="alert" className='text-red-500 font-semibold pt-0' >Username is required</p>}

                       <input
                       type = "password"
                        className='border  border-black  h-[55px] rounded mt-[4%] pl-4  focus:border-none focus:outline-yellow-500' 
                        placeholder='Password'
                        {...register("password", { required: true })}
                        aria-invalid={errors.username ? "true" : "false"} 
                      />
                      {errors.password?.type === 'required' && <p role="alert" className='text-red-500 font-semibold pt-0' >Password is required</p>}
                         

                      {
                        submitting ?
                        <button
                        className='bg-[#FDB815] h-[60px] mt-[10%] rounded text-white active:ring-1 active:ring-offset-2 active:ring-yellow-500 hover:opacity-[0.85] focus:border-yellow-500'
                      >
                          <PulseLoader color = "white"/>
                        
                      </button>
                        
                        :
                         <button
                          className='bg-[#FDB815] h-[60px] mt-[10%] rounded text-white active:ring-1 active:ring-offset-2 active:ring-yellow-500 hover:opacity-[0.85] focus:border-yellow-500'
                         >
                         Sign In
                     </button>
                       }
                </form>
            </div>

        </div>
    </div>
  )
}

export default Login