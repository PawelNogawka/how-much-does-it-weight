"use client";
import React from "react";
import Comment from "./Comment";
import "./CommentsList.scss";

const CommentsList = ({ setCommentId, comments }) => {

  if (!Array.isArray(comments)) {
    return null;
  }

  const countReplies = (comments) => {
    let count = 0;
    comments.forEach((comment) => {
      count += comment.replies.length;
    });
    return count;
  };

  const totalReplies = countReplies(comments);

  return (
    <div className="comments-list">
      <h3 className="comments-list__heading">
        {comments.length + totalReplies} found comments
      </h3>
      <ul className="comments-list__list">
        {comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <Comment comment={comment} setCommentId={setCommentId} reply />
            <ul className="comments-list__replies">
              {comment.replies.map((reply) => (
                <Comment comment={reply} id={reply.id} key={reply.id} />
              ))}
            </ul>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;
