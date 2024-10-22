"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation'

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({});
  const [apiResponse, setApiResponse] = useState();
  const data = {
    username: user.email,
    password: user.password
  }
  const response = {
    msg: "checking.."
  }
  const [disable, setDisable] = useState(true);
  const [errmsg, setErrmsg] = useState({
    emailerrmsg: "",
    passerrmsg: "",

  });
  const [isFormValid, setIsFormValid] = useState(false);
  const validateForm = () => {
    let errors = {};
    setIsFormValid(true);
    if (!user.email) {
      setIsFormValid(false);
      errors = 'Email is required.';
      setErrmsg({ emailerrmsg: "Email is required.", passerrmsg: "", });
      // setErrmsg.emailerrmsg('Email is required.');  
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors = 'Email is invalid.';
      setIsFormValid(false);
      setErrmsg({ emailerrmsg: "Email is invalid.", passerrmsg: "", });

    } else if (!user.password) {
      errors = 'Password is required.';
      setIsFormValid(false);
      setErrmsg({ passerrmsg: "Password is required", emailerrmsg: "", });
    }
    else if (user.password.length < 6) {
      errors = 'password incorrect';
      setIsFormValid(false);
      setErrmsg({passerrmsg:"password incorrect",emailerrmsg:"" ,});
  }
    setErrors(errors);
      setIsFormValid(Object.keys(errors).length === 0);
  }
    const submitHandler = async () => {
      validateForm();
      if(!isFormValid){
        console.log("return");
        return;
      }
      try {
        console.log(data.username);
        const res = await axios.post("http://localhost:3000/auth", data)
        if (res.data.result == "sucess") {
          router.push("/dashboard");
        } else {
          setApiResponse(res.data.msg);
          console.log(res.data.msg);
          console.log(apiResponse + "  ----");
        }
        //  return response; 

      } catch (error: any) {
        console.log(error);

      }


    }

    useEffect(() => {
      if (user.email.length > 0 && user.password.length > 0) {
        setDisable(false);
      }
      else {
        setDisable(true);
      }
    }, [user])
    return (
      <div className='flex bg-gray-100 min-h-screen justify-center items-center'>
       
        <div className='bg-white p-12 rounded-lg shadow-lg'>
        <img
            alt="Your Company"
            src="/logo.png"
            className="mx-auto h-10 w-auto mb-5"
          />
          <h1 className='font-extrabold text-center mb-10 text-xl'>Sign in to your acconut</h1>
          <h1 className='font-extrabold text-center'></h1>
          <div className='flex flex-col my-3'>
            <label className='text-xs font-semibold mb-2'>Email address</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className='border-2 outline-blue-500 border-gray-200 rounded-md px-2 py-1' />
              <p className='color: blue'>{errmsg.emailerrmsg}</p>
          </div>
          <div className='flex flex-col my-4'>
            <label className='text-xs font-semibold mb-2'>Password</label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='border-2 outline-blue-500 border-gray-200 rounded-md px-2 py-1' />
               <p className='color: blue'>{errmsg.passerrmsg}</p>
          </div>
          <button onClick={submitHandler} className={`${disable ? "bg-blue-700 cursor-not-allowed" : "bg-blue-400"} w-full py-1 my-2 rounded-lg text-white`}>
            Login</button>
          <p className='mt-3'>{apiResponse}</p>
          <p className='mt-3'>Don't have an account? <Link href={"signup"} className='font-bold'>SIGNUP</Link></p>

        </div>

      </div>
    )
  }

  export default LoginPage