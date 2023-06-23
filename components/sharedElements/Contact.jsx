import React from "react";
import Link from "next/link";
import Image from "next/image";

import { ImLocation } from "@react-icons/all-files/im/ImLocation";
import { AiFillMail } from "@react-icons/all-files/ai/AiFillMail";
import { AiFillPhone } from "@react-icons/all-files/ai/AiFillPhone";

import Input from "../formElements/Input";
import Wrapper from "../uiElements/Wrapper";
import SectionHeading from "../uiElements/SectionHeading";

import "./Contact.scss";

const Contact = () => {
  return (
    <section id="contact" className="contact section-padding">
      <Wrapper>
        <SectionHeading
          center
          title={"Contact Us"}
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <div className="contact__container">
          <div className="contact__methods">
            <div className="contact__method">
              <div className="contact__method-icon-box">
                <ImLocation size={30} />
              </div>
              <div className="contact__method-right">
                <h3 className="contact__method-name">telephone</h3>
                <Link href="/">394-091-3312</Link>
              </div>
            </div>
            <div className="contact__method">
              <div className="contact__method-icon-box">
                <AiFillMail size={30} />
              </div>
              <div className="contact__method-right">
                <h3 className="contact__method-name">mail</h3>
                <Link href="/">howmuch@contact.com</Link>
              </div>
            </div>
            <div className="contact__method">
              <div className="contact__method-icon-box">
                <AiFillPhone size={30} />
              </div>
              <div className="contact__method-right">
                <h3 className="contact__method-name">our address</h3>
                <address>
                  832 Thompson Drive, San Fransisco CA 94107, United States
                </address>
              </div>
            </div>
          </div>
          <div className="contact__map">
            <Image
              className="contact__map-img"
              src="/map.png"
              alt="location map"
              width={800}
              height={500}
            />
            <Image
              className="contact__map-pin"
              src="/pin.svg"
              alt="location pin"
              width={80}
              height={80}
            />
          </div>
          <form className="contact__form">
            <h3 className="contact__heading">Write us a message</h3>
            <div className="contact__form-container">
              <div className="contact__form-input-group">
                <Input
                  ariaLabel="Enter your name"
                  type="text"
                  label="Full name"
                  placeholder="Enter your name..."
                />
                <Input
                  ariaLabel="Enter your email"
                  type="email"
                  label="Full name"
                  placeholder="Enter your email..."
                />
              </div>
              <div className="contact__form-input-group">
                <Input
                  ariaLabel="Enter your phone  number"
                  type="number"
                  label="phone number"
                  placeholder="Enter your phone number..."
                />
                <Input
                  ariaLabel="Enter your company name"
                  type="text"
                  label="company Name"
                  placeholder="Enter your company name..."
                />
              </div>
              <Input
                type="textarea"
                placeholder="Enter message..."
                label="Message:"
              />
            </div>
          </form>
        </div>
      </Wrapper>
    </section>
  );
};

export default Contact;
