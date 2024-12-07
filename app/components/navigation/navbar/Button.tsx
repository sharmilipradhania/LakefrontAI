import Link from "next/link";


const Button = () => {
    return (
      <> 
        <div className="space-x-2">
          <a href="/login" className="rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Log in
          </a>

          <a href="/signup" className="rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Get Started
          </a>
        </div>
      </>
    )
  };
  
  export default Button;