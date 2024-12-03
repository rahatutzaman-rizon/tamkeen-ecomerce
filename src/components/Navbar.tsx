
import { useState } from "react";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { IoCartOutline, IoMenu, IoClose } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { authAtom } from "../atoms/authAtom"; // Import the atom
import logo from "../assets/TamkeenLogo.svg";
import Cookies from "js-cookie";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authState, setAuthState] = useAtom(authAtom); // Get auth state
  const nav = [
    { label: "Home", route: "/" },
    { label: "Category", route: "/category" },
    { label: "Categories", route: "/categories" },
    { label: "Contact", route: "/contact" },
    { label: "Stores", route: "/stores" },
  ];

  const handleLogout = () => {
    // Clear user data and token from cookies so that the user get logged-out
    Cookies.remove("token");
    Cookies.remove("user");

    // Set authentication state to false
    setAuthState({ user: null, isAuthenticated: false });
  };

  return (
    <section className="fixed w-full z-50 bg-white flex justify-center">
      <div className="items-center container flex gap-4 md:px-20 p-6 w-full justify-between">
        {/* Logo */}
        <Link className="w-20" to="/">
          <img src={logo} alt="Tamkeen Logo" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="gap-8 hidden md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.route}
              className="text-gray-500 hover:text-primary hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </ul>

        {/* Search Bar */}
      
        <label className="input input-bordered items-center gap-2 min-w-10 md:min-w-96 max-w-[70vw] self-center hidden md:flex">
  {/* Search Input */}
  <input type="text" className="grow" placeholder="Search" />
  

  {/* Filter Icon */}
  <button
    type="button"
    className="flex items-center justify-center h-14 w-12 rounded-full hover:bg-gray-100"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-8 w-8 opacity-70"
    >
      <path
        d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3Zm-2-6.5h8a.5.5 0 0 1 .43.777L9.6 7.4v3.1a.5.5 0 0 1-.276.447L7 12.577V7.4L3.57 4.777A.5.5 0 0 1 4 4Z"
      />
    </svg>
  </button>
</label>


        {/* Buttons and Cart */}
        <div className="flex items-center gap-4">
          {authState.isAuthenticated ? (
            <div className="flex gap-2">
              <Link to="/cart" className="btn">
                <IoCartOutline size={20} />
              </Link>
              <Link to="/account" className="btn hidden sm:flex">
                <MdOutlineAccountCircle size={28} />
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-danger"
              >
                Logout
              </button>
            </div>
          ) : (
            // Login and Register buttons if not signed in
            <>
              <Link
                to="/signup"
                className="btn btn-primary text-white hidden md:flex"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="btn btn-outline btn-primary hidden md:flex"
              >
                Login
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="absolute top-full left-0 w-full bg-white flex flex-col items-center gap-4 mt-0 py-4 md:hidden shadow-lg">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.route}
                className="text-gray-700 hover:text-primary hover:underline"
                onClick={() => setMenuOpen(false)} // Close menu on click
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-4">
              {authState.isAuthenticated ? (
                <div>
                  <Link
                    onClick={() => setMenuOpen(false)} // Close menu on click
                    to="/account"
                    className="btn"
                  >
                    <MdOutlineAccountCircle size={28} />
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="btn btn-outline btn-danger"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    onClick={() => setMenuOpen(false)} // Close menu on click
                    to="/signup"
                    className="btn btn-primary text-white"
                  >
                    Register
                  </Link>
                  <Link
                    onClick={() => setMenuOpen(false)} // Close menu on click
                    to="/login"
                    className="btn btn-outline btn-primary"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </ul>
        )}
      </div>
    </section>
  );
};

export default Navbar;