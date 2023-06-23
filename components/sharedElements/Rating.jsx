"use client";

import { AiFillStar } from "@react-icons/all-files/ai/AiFillStar";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { FaStarHalf } from "@react-icons/all-files/fa/FaStarHalf";

import "./Rating.scss";

const Rating = ({ comments = [], showAmount, userRating }) => {
  const calculateRating = () => {
    if (!comments || comments.length === 0) {
      return 0;
    }

    let sum = 0;
    comments.forEach((comment) => {
      sum += comment.rate; 
    });

    return sum / comments.length;
  };

  const rating = userRating ? userRating : calculateRating();
  const amount = comments.length;

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<AiFillStar key={i} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalf key={fullStars} />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<AiOutlineStar key={fullStars + i + 1} />);
    }

    return stars;
  };

  return (
    <div className="rating">
      <ul className="rating__list">{renderStars()}</ul>
      {showAmount && (
        <span className="rating__rate">{`${rating.toFixed(
          1
        )} / ${amount} ratings`}</span>
      )}
    </div>
  );
};

export default Rating;
