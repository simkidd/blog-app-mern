import React, { useEffect } from "react";
import ArticleCard from "../../../components/ArticleCard";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPostsAsync } from "../../../store/reducers/postSlice";
import { ArticleCardSkeleton } from "../../../components/Skeleton";
import Error from "../../../components/Error";

const Articles = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    dispatch(fetchAllPostsAsync());
  }, [dispatch]);

  return (
    <section className="flex flex-col container mx-auto px-5 py-10">
      <div className=" flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
        {loading ? (
          [...Array(3)].map((post, i) => (
            <ArticleCardSkeleton
              key={i}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
            />
          ))
        ) : error ? (
          <Error message="Couldn't fetch the posts data" />
        ) : (
          posts.map((post) => {
            return (
              <ArticleCard
                post={post}
                key={post._id}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            );
          })
        )}
      </div>
      <button className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg">
        <span>More articles</span>
        <FaArrowRight className="w-3 h-3" />
      </button>
    </section>
  );
};

export default Articles;
