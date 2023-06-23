"use client";

import { useState } from "react";

import { useAuthContext } from "@/hooks/useAuthContext";

import Banner from "@/components/homeElements/Banner";
import Wrapper from "@/components/uiElements/Wrapper";
import Categories from "@/components/homeElements/Categories";
import WhyWe from "@/components/homeElements/WhyWe";
import Mission from "@/components/homeElements/Mission";
import About from "@/components/homeElements/About";
import Testimonials from "@/components/homeElements/Testimonials";
import Auth from "../modalElements/Auth";
import Rent from "../modalElements/Rent";

const HomePage = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { user } = useAuthContext();

  return (
    <main className="main">
      {isCreateOpen && <Rent setShowModal={setIsCreateOpen} />}
      {isAuthOpen && isAuthOpen == "login" && (
        <Auth mode="login" setShowModal={setIsAuthOpen} />
      )}
      {isAuthOpen && isAuthOpen == "register" && (
        <Auth mode="register" setShowModal={setIsAuthOpen} />
      )}
      <Wrapper>
        <Banner
          setIsCreateOpen={setIsCreateOpen}
          setIsAuthOpen={setIsAuthOpen}
          user={user}
        />
        <Categories />
        <WhyWe />
        <Mission
          setIsCreateOpen={setIsCreateOpen}
          setIsAuthOpen={setIsAuthOpen}
          user={user}
        />
        <About />
        <Testimonials />
      </Wrapper>
    </main>
  );
};

export default HomePage;
