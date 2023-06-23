import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import { useAuthContext } from "@/hooks/useAuthContext";

import "./Author.scss";

const Author = ({ author, createdAt }) => {
  const user = useAuthContext();

  return (
    <div className="author">
      <Image
        src={author?.image ? author.image : "/1.png"}
        alt={author.username}
        width={60}
        height={60}
      />
      <div className="author__right">
        <h3 className="author__name">Hosted by {author.username}</h3>
        <div className="author__bottom">
          <time className="author__date">{moment(createdAt).fromNow()}</time>
          <span className="author__line">|</span>
          <span className="author__articles-amount">15 articles</span>
          {user._id === author._id && (
            <>
              <span className="author__line">|</span>
              <Link
                className="author__link"
                href={`/user/${author._id}`}
                aria-label="Go to your profile"
              >
                See profile
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Author;
