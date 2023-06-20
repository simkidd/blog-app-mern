import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../components/Breadcrumbs";
import images from "../../constants/images";
import { Link, useParams } from "react-router-dom";
import CommentsContainer from "../../components/comments/CommentsContainer";
import SocialShareButtons from "../../components/SocialShareButtons";
import SuggestedPosts from "./container/SuggestedPosts";
import { UPLOADS_URL } from "../../constants/uploads";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostAsync } from "../../store/reducers/postSlice";
import { ArticleDetailSkeleton } from "../../components/Skeleton";
import Error from "../../components/Error";

const ArticleDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.posts.posts.find((post) => post.slug === slug)
  );
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);
  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const comments = post ? post.comments : []; // Assign an empty array if post.comments is undefined


  useEffect(() => {
    dispatch(fetchPostAsync(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (post) {
      setBreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Blogs", link: "/posts" },
        { name: post.title, link: `/posts/${post.slug}` },
      ]);
    }
  }, [post]);

  return (
    <>
      {loading ? (
        <ArticleDetailSkeleton />
      ) : error ? (
        <Error message="Couldn't fetch the post detail" />
      ) : (
        post && (
          <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:gap-x-5 lg:items-start">
            <BreadCrumbs data={breadCrumbsData} />
            <div className="flex flex-col lg:flex-row lg:gap-x-5 lg:items-start">
              <article className="flex-1">
                <img
                  className="rounded-xl w-full"
                  src={
                    post.photo
                      ? UPLOADS_URL + post.photo
                      : images.SamplePostImage
                  }
                  alt={post.title}
                />
                <div className="mt-4 flex gap-2">
                  {/* {post.categories.map((category) => ( */}
                  <Link
                    to={`/blog?category=`}
                    className="text-primary text-sm font-roboto inline-block md:text-base"
                  >
                    category.name
                  </Link>
                  {/* ))} */}
                </div>
                <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
                  {post.title}
                </h1>
                <div
                  className="mt-4 prose prose-sm sm:prose-base"
                  dangerouslySetInnerHTML={{ __html: post.body }}
                />
                <CommentsContainer
                  className="mt-10"
                  loggedInUser={user}
                  comments={comments}
                  postSlug={slug}
                />
              </article>
              <div>
                <SuggestedPosts
                  header="Latest Article"
                  // posts={postsData}
                  tags={post.tags}
                  className="mt-8 lg:mt-0 lg:max-w-xs"
                />
                <div className="mt-7">
                  <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
                    Share on:
                  </h2>
                  <SocialShareButtons
                  //   url={encodeURI(window.location.href)}
                  //   title={encodeURIComponent(data?.title)}
                  />
                </div>
              </div>
            </div>
          </section>
        )
      )}
    </>
  );
};

export default ArticleDetail;
