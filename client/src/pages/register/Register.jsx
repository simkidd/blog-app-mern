import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/reducers/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords did not match");
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    dispatch(registerUser(userData));
  };

  return (
    <div className="container mx-auto px-5 py-10">
      <div className="w-full max-w-sm mx-auto">
        <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
          Sign Up
        </h1>
        <form onSubmit={handleSumbit}>
          {error && <div>{error}</div>}
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="name"
              className="text-[#5a7184] font-semibold block"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border `}
            />
          </div>
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="email"
              className="text-[#5a7184] font-semibold block"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border `}
            />
          </div>
          <div className="flex flex-col mb-6 w-full relative">
            <label
              htmlFor="password"
              className="text-[#5a7184] font-semibold block"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border `}
            />
            <small
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute top-2/4 right-3 translate-y-2/4 text-[#6a717e]"
            >
              {showPassword ? "Hide" : "Show"}
            </small>
          </div>
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="confirmPassword"
              className="text-[#5a7184] font-semibold block"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border `}
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            Register
          </button>
          <p className="text-sm font-semibold text-[#5a7184]">
            You have an account?{" "}
            <Link to="/login" className="text-primary">
              Login now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
