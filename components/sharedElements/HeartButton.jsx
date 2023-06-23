"use client";

import { useState, useEffect } from "react";

import { useFavorites } from "@/hooks/useFavorite";

import { useAuthContext } from "@/hooks/useAuthContext";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";

import "./HeartButton.scss";

const HeartButton = ({ productId, favoritesList, setShowLoginModal }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);

  const { user } = useAuthContext();

  const { favorite, isLoading, error } = useFavorites();

  const isLiked = favoritesList.some((item) => item._id === user?._id);

  useEffect(() => {
    if (isLiked) {
      setAlreadyLiked(true);
    }
  }, [user]);

  const handleButtonClick = async (e) => {
    console.log("ok");
    e.stopPropagation();

    if (alreadyLiked) {
      setAlreadyLiked(false);
    } else {
      setAlreadyLiked(true);
    }

    await favorite(isLiked, productId, user);
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`${"heart-button"} ${
        alreadyLiked ? " heart-button--liked" : null
      }`}
      aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
      disabled={isLoading}
    >
      <FaHeart />
    </button>
  );
};

export default HeartButton;
