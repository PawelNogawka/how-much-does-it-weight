"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { productNav, mainNav } from "@/data/navItems";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { CgMenu } from "@react-icons/all-files/cg/CgMenu";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import Button from "../formElements/Button";
import "./MobileNav.scss";

const Portal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const container = document.querySelector("#overlays");

  return mounted && container ? createPortal(children, container) : null;
};

const MobileNav = ({
  user = null,
  setIsCreateOpen,
  setIsNavOpen,
  dispatch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isProductPage = pathname?.includes("products");

  const handleModalClick = (e) => {
    const target = e.target;
    if (target.closest(".mobile-nav__list")) {
      return;
    }
    setIsOpen(false);
  };

  const renderNavItems = () => {
    const navItems = isProductPage ? productNav : mainNav;

    return navItems.map((item) => (
      <li key={item.name}>
        {item.url.startsWith("#") ? (
          <Link
            href={`${pathname}${item.url}`}
            className="mobile-nav__link"
            scroll={false}
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </Link>
        ) : (
          <Link
            href={`${item.url}`}
            className="mobile-nav__link"
            scroll={false}
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </Link>
        )}
      </li>
    ));
  };

  const hanldeAuthBtnClick = (mode) => {
    setIsNavOpen(mode);
    setIsOpen(false);
  };

  return (
    <nav className="mobile-nav">
      <div className="mobile-nav__row">
        <div className="mobile-nav__auth-btns">
          <Button
            onClick={() => hanldeAuthBtnClick("register")}
            ariaLabel="Sign up"
            small
            secondary
          >
            Signup
          </Button>
          <button
            onClick={() => hanldeAuthBtnClick("login")}
            className="mobile-nav__auth-login-btn"
            aria-label="login"
          >
            login
          </button>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="/"
          className="mobile-nav__btn"
        >
          {isOpen ? <AiOutlineClose size={25} /> : <CgMenu size={25} />}
        </button>
      </div>
      {isOpen && (
        <Portal>
          <div onClick={handleModalClick} className="mobile-nav__overlay">
            <ul className="mobile-nav__list">
              {renderNavItems()}
              <div className="mobile-nav__btns">
                {user ? (
                  <>
                    <li>
                      <Button outline ariaLabel="Go to your profile">
                        <FaUser size={20} />
                        my account
                      </Button>
                    </li>
                    <li>
                      <Button
                        onClick={() => dispatch({ type: "LOGOUT" })}
                        dark
                        ariaLabel="Logout"
                      >
                        logout
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Button
                        onClick={() => hanldeAuthBtnClick("register")}
                        outline
                        ariaLabel="Sign up"
                      >
                        sign up
                      </Button>
                    </li>
                    <li>
                      <Button
                        onClick={() => setIsNavOpen("login")}
                        dark
                        ariaLabel="Login"
                      >
                        login
                      </Button>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </Portal>
      )}
    </nav>
  );
};

export default MobileNav;
