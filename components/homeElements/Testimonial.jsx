import React from "react";
import Image from "next/image";

import { CgQuote } from "@react-icons/all-files/cg/CgQuote";
import { AiFillStar } from "@react-icons/all-files/ai/AiFillStar";

import "./Testimonial.scss";

const Testimonial = ({ testimonial }) => {
  const { quote, author, rating, image } = testimonial;

  return (
    <li className="testimonial">
      <div className="testimonial__icon">
        <CgQuote size={80} />
      </div>
      <q className="testimonial__quote">{quote}</q>
      <div className="testimonial__bottom">
        <div className="testimonial__author">
          <Image src={image} alt={author} width={50} height={50} />
          <span className="testimonial__user-name">{author}</span>
        </div>
        <div className="testimonial__rating">
          {Array.from({ length: rating }, (_, index) => (
            <AiFillStar key={index} />
          ))}
        </div>
      </div>
    </li>
  );
};

export default Testimonial;
