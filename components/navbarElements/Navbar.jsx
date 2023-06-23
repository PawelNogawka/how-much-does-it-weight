"use client";

import { useEffect, useState } from "react";

import BottomNavbar from "./BottomNavbar";
import Wrapper from "../uiElements/Wrapper";

import { useAuthContext } from "@/hooks/useAuthContext";

import "./Navbar.scss";

import TopNavabr from "./TopNavabr";

const Navbar = () => {
  const [showShadow, setShowShadow] = useState(false);

  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollY > 0) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`navbar ${showShadow && "navbar--shadow"}`}>
      <Wrapper>
        <TopNavabr user={user} dispatch={dispatch} />
        <BottomNavbar user={user} dispatch={dispatch} />
      </Wrapper>
    </header>
  );
};

export default Navbar;
