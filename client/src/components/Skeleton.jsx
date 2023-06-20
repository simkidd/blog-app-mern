import React from "react";
import { BiImageAlt } from "react-icons/bi";

export const ArticleCardSkeleton = ({ className }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className} animate-pulse`}
    >
      {/* image */}
      <div className="w-full aspect-video bg-slate-300" />
      <div className="p-5">
        {/* title */}
        <div className="w-56 h-2 mt-4 bg-slate-300 rounded-lg" />
        {/* caption */}
        <div className="w-24 h-2 mt-4 bg-slate-300 rounded-lg" />
        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            {/* profile image */}
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-300" />
            <div className="flex flex-col">
              {/* user's name */}
              <div className="w-24 h-2 bg-slate-300 rounded-lg" />
              {/* verified status */}
              <div className="w-16 h-2 mt-2 bg-slate-300 rounded-lg" />
            </div>
          </div>
          {/* date */}
          <div className="w-10 h-2 mt-4 bg-slate-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export const ArticleDetailSkeleton = () => {
  return (
    <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start animate-pulse">
      <article className="flex-1">
        {/* post image */}
        <div className="rounded-xl w-full aspect-video bg-slate-300 flex justify-center items-center">
          <BiImageAlt className="text-4xl text-slate-400" />
        </div>
        {/* title */}
        <div className="mt-4 md:text-[26px] w-2/5 h-2 rounded-lg bg-slate-400" />
        <div className="mt-4 prose prose-sm sm:prose-base">
          <p className="w-1/2 h-2 mt-6 rounded-lg bg-slate-300"></p>
          <p className="w-full h-2 mt-4 rounded-lg bg-slate-300"></p>
          <p className="w-[70%] h-2 mt-4 rounded-lg bg-slate-300"></p>
          <p className="w-4/5 h-2 mt-4 rounded-lg bg-slate-300"></p>
        </div>
      </article>

      {/* Suggested posts */}
      <div
        className={`w-full shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-lg p-4 mt-8 lg:mt-0 lg:max-w-xs`}
      >
        {/* title */}
        <div className="w-[20%] h-2 rounded-lg bg-slate-300" />
        <div className="grid gap-y-5 mt-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1">
          {[...Array(6)].map((item, index) => (
            <div
              key={index}
              className="flex space-x-3 flex-nowrap items-center"
            >
              {/* image */}
              <div className="aspect-square w-1/5 rounded-lg bg-slate-300" />
              <div className="w-full">
                {/* post title */}
                <div className="w-full h-2 rounded-lg bg-slate-300" />
                <p className="w-[60%] h-2 mt-4 rounded-lg bg-slate-300"></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
