"use client";

import moment from "moment";

import Avatar from "@/components/uiElements/Avatar";
import Rating from "../../sharedElements/Rating";

import "./Comment.scss";

const Comment = ({ comment, user = null, reply, setCommentId }) => {
  const { text, creator, date, rate } = comment;

  return (
    <li className="comment">
      <div className="comment__left">
        {user && <Avatar src={user.image} name={creator.name} width={60} />}
        {!user && <Avatar src="/user1.jpg" name="user" width={60} />}
      </div>
      <div className="comment__right">
        <div className="comment__right-top">
          <h4 className="comment__name">{creator.name}</h4>
          <time className="comment__date">{moment(date).fromNow()}</time>
          {reply && rate && <Rating userRating={rate} showAmount={false} />}
        </div>
        <p className="comment__comment">{text}</p>
        {reply && (
          <button
            onClick={() => setCommentId(comment._id)}
            className="comment__btn"
            aria-label="Reply to this comment"
          >
            REPLY
          </button>
        )}
      </div>
    </li>
  );
};

export default Comment;
