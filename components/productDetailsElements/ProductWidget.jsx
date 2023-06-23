import React from "react";
import Image from "next/image";
import Link from "next/link";

import "./ProductWidget.scss";

const ProductWidget = ({ title, products }) => {
  return (
    <div className="product-widget">
      <h3 className="product-widget__title">{`${title} products`}</h3>
      <ul className="product-widget__list">
        {products.map((product, i) => (
          <li key={i}>
            <Link href={product._id}>
              <Image
                src={product.image.photo}
                width={60}
                height={60}
                alt={product.title}
              />
              <div className="product-widget__right">
                <h4 className="product-widget__name">{product.title}</h4>
                <span className="product-widget__weight">{`${product.image.amount} g`}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductWidget;
