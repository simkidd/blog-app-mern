import React, { useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAsync,
  deleteCommentAsync,
  updateCommentAsync,
} from "../../store/reducers/commentSlice";

const CommentsContainer = ({ className, loggedInUser, comments, postSlug }) => {
  const dispatch = useDispatch();
  const isLoadingNewComment = useSelector((state) => state.comments.loading);
  const [affectedComment, setAffectedComment] = useState(null);

  const addCommentHandler = (value) => {
    const commentData = {
      desc: value,
      post: postSlug,
      parent: null, // Set the parent as needed
      replyOnUser: null, // Set the replyOnUser as needed
    };
    dispatch(createCommentAsync(commentData));
  };

  const updateCommentHandler = (commentId, commentData) => {
    dispatch(updateCommentAsync({ commentId, commentData }));
  };

  const deleteCommentHandler = (commentId) => {
    dispatch(deleteCommentAsync(commentId));
  };

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={addCommentHandler}
        loading={isLoadingNewComment}
      />
      <div className="space-y-4 mt-8">
        {comments && comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            loggedInUser={loggedInUser}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
