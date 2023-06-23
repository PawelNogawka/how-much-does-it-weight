import React from "react";
import SectionHeading from "../uiElements/SectionHeading";
import Testimonial from "./Testimonial";

import "./Testimonials.scss";

const testimonials = [
  {
    quote:
      "I love the food app! It has made my meal planning so much easier and enjoyable. The recipes are delicious and the interface is user-friendly.",
    author: "Emily Johnson",
    rating: 5,
    image: "/user3.jpg",
    id:1
  },
  {
    quote:
      "Since using the app, I have discovered new and exciting recipes that I wouldn't have tried otherwise. It has expanded my culinary horizons and brought more variety to my meals.",
    author: "Michael Thompson",
    rating: 4,
    image: "/user1.jpg",
    id:2
  },
  {
    quote:
      "The food app has become an essential tool in my kitchen. It saves me time and effort by providing quick and healthy recipe options. Highly recommended!",
    author: "Sophia Rodriguez",
    rating: 5,
    image: "/user4.jpg",
    id:3
  },
  {
    quote:
      "As a busy professional, I appreciate the convenience of the food app. It helps me plan my meals in advance and ensures that I always have nutritious options available.",
    author: "Daniel Wilson",
    rating: 4,
    image: "/user2.jpg",
    id:4
  },
];
const Testimonials = () => {
  return (
    <section className="testimonials section-padding">
      <SectionHeading
        center
        title="Testimonials"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      />
      <ul className="testimonials__container">
        {testimonials.map((testimonial) => (
          <Testimonial key={testimonial.id} testimonial={testimonial} />
        ))}
      </ul>
    </section>
  );
};

export default Testimonials;
