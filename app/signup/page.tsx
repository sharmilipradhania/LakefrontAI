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
      console.log("return");
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
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
            alt="Your Company"
            src="/logo.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-gray-50 px-6 py-6 shadow sm:rounded-lg sm:px-12">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <p className='block text-sm/6 font-medium text-gray-900'>{errmsg.emailerrmsg}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <p className='block text-sm/6 font-medium text-gray-900'>{errmsg.passerrmsg}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  required
                  value={user.confirmpassword}
                  onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <p className='block text-sm/6 font-medium text-gray-900'>{errmsg.passerrmsg}</p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  )
}

export default SignupPage