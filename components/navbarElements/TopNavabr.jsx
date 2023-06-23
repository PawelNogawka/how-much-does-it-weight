"use client";

import { useState } from "react";

import { FaDoorOpen } from "@react-icons/all-files/fa/FaDoorOpen";
import { FaDoorClosed } from "@react-icons/all-files/fa/FaDoorClosed";
import { AiFillMail } from "@react-icons/all-files/ai/AiFillMail";
import { AiFillPhone } from "@react-icons/all-files/ai/AiFillPhone";

import Button from "../formElements/Button";
import Auth from "../modalElements/Auth";

import "./TopNavbar.scss";

const TopNavabr = ({ user, dispatch }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="top-navbar">
      {isOpen && <Auth mode="register" setShowModal={setIsOpen} />}
      <div className="top-navbar__signup">
        <p className="top-navbar__signup-text">
          Welcome to Howmuchdoesitweight
        </p>
        {!user && (
          <Button onClick={() => setIsOpen(true)} small ariaLabel="Sign up">
            <FaDoorOpen size={19} />
            sign up now
          </Button>
        )}

        {user && (
          <Button
            onClick={() => dispatch({ type: "LOGOUT" })}
            small
            ariaLabel="Logout"
          >
            <FaDoorClosed size={19} />
            logout
          </Button>
        )}
      </div>
      <div className="top-navbar__contact">
        <div className="top-navbar__contact-tile">
          <AiFillMail size={22} />
          <a aria-label="Call to us" href="tel:+4818237273">
            18-237-273
          </a>
        </div>
        <div className="top-navbar__contact-tile top-navbar__contact-tile--email">
          <AiFillPhone size={22} />
          <a aria-label="Write an email" href="mailto:weights@contact.com">
            weights@contact.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopNavabr;
