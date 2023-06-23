"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../formElements/Button";

import "./EmptyList.scss";

const EmptyList = ({ title, subtitle, login }) => {
  const [showModal, setShowModal] = useState("");
  const router = useRouter();

  const handleClick = () => {
    if (!login) {
      router.back();
    } else {
      setShowModal("login");
    }
  };

  return (
    <main className="empty-list">
      <div className="empty-list__box">
        <h1 className="empty-list__title">{title}</h1>
        <p className="empty-list__subtitle">{subtitle}</p>
        <Button onClick={handleClick} ariaLabel={login ? "Login" : "Go Back"}>
          {login ? "Login" : "Go Back"}
        </Button>
      </div>
    </main>
  );
};

export default EmptyList;
