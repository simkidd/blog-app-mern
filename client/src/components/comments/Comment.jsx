import React from "react";
import CommentForm from "./CommentForm";
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";
import images from "../../constants/images";
import { UPLOADS_URL } from "../../constants/uploads";

const Comment = ({
  comment,
  loggedInUser,
  affectedComment,
  setAffectedComment,
  addComment,
  updateComment,
  deleteComment,
  replies,
  parentId,
}) => {
  const isUserLoggedIn = !!loggedInUser;
  const commentBelongsToUser =
    loggedInUser && loggedInUser.id === comment.user.id;
  const isReplying = affectedComment && affectedComment.type === "replying";
  const isEditing = affectedComment && affectedComment.type === "editing";
  const repliedCommentId = affectedComment && affectedComment._id;
  const replyOnUserId = comment.user.id;

  const editComment = () => {
    setAffectedComment({ type: "editing", _id: comment._id });
  };

  const cancelEdit = () => {
    setAffectedComment(null);
  };

  const replyToComment = () => {
    setAffectedComment({ type: "replying", _id: comment._id });
  };

  const cancelReply = () => {
    setAffectedComment(null);
  };

  return (
    <div className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg">
      <img
        src={
          comment.user.profilePic
            ? UPLOADS_URL + comment.user.profilePic
            : images.UserImage
        }
        alt="user profile"
        className="w-9 h-9 object-cover rounded-full"
      />
      <div className="flex-1 flex flex-col">
        <h5 className="font-bold text-dark-hard text-xs lg:text-sm">
          {comment.user.name}
        </h5>
        <span className="text-xs text-dark-light">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        {!isEditing && (
          <p className="font-opensans mt-[10px] text-dark-light">
            {comment.desc}
          </p>
        )}
        {isEditing && (
          <CommentForm
            btnLabel="Update"
            formSubmitHandler={(value) => updateComment(value, comment._id)}
            formCancelHandler={cancelEdit}
            initialText={comment.desc}
          />
        )}
        <div className="flex items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3">
          {isUserLoggedIn && (
            <button
              className="flex items-center space-x-2"
              onClick={replyToComment}
            >
              <FiMessageSquare className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}
          {commentBelongsToUser && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={editComment}
              >
                <FiEdit2 className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button
                className="flex items-center space-x-2"
                onClick={() => deleteComment(comment._id)}
              >
                <FiTrash className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentForm
            btnLabel="Reply"
            formSubmitHandler={(value) =>
              addComment(value, repliedCommentId, replyOnUserId)
            }
            formCancelHandler={cancelReply}
          />
        )}
        {replies.length > 0 && (
          <div>
            {replies.map((reply) => (
              <Comment
                key={reply._id}
                addComment={addComment}
                affectedComment={affectedComment}
                setAffectedComment={setAffectedComment}
                comment={reply}
                deleteComment={deleteComment}
                loggedInUser={loggedInUser}
                replies={[]}
                updateComment={updateComment}
                parentId={comment._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
