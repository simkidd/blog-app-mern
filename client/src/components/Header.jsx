import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { logoutUser } from "../store/reducers/authSlice";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [profileDrowpdown, setProfileDrowpdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.admin === true;
  console.log(user);

  const showMenuHandler = () => {
    setShowMenu(!showMenu);
  };

  const profileDropdownHandler = () => {
    setProfileDrowpdown(!profileDrowpdown);
  };

  const toggleDropdownHandler = () => {
    setDropdown(!dropdown);
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
    toast.success("Logout successful!");
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-50 bg-white">
      <Toaster />
      <header className="container mx-auto px-5 flex justify-between py-4 items-center">
        <Link to="/" className="text-3xl font-bold">
          Spot.
        </Link>
        <div className="lg:hidden z-50">
          {showMenu ? (
            <AiOutlineClose className="w-6 h-6" onClick={showMenuHandler} />
          ) : (
            <AiOutlineMenu className="w-6 h-6" onClick={showMenuHandler} />
          )}
        </div>
        <div
          className={`${
            showMenu ? "right-0" : "-right-full"
          } transition-all duration-300 mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 items-center`}
        >
          <ul className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
            <li className="relative group">
              <Link to="/" className="px-4 py-2" onClick={showMenuHandler}>
                Home
              </Link>
              <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
                /
              </span>
            </li>
            <li className="relative group">
              <Link to="/posts" className="px-4 py-2" onClick={showMenuHandler}>
                Articles
              </Link>
              <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
                /
              </span>
            </li>
            <li className="relative group">
              <div>
                <button
                  className="px-4 py-2 flex gap-x-1 items-center"
                  onClick={toggleDropdownHandler}
                >
                  <span>Pages</span>
                  <MdKeyboardArrowDown />
                </button>
                <div
                  className={`${
                    dropdown ? "block" : "hidden"
                  } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                >
                  <ul className="bg-dark-soft lg:bg-white text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                    <Link
                      className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                      onClick={showMenuHandler}
                    >
                      About Us
                    </Link>
                    <Link
                      className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                      onClick={showMenuHandler}
                    >
                      Contact Us
                    </Link>
                  </ul>
                </div>
              </div>
            </li>
            <li className="relative group">
              <Link className="px-4 py-2" onClick={showMenuHandler}>
                Faq
              </Link>
              <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
                /
              </span>
            </li>
          </ul>

          {isAuthenticated ? (
            <div className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
              <div className="relative group">
                <div className="flex flex-col items-center">
                  <button
                    className="flex gap-x-1 items-center mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                    onClick={profileDropdownHandler}
                  >
                    <span>Account</span>
                    <MdKeyboardArrowDown />
                  </button>
                  <div
                    className={`${
                      profileDrowpdown ? "block" : "hidden"
                    } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                  >
                    <ul className="bg-dark-soft lg:bg-white text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                      {isAdmin && (
                        <button
                          onClick={() => navigate("/admin/dashboard")}
                          type="button"
                          className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                        >
                          Admin Dashboard
                        </button>
                      )}
                      <button
                        onClick={() => navigate("/profile")}
                        type="button"
                        className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                      >
                        Profile Page
                      </button>
                      <button
                        onClick={logoutHandler}
                        type="button"
                        className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={showMenuHandler}
              className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Sign in
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
