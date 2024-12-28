import Link from "next/link";

const Sidebar = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}): JSX.Element => {
  return (
    <>
      <div
        className={`fixed inset-0 z-20 transition-transform duration-300 ease-in-out bg-white ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/30 z-10 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggle}
        ></div>

        {/* Sidebar Content */}
        <div className="relative w-72 h-full flex flex-col justify-start items-center pt-24 bg-gradient-to-r from-indigo-600 to-purple-500 text-white shadow-lg z-20">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-200"
            onClick={toggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
            </svg>
          </button>

          {/* Navigation Links */}
          <ul className="flex flex-col items-center w-full mt-10 space-y-6 text-lg font-medium">
            <li className="hover:scale-105 transition-transform">
              <Link href="/aboutus" onClick={toggle}>
                <p className="hover:text-gray-200">About Us</p>
              </Link>
            </li>
            <li className="hover:scale-105 transition-transform">
              <Link href="/productDescription" onClick={toggle}>
                <p className="hover:text-gray-200">Services</p>
              </Link>
            </li>
            <li className="hover:scale-105 transition-transform">
              <Link href="/contacts" onClick={toggle}>
                <p className="hover:text-gray-200">Contacts</p>
              </Link>
            </li>
            <li className="hover:scale-105 transition-transform">
              <Link href="/blog" onClick={toggle}>
                <p className="hover:text-gray-200">Blog</p>
              </Link>
            </li>
            <li className="hover:scale-105 transition-transform">
              <Link href="/login" onClick={toggle}>
                <p className="hover:text-gray-200">Log In</p>
              </Link>
            </li>
            <li className="hover:scale-105 transition-transform">
              <Link href="/signup" onClick={toggle}>
                <p className="bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-gray-200">
                  Get Started
                </p>
              </Link>
            </li>
          </ul>

          {/* Footer Section */}
          <div className="absolute bottom-10 text-center text-sm text-gray-300">
            <p>&copy; 2024 LakeFrontAI</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;