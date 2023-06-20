import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ProfilePicture from "../../components/ProfilePicture";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-5 py-10">
      <div className="w-full max-w-sm mx-auto">
      <ProfilePicture />
        <form>
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
              placeholder="Enter email"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border `}
            />
          </div>
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="password"
              className="text-[#5a7184] font-semibold block"
            >
              New Password (optional)
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border `}
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
