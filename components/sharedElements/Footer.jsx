import React from "react";
import Link from "next/link";

import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF";
import { AiOutlineTwitter } from "@react-icons/all-files/ai/AiOutlineTwitter";
import { AiFillLinkedin } from "@react-icons/all-files/ai/AiFillLinkedin";
import { AiOutlineInstagram } from "@react-icons/all-files/ai/AiOutlineInstagram";
import { ImLocation } from "@react-icons/all-files/im/ImLocation";
import { AiFillMail } from "@react-icons/all-files/ai/AiFillMail";
import { AiFillPhone } from "@react-icons/all-files/ai/AiFillPhone";

import Wrapper from "../uiElements/Wrapper";
import Logo from "./Logo";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Wrapper>
        <div className="footer__container">
          <div className="footer__row">
            <Logo small />
            <p className="footer__info">
              Akcel is a Crowdfunding & Charity Website by Peterdraw lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et
            </p>
            <div className="footer__social">
              <Link href="/">
                <FaFacebookF />
              </Link>
              <Link href="/">
                <AiOutlineTwitter />
              </Link>
              <Link href="/">
                <AiFillLinkedin />
              </Link>
              <Link href="/">
                <AiOutlineInstagram />
              </Link>
            </div>
          </div>
          <nav aria-label="Footer navigation" className="footer__nav">
            <ul className="footer__row">
              <h3 className="footer__title">Quick links</h3>
              <li>
                <Link href="/">categories</Link>
              </li>
              <li>
                <Link href="/">why we</Link>
              </li>
              <li>
                <Link href="/">who we are</Link>
              </li>
              <li>
                <Link href="/">testimonials</Link>
              </li>
              <li>
                <Link href="/">search</Link>
              </li>
              <li>
                <Link href="/">newsletter</Link>
              </li>
              <li>
                <Link href="/">contact us</Link>
              </li>
            </ul>
            <ul className="footer__row">
              <h3 className="footer__title">resources</h3>
              <li>
                <Link href="/">downolad</Link>
              </li>
              <li>
                <Link href="/">help center</Link>
              </li>
              <li>
                <Link href="/">events</Link>
              </li>
              <li>
                <Link href="/">guides</Link>
              </li>
              <li>
                <Link href="/">partners</Link>
              </li>
              <li>
                <Link href="/">directiories</Link>
              </li>
              <li>
                <Link href="/">contact us</Link>
              </li>
            </ul>
            <ul className="footer__row">
              <h3 className="footer__title">Company</h3>
              <li>
                <Link href="/">login</Link>
              </li>
              <li>
                <Link href="/">sign up</Link>
              </li>
              <li>
                <Link href="/">faq</Link>
              </li>
              <li>
                <Link href="/">create pin</Link>
              </li>
            </ul>
          </nav>
          <div className="footer__row">
            <div className="footer__contact-tile">
              <ImLocation size={20} />
              <address className="footer__contact-value">
                832 Thompson Drive, San Fransisco CA 94107, United States
              </address>
            </div>
            <div className="footer__contact-tile">
              <AiFillMail size={20} />
              <Link href="/" className="footer__contact-value">
                howmuch@contact.com
              </Link>
            </div>
            <div className="footer__contact-tile">
              <AiFillPhone size={20} />
              <Link href="/" className="footer__contact-value">
                394-091-3312
              </Link>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__bottom-text">
            Howmuch Crowdfunding & Charity Website - © 2023
          </p>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
