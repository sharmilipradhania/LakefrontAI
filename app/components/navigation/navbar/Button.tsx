import Link from "next/link";


const Button = () => {
    return (
      <> <a href="/contacts" className="inline-block text-sm px-4 py-2 leading-none border rounded-xl text-black border-gray-100 hover:border-transparent hover:text-red-900 hover:bg-blue-400 mt-4 lg:mt-3">Contact Us</a>
      <a href="/signup" className="inline-block text-sm px-4 py-2 leading-none border rounded-xl text-black border-gray-100 hover:border-transparent hover:text-red-900 hover:bg-blue-400 mt-4 lg:mt-3">Signup</a>
      <a href="/login" className="inline-block text-sm px-4 py-2 leading-none  rounded-xl text-black  hover:border-transparent hover:bg-blue-400 mt-4 lg:mt-3 rounded-lg">Login</a>
      </>
    )
  };
  
  export default Button;