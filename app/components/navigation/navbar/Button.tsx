import Link from "next/link";


const Button = () => {
    return (
      <> <a href="/contacts" className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-gray-100 hover:border-transparent hover:text-red-900 hover:bg-white mt-4 lg:mt-0">Contact Us</a>
      <a href="/components/signup" className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-gray-100 hover:border-transparent hover:text-red-900 hover:bg-white mt-4 lg:mt-0">SignIn</a>
      </>
    )
  };
  
  export default Button;