"use client";

import { useState } from "react";

import { useAuthContext } from "@/hooks/useAuthContext";

import Wrapper from "../uiElements/Wrapper";
import ProductHeader from "./ProductHeader";
import LoginSpur from "../sharedElements/LoginSpur";
import TableSection from "./TableSection";
import ProductWidget from "./ProductWidget";
import Health from "./Health";
import Comments from "./comments/Comments";
import Recipes from "./Recipes";
import Auth from "../modalElements/Auth";

import "./ProductDetails.scss";
import DonateWidget from "./DonateWidget";

const ProductDetails = ({
  product,
  latestProducts,
  similarProducts,
  recipes,
}) => {
  const [isAuthOpen, setIsAuthOpen] = useState("");

  const { user } = useAuthContext();

  return (
    <main className="product main">
      {isAuthOpen && isAuthOpen == "login" && (
        <Auth mode="login" setShowModal={setIsAuthOpen} />
      )}
      {isAuthOpen && isAuthOpen == "register" && (
        <Auth mode="register" setShowModal={setIsAuthOpen} />
      )}
      <Wrapper>
        <ProductHeader product={product} user={user} />
      </Wrapper>
      {!user && <LoginSpur setIsAuthOpen={setIsAuthOpen} />}
      <Wrapper>
        <div className="product__container">
          <div className="product__left">
            <TableSection
              data={product.nutrition}
              photoWeight={product.image.amount}
              user={user}
              mode="nutrition"
            />
            <TableSection
              data={product.minerals}
              photoWeight={product.image.amount}
              user={user}
              mode="minerals"
            />
            <TableSection
              data={product.vitamins}
              photoWeight={product.image.amount}
              user={user}
              mode="vitamins"
            />
          </div>
          <div className="product__right ">
            {similarProducts.length > 0 && (
              <ProductWidget title="similar" products={similarProducts} />
            )}
            <ProductWidget title="latest" products={latestProducts} />
            <DonateWidget />
          </div>
        </div>
        <Health healthFeatures={product.healthFeatures} />
        {recipes.length > 0 && <Recipes recipes={recipes} user={user} />}
        <Comments comments={product.comments} productId={product._id} />
      </Wrapper>
    </main>
  );
};

export default ProductDetails;
