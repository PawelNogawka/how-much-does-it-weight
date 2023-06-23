"use client";

import { useState } from "react";

import SectionHeading from "@/components/uiElements/SectionHeading";
import CommentsForm from "./CommentsForm";
import CommentsList from "./CommentsList";

import "./Comments.scss";

const Comments = ({ productId, comments }) => {
  const [commentId, setCommentId] = useState(null);

  return (
    <section id="comments" className="comments section-padding">
      <SectionHeading
        center
        subtitle="comments"
        title="Share your opinion about the product"
      />
      <div className="comments__container">
        <CommentsForm
          productId={productId}
          commentId={commentId}
          setCommentId={setCommentId}
        />
        <CommentsList setCommentId={setCommentId} comments={comments} />
      </div>
    </section>
  );
};

export default Comments;
