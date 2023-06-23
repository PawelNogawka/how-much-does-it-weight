import React from "react";
import Link from "next/link";

import "./Logo.scss";

const Logo = ({ small }) => {
  return (
    <Link href="/" className={`logo ${small && "logo-small"}`}>
      hmw
    </Link>
  );
};

export default Logo;
