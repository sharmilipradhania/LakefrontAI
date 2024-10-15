"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import toast from 'react-hot-toast';


const SignupPage = () => {
  const router = useRouter();
  const [ disable, setDisable] = useState(true);
  const [errors, setErrors] =useState ({});
  const [errmsg,setErrmsg] =useState ({
    emailerrmsg:"",
    passerrmsg:"",
    confirmpasserrmsg: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [user, setUser] = useState({
    firstname: " ",
    lastname: " ",
    email: " ",
    password: "",
   confirmpassword:"",
    state : " ",
    city : " ",
    street : " ",
    zip : " ",
  });
  

 
  // Validate form
  const validateForm = () => {
      let errors = {};
      setIsFormValid(true);
    //   if (!user.firstname) {
    //       errors = 'Fisrt Name is required.';
    //   }
    //   if (!user.lastname) {
    //     errors = ' Last Name is required.';
    // }
    // console.log(user.email + "   -------");
      if (!user.email) {
        setIsFormValid(false);
        errors = 'Email is required.';
        setErrmsg({emailerrmsg: "Email is required.", passerrmsg: "",confirmpasserrmsg:"",});
       // setErrmsg.emailerrmsg('Email is required.');  
      } else if (!/\S+@\S+\.\S+/.test(user.email)) {
          errors = 'Email is invalid.';
          setIsFormValid(false);
          setErrmsg({emailerrmsg: "Email is invalid.", passerrmsg: "",confirmpasserrmsg:"",});
         
      } else if (!user.password) {
          errors = 'Password is required.';
          setIsFormValid(false);
          setErrmsg({passerrmsg:"Password is required",emailerrmsg:"",confirmpasserrmsg:"",});
      }
      else if (user.password.length < 6) {
        errors = 'Password must be at least 6 characters.';
        setIsFormValid(false);
        setErrmsg({passerrmsg:"Password must be at least 6 characters.",emailerrmsg:"" ,confirmpasserrmsg:""});
    }else if (user.confirmpassword !=user.password) {
            errors = 'Password not matched';
            setIsFormValid(false);
            setErrmsg({passerrmsg:" ",emailerrmsg:" ",confirmpasserrmsg:"password not matched"});
      }  else {
        setErrmsg({emailerrmsg:"",passerrmsg:"", confirmpasserrmsg:""});
      }
//       if (!user.country) {
//         errors = 'country is required.';
//       } 
//      if (!user.state) {
//       errors = 'State is required.';
//      }
//   if (!user.city) {
//     errors = 'city name  is required.';
// }
// if (!user.street) {
//   errors = 'street is required.';
// }
// if (!user.zip) {
//   errors = 'zipcode is required.';
// }
   

      setErrors(errors);
      setIsFormValid(Object.keys(errors).length === 0);
  };
  useEffect(() => {
    if (user.firstname.length >0 && user.email.length > 0 && user.password.length > 0) {
      setDisable(false);
    }
    else {
      setDisable(true);
    }
  }, [user])
  const submitHandler = async () => {
    validateForm();
    if(!isFormValid){
      console.log("retturn");
      return;
    }
      

    try {
      const res = await axios.post("http://localhost:3000/register", user);
      router.push("/login");
      console.log(res);
      toast.success(res.data.message)
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    
  }
  
  return (
    <div className='flex bg-gray-100 min-h-screen justify-center items-center'>
      <div className='bg-white p-12 rounded-lg shadow-lg'>
        <h1 className='font-extrabold text-3xl text-center mb-4'>Create a free account</h1>
        <h1 className='font-extrabold text-xl text-center'>SIGN UP</h1>
        {/* <div className='flex flex-col my-3'>
          <label>firstname</label>
          <input type="text"
            value={user.firstname}
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
            className='border-2 outline-none border-gray-500 rounded-md px-2 py-1' />
        </div> */}
        {/* <div className='flex flex-col my-3'>
          <label>lastname</label>
          <input type="text"
            value={user.lastname}
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            className='border-2 outline-none border-gray-500 rounded-md px-2 py-1' />
        </div> */}
        <div className='flex flex-col my-4'>
          <label className='text-xs font-bold'>Email Address</label>
          <input type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className='border-2 outline-blue border-black rounded-md px-2 py-1' />
             <p className='color: blue'>{errmsg.emailerrmsg}</p>
        </div>
        <div className='flex flex-col my-4'>
          <label className='text-xs font-bold'>Password</label>
          <input type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className='border-2 outline-blue border-black rounded-md px-2 py-1' />
            <p className='color: blue'>{errmsg.passerrmsg}</p>
        </div>
        <div className='flex flex-col my-4'>
          <label className='text-xs font-bold'>Confirm Password</label>
          <input type="password"
            value={user.confirmpassword}
            onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })}
            className='border-2 outline-blue border-black rounded-md px-2 py-1' /> 
            <p className='color: blue'>{errmsg.confirmpasserrmsg}</p>
        </div>
       
        {/* <div className='flex flex-col my-3'>
          <label>country</label>
          <input type="text"
            value={user.country}
            onChange={(e) => setUser({ ...user, country: e.target.value })}
            className='border-2 outline-none border-gray-500 rounded-md px-2 py-1' />
        </div>
        <div className='flex flex-col my-3'>
          <label>State</label>
          <input type="text"
            value={user.state}
            onChange={(e) => setUser({ ...user, state: e.target.value })}
            className='border-2 outline-none border-gray-500 rounded-md px-2 py-1' />
        </div>
        <div className='flex flex-col my-3'>
          <label>City</label>
          <input type="text"
            value={user.city}
            onChange={(e) => setUser({ ...user, city: e.target.value })}
            className='border-2 outline-none border-gray-500 rounded-md px-2 py-1' />
        </div>
        <div className='flex flex-col my-3'>
          <label>Street</label>
          <input type="text"
            value={user.street}
            onChange={(e) => setUser({ ...user, street: e.target.value })}
            className='border-2 outline-none border-gray-500 rounded-md px-2 py-1' />
        </div>
        <div className='flex flex-col my-3'>
          <label>Zip</label>
          <input type="text"
            value={user.zip}
            onChange={(e) => setUser({ ...user, zip: e.target.value })}
            className='border-2 outline-none border-gray-500 rounded-md px-2 py-1' />
        </div> */}
        <button onClick={submitHandler}  className={`${disable ? "bg-blue-700 cursor-not-allowed" : "bg-blue-700"} w-full py-1 my-2 rounded-lg text-white mt-4`}>Signup</button>
        <p className='mt-4 text-blue'>Already have an account? <Link href={"/login"} className='font-bold'>LOGIN</Link></p>  
      </div>
    
           
    </div>
  )
}

export default SignupPage