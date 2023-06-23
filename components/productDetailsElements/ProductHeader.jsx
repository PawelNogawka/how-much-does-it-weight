"use client";
import { useState } from "react";
import Image from "next/image";

import { useDelete } from "@/hooks/useDelete";

import { AiFillDelete } from "@react-icons/all-files/ai/AiFillDelete";
import { FaPencilAlt } from "@react-icons/all-files/fa/FaPencilAlt";

import HeartButton from "../sharedElements/HeartButton";
import ShareBtn from "../pinElements/ShareBtn";
import Rating from "../sharedElements/Rating";
import Ingredients from "../sharedElements/Ingredients";
import Diagram from "../sharedElements/Diagram";
import Author from "../sharedElements/Author";
import UsersLikes from "./UsersLikes";
import ConfirmModal from "../sharedElements/ConfirmModal";
import Rent from "../modalElements/Rent";

import "./ProductHeader.scss";

const ProductHeader = ({ product, user }) => {
  const {
    title,
    image,
    nutrition,
    creator,
    comments,
    _id,
    photoEnergy,
    createdAt,
  } = product;

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { deleteItem, isLoading, error } = useDelete();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (user?._id !== creator._id) return;


    await deleteItem(`/api/products/${_id}/delete/${user._id}`);

    setShowConfirmModal(false);
  };

  return (
    <section className="product__header section-padding">
      {showConfirmModal && (
        <ConfirmModal
          onSubmit={handleFormSubmit}
          setShowModal={setShowConfirmModal}
          title="Are you sure to delete this product?"
          isLoading={isLoading}
          error={error}
        />
      )}
      {showEditModal && (
        <Rent setShowModal={setShowEditModal} mode="edit" product={product} />
      )}
      <div className="product__header-left">
        <Image
          className="product__header-img"
          src={image.photo}
          width={300}
          height={500}
          alt={title}
        />
      </div>
      <div className="product__header-right">
        <div className="product__header-right-top">
          <div className="product__header-right-row">
            <h1 className="product__header-heading">{title}</h1>
            <span className="product__header-right-weight">
              {image.amount}g on photo
            </span>
          </div>
          <div className="product__header-right-btns">
            <HeartButton productId={_id} favoritesList={product.likes} />
            <ShareBtn />
            {user && user?._id === creator._id && (
              <>
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="product__header-user-btn product__header-user-btn--delete"
                  aria-label="Delete product"
                >
                  <AiFillDelete size={27} />
                </button>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="product__header-user-btn product__header-user-btn--edit"
                  aria-label="Edit product"
                >
                  <FaPencilAlt size={20} />
                </button>
              </>
            )}
          </div>
        </div>
        <Rating comments={comments} showAmount />

        <Ingredients
          title={`${image.amount} g of products contains`}
          nutrition={nutrition.photoWeight}
        />
        <Diagram
          energy={photoEnergy?.amount}
          userBmr={user?.bmr ? user.bmr : null}
        />
        <p className="product__header-desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In quod unde
          magnam facilis dolor maxime fuga inventore placeat laborum, doloremque
          sint blanditiis, ullam minima non? Facilis nesciunt nihil sed
          similique voluptatum dolore illo cupiditate praesentium, fuga
          repellendus consequuntur pariatur reiciendis neque iste amet unde
          incidunt at. Vitae laudantium minus quaerat?
        </p>
        <div className="product__header-bottom">
          <Author author={creator} createdAt={createdAt} />
          {product.likes.length > 0 && (
            <UsersLikes favoritesList={product.likes} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductHeader;
