import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchAllPostsAsync } from "../../store/reducers/postSlice";
import { ArticleCardSkeleton } from "../../components/Skeleton";
import Error from "../../components/Error";
import ArticleCard from "../../components/ArticleCard";
import TabButtons from "../../components/TabButtons";

const ArticlesPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchAllPostsAsync());
  }, [dispatch]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter the posts based on the selected category
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <section className="container mx-auto px-5 py-10">
      <div className="flex items-center mb-5">
        <TabButtons
          handleCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
      </div>
      <div className=" flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
        {loading ? (
          [...Array(6)].map((post, i) => (
            <ArticleCardSkeleton
              key={i}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
            />
          ))
        ) : error ? (
          <Error message="Couldn't fetch the posts data" />
        ) : (
          filteredPosts.map((post) => {
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
    </section>
  );
};

export default ArticlesPage;
