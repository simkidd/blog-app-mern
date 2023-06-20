import React from "react";
import { Link } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import images from "../constants/images";
import { UPLOADS_URL } from "../constants/uploads";

const ArticleCard = ({ className, post }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
    >
      <Link to={`/posts/${post.slug}`}>
        <img
          src={post.photo ? UPLOADS_URL + post.photo : images.SamplePostImage}
          alt="title"
          className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
        />
      </Link>
      <div className="p-5">
        <Link to={`/posts/${post.slug}`}>
          <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
            {post.title}
          </h2>
          <p className="text-dark-light mt-3 text-sm md:text-lg">
            {post.caption}
          </p>
        </Link>
        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={
                post.user.profilePic
                  ? UPLOADS_URL + post.user.profilePic
                  : images.UserImage
              }
              alt="post profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                {post.user.name}
              </h4>
              <div className="flex items-center gap-x-2">
                <span className={`w-fit bg-opacity-20 p-1.5 rounded-full`}>
                  {post.user.verified ? (
                    <BsCheckLg className=" text-[#36B37E]" />
                  ) : (
                    <AiOutlineClose className=" text-red-500" />
                  )}
                </span>
                <span className="italic text-dark-light text-xs md:text-sm">
                  writer
                </span>
              </div>
            </div>
          </div>
          <span className="font-bold text-dark-light italic text-sm md:text-base">
            {new Date(post.createdAt).getDate()}{" "}
            {new Date(post.createdAt).toLocaleString("default", {
              month: "long",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
