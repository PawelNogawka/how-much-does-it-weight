"use client";
import React, { useState, useMemo } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";
import { GiFruitBowl } from "@react-icons/all-files/gi/GiFruitBowl";
import Avatar from "../uiElements/Avatar";
import Rating from "../sharedElements/Rating";
import UserProducts from "./UserProducts";
import Wrapper from "../uiElements/Wrapper";
import Auth from "../modalElements/Auth";
import "./UserPage.scss";

const UserPage = ({ addedProducts, commentedProducts, likedProducts }) => {
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(true);
  };

  const allComments = useMemo(() => {
    const comments = addedProducts.flatMap((product) => product.comments);
    return comments;
  }, [addedProducts]);

  const calculateTotalLikes = () => {
    return likedProducts.reduce((total, product) => {
      return total + product.likes.length;
    }, 0);
  };

  const totalLikes = useMemo(() => calculateTotalLikes(), [likedProducts]);

  if (!user && !showModal) {
    return <Auth mode="login" setShowModal={setShowModal} />;
  }

  return (
    <main className="user-page main">
      <div className="user-page__header">
        <div className="user-page__header-container">
          <h1 className="user-page__heading">Your profile</h1>
          <p className="user-page__desc">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
          </p>
          <div className="user-page__avatar-box">
            <Avatar
              name={user?.username}
              src={user?.image !== "" ? user?.image : "/1.png"}
              width={200}
            />
            <b className="user-page__avatar-name">{user.username}</b>
            <div className="user-page__avatar-info">
              <div className="user-page__avatar-tile">
                <GiFruitBowl size={30} />
                <span>{addedProducts.length} Products</span>
              </div>
              <div className="user-page__avatar-tile">
                <AiFillHeart size={30} />
                <span> {totalLikes} Added to favorites</span>
              </div>
            </div>

            <Rating comments={allComments} showAmount />
          </div>
        </div>
      </div>
      <Wrapper>
        {addedProducts.length > 0 && (
          <UserProducts
            products={addedProducts}
            subtitle="added"
            title={"Explore products that you have added"}
            id="added"
          />
        )}
        {likedProducts.length > 0 && (
          <UserProducts
            products={likedProducts}
            subtitle="favorite"
            title={"Explore products that you have liked"}
            id="favorite"
          />
        )}
        {commentedProducts.length > 0 && (
          <UserProducts
            products={commentedProducts}
            subtitle="commented"
            title={"Explore products that you have commented"}
            id="commented"
          />
        )}
      </Wrapper>
    </main>
  );
};

export default UserPage;
