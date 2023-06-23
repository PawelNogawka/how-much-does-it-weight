"use client";
import { useState } from "react";

import Auth from "../modalElements/Auth";
import Rent from "../modalElements/Rent";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Logo from "../sharedElements/Logo";

import "./BottomNavbar.scss";

const BottomNavbar = ({ user, dispatch }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  return (
    <div className="bottom-navbar">
      {isCreateOpen && <Rent setShowModal={setIsCreateOpen} />}
      {isNavOpen && isNavOpen == "login" && (
        <Auth mode="login" setShowModal={setIsNavOpen} />
      )}
      {isNavOpen && isNavOpen == "register" && (
        <Auth mode="register" setShowModal={setIsNavOpen} />
      )}
      <Logo />
      <div className="bottom-navbar__right">
        <DesktopNav
          user={user}
          setIsCreateOpen={setIsCreateOpen}
          setIsNavOpen={setIsNavOpen}
        />
        <MobileNav
          dispatch={dispatch}
          user={user}
          setIsCreateOpen={setIsCreateOpen}
          setIsNavOpen={setIsNavOpen}
        />
      </div>
    </div>
  );
};

export default BottomNavbar;
